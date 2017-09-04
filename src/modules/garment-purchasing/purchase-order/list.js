import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    rowFormatter(data, index) {
        if (data.isPosted)
            return { classes: "success" }
        else
            return {}
    }
    context = ["Rincian"]

    columns = [
        { field: "purchaseRequest.no", title: "Nomor PR" },
        { field: "purchaseRequest.roNo", title: "Nomor RO" },
        {
            field: "shipmentDate", title: "Tanggal Shipment", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "buyer.name", title: "Buyer" },
        { field: "product", title: "Nama Barang" },
        { field: "quantity", title: "Jumlah" },
        { field: "uom", title: "Satuan" },

        { field: "_createdBy", title: "Staff Pembelian" },
        {
            field: "isPosted", title: "Posted",
            formatter: function (value, row, index) {
                return value ? "SUDAH" : "BELUM";
            }
        }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select: ["purchaseRequest.no", "purchaseRequest.roNo", "shipmentDate", "buyer.name","_createdBy", "isPosted", "items.defaultQuantity","items.defaultUom.unit","items.product.name"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                for (var _data of result.data) {
                    _data.quantity = _data.items[0].defaultQuantity;
                    _data.uom = _data.items[0].defaultUom.unit;
                    _data.product = _data.items[0].product.name;
                }
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

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}