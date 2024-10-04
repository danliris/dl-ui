import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
let moment = require("moment");

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.router = router;
        this.service = service;

        var load =
        {
            sort: {},
            filter: {},
            offset: 0,
            limit: 999999,

        }
        this.loader(load);
    }

    filter = {};

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify(this.filter)
        }

        this.service.search(arg)
            .then(result => {
                // for (const data of result.data) {
                //     data.UnitCode = data.Unit.Code;
                //     data.StorageCode = data.Storage.Code;
                // }

               this.data = result.data;
            });
    }

    contextClickCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    upload() {
        this.router.navigateToRoute('upload');
    }

}