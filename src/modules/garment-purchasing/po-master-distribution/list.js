import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    context = ["Rincian"]

    columns = [
        { field: "DONo", title: "Nomor Surat Jalan" },
        {
            field: "DODate", title: "Tanggal Surat Jalan", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SupplierName", title: "Nama Supplier" },
    ];

    loader = (info) => {
        let order = {};
        if (info.sort) {
            order[info.sort] = info.order;
        }
        let filter = {};
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select: JSON.stringify({ "Id": 1, "DOId": 1, "DONo": 1, "DODate": 1, "SupplierName": 1 }),
            order: order,
            filter: JSON.stringify(filter)
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

    contextClickCallback(event) {
        const arg = event.detail;
        const data = arg.data;
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
