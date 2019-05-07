import { Inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
// import moment from "moment";

@Inject(Router, Service)
export class List {
    context = ["update"];

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
                    data: result.data,
                }
            });
    }
}