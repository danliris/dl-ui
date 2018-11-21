import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    columns = [
        { field: "inNo", title: "No. Nota Intern" },
        {
            field: "inDate", title: "Tanggal Nota Intern",
            formatter: (value, data) => {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "supplier.Name", title: "Supplier" },
        { field: "items", title: "List No. Invoice" }
    ];

    context = ["Rincian", "Cetak PDF"];

    today = new Date();

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    async activate() {

    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select: ["inDate", "inNo", "supplier.Name", "items.garmentInvoice.invoiceNo"],
            order: order
        };

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                data.data.forEach(s => {
                    s.items.toString = function () {
                        var str = "<ul>";
                        for (var item of s.items) {
                            str += `<li>${item.garmentInvoice.invoiceNo}</li>`;
                        }
                        str += "</ul>";
                        return str;
                    }
                });
                for (var _data of result.data) {
                    _data.INNo = _data.inNo;
                    _data.INDate = _data.inDate;
                    _data.SupplierName = _data.supplier.Name;
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    back() {
        this.router.navigateToRoute('list');
    }

    create() {
        this.router.navigateToRoute('create');
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

	checkStatus(items) {
        var isCetak = true;
        for(var item of items){
            for(var detail of item.details){
                var receiptQuantityTotal = 0;
                var deliveryOrderItems = detail.deliveryOrder.items || [];
                for(var deliveryOrderItem of deliveryOrderItems){
                    for(var deliveryOrderDetail of deliveryOrderItem.fulfillments){
                        receiptQuantityTotal += deliveryOrderDetail.receiptQuantity;
                    }
                }
                if(receiptQuantityTotal === 0){
                    isCetak = false;
                }
            }
        }
		return isCetak;
	}

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
            //console.log(data);
                return this.checkStatus(data.items);
            default:
                return true;
        }
    }
}