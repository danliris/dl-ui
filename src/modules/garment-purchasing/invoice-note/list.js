import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    context = ["Rincian", "Cetak Nota Pajak Pph", "Cetak Nota Pajak Ppn"];
    columns = [
        { field: "no", title: "Nomor Invoice" },
        {
            field: "date", title: "Tanggal Invoice", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "supplier.name", title: "Nama Supplier" },
        { field: "items", title: "List Nomor Surat Jalan", sortable: false }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select: ["date", "no", "supplier.name", "items.deliveryOrderNo", "useVat", "useIncomeTax", "isPayTax"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                data.data.forEach(s => {
                    s.items.toString = function () {
                        var str = "<ul>";
                        for (var item of s.items) {
                            str += `<li>${item.deliveryOrderNo}</li>`;
                        }
                        str += "</ul>";
                        return str;
                    }
                });
                // return data;
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
            case "Cetak Nota Pajak Pph":
                this.service.getPdfVatNote(data._id);
                break;
            case "Cetak Nota Pajak Ppn":
                this.service.getPdfIncomeTaxNote(data._id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak Nota Pajak Pph":
                return data.useVat && data.isPayTax;
            case "Cetak Nota Pajak Ppn":
                return data.useIncomeTax && data.isPayTax;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}