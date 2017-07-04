import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    columns = [
        { field: "unitDivision", title: "Unit" },
        { field: "no", title: "No. Bon Unit" },
        {
            field: "date", title: "Tanggal Bon Unit",
            formatter: (value, data) => {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "supplier.name", title: "Supplier" },
        { field: "deliveryOrder.no", title: "No. Surat Jalan" }
    ];

    context = ["Rincian", "Cetak PDF"];

    today = new Date();

    isPrint = false;

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
            order: order
        };

        return this.service.search(arg)
            .then(result => {
                result.data.map((data) => {
                    data.unitDivision = data.unit.division.name + " - " + data.unit.name;
                    return data;
                });

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
}