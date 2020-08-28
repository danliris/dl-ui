import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
        {
            field: "Date", title: "Tanggal Masuk Verifikasi", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "DocumentNo", title: "No Realisasi VB" },
        {
            field: "Date", title: "Tanggal Realisasi VB", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        {
            field: "Date", title: "Tipe VB", formatter: function (value, data, index) {
                return value == 1 ? "Dengan PO" : "Non PO"
            },
        },
        { field: "Description", title: "Pemohon VB" },
        { field: "ReferenceNo", title: "Bagian/Unit" },
        { field: "Status", title: "Nominal" },
        { field: "Status", title: "Status" },
        { field: "Status", title: "Alasan" }
    ];

    loader = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;
        else
            order["Date"] = "desc";

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({
                Position: 5
            })
        };

        return this.service.search(arg)
            .then(result => {
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

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    post() {
        this.router.navigateToRoute('post');
    }
}
