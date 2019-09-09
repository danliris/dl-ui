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
        { field: "CutOutNo", title: "No Cutting Out" },
        { field: "UnitCode", title: "Unit Tujuan" },
        { field: "RONo", title: "RO" },
        { field: "Article", title: "No Artikel" },
        { field: "TotalCuttingOutQuantity", title: "Jumlah Out", sortable: false },
        { field: "TotalRemainingQuantity", title: "Sisa", sortable: false },
        { field: "CuttingOutDate", title: "Tanggal Cutting Out", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "Products", title: "Kode Barang", sortable: false, formatter: value => `${value.map(v => `&bullet; ${v}`).join("<br/>")}` },
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
                result.data.forEach(d => {
                    d.UnitCode = d.Unit.Code
                    d.ProductList = `${d.Products.map(p => `- ${p}`).join("<br/>")}`
                });
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