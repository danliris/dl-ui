import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    columns = [
        { field: "no", title: "No. Surat Perintah Bayar" },
        {
            field: "date", title: "Tanggal Surat Perintah Bayar",
            formatter: (value, data) => {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "supplier.name", title: "Supplier" },
        { field: "invoiceNoteNo", title: "List No. Invoice" }
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
            select: ["date", "no", "supplier.name", "hasUnitReceiptNote", "items.no"],
            order: order
        };

        return this.service.search(arg)
            .then(result => {
                for (var _data of result.data) {
                    var invoiceNo = _data.items.map(function (item) {
                        return `<li>${item.no}</li>`;
                    });
                    invoiceNo = invoiceNo.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    })
                    _data.invoiceNoteNo = `<ul>${invoiceNo.join()}</ul>`;
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
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data._id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
                return data.hasUnitReceiptNote;
            default:
                return true;
        }
    }
}