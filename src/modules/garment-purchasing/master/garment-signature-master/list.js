import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import { Base64Helper } from '../../../../utils/base-64-coded-helper';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
        { field: "UserName", title: "User Name" },
        { field: "Position", title: "Jabatan" },
        {
            field: "CreatedDate", title: "Tanggal Dibuat", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Unit", title: "Nama Unit" }
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
            filter: JSON.stringify({ "UnitCode": "GMT" })
            //filter: JSON.stringify({ "UnitCode": { "$ne": "GMT" } })
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                data.data.forEach(s => {
                    s.FullName= s.FirstName + " "+ s.LastName;
                    s.Unit= s.Unit.Code + " - " + s.Unit.Name;
                });
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
        const encoded = Base64Helper.encode(data.Id);
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: encoded });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}