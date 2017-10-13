import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
        { field: "process", title: "Proses" },
        { field: "stepIndicators", title: "Indikator", sortable: false }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select: ["process", "stepIndicators.name"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                result.data.forEach(step => {
                    step.stepIndicators.toString = function () {
                        var str = "<ul>";
                        for (var indikator of step.stepIndicators) {
                            str += `<li>${indikator.name}</li>`;
                        }
                        str += "</ul>";
                        return str;
                    }
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

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data._id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}