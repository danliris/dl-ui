import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    context = ["Detail"];

    columns = [
        { field: "DONo", title: "Nomor DO" },
        {
            field: "DODate", title: "Tanggal DO", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SupplierName", title: "Unit Pengirim" },
        { field: "ETONo", title: "List Nomor Eksternal TO", sortable: false }
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            // select:["DONo", "ArrivalDate", "supplier.name","items.purchaseOrderExternal.no"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                // return data;
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
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}