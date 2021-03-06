import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
// import moment from "moment";

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["Update"];
    columns = [
        { field: "Name", title: "Shift" }
    ];

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

        return this.service.search(arg).then(result => {
            return {
                total: result.info.total,
                data: result.data
            };
        });
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Update":
                this.router.navigateToRoute("edit", { Id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute("create");
    }
}