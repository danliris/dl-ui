import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

import moment from 'moment';
@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
        { field: "SCNo", title: "No Sales Contract" },
        { field: "SCDate", title: "Tgl. Sales Contract", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SCType", title: "Jenis Sales Contract" },
        { field: "BuyerAgentName", title: "Buyer Agent"},
        { field: "BuyerBrandName", title: "Buyer Brand"},
        { field: "OrderQuantity", title: "Jumlah Order" }
    ];

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        }

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