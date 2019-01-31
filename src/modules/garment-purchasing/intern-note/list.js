import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    columns = [
        { field: "inNo", title: "No. Nota Intern" },
        {
            field: "inDate", title: "Tanggal Nota Intern", formatter: function (value, data, index){
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "supplier.Name", title: "Supplier" },
        { field: "items", title: "List No. Invoice", sortable: false }
    ];
    
    context = ["Rincian", "Cetak PDF"];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
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
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
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
                var invoiceItems = item.garmentInvoice.items || [];
                for(var deliveryOrderItem of deliveryOrderItems){
                    for(var deliveryOrderDetail of deliveryOrderItem.fulfillments){
                        for(var invoiceItem of invoiceItems){
                            for(var invDetail of invoiceItem.details){
                                if(deliveryOrderDetail.Id === invDetail.dODetailId){
                                    receiptQuantityTotal += deliveryOrderDetail.receiptQuantity;
                                }
                            }
                        }
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
                return this.checkStatus(data.items);
            default:
                return true;
        }
    }
}