import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["Rincian"];

    columns = [
        { field: "CutInNo", title: "No" },
        { field: "CuttingType", title: "Tiipe Cutting" },
        { field: "Article", title: "No Artikel" },
        { field: "TotalCuttingInQuantity", title: "Jumlah Cutting", sortable: false },
        { field: "RONo", title: "RO" },
        { field: "Unit.Name", title: "Unit" },
        { field: "UENNos", title: "No Bukti Pengeluaran", sortable: false, formatter: value => `<ul>${value.map(v => `<li>${v}</li>`)}</ul>` },
        { field: "CuttingInDate", title: "Tanggal", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "Products", title: "Kode Barang", sortable: false, formatter: value => `<ul>${value.map(v => `<li>${v}</li>`)}</ul>` },
    ]

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}