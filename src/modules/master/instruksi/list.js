import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
        { field: "name", title: "Nama Instruksi" },
        { field: "steps", title: "Proses", sortable: false }
    ];
    
    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select: ["steps.process", "name"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                result.data.forEach(instruction => {
                    instruction.steps.toString = function () {
                        var str = "<ul>";
                        for (var step of instruction.steps) {
                            str += `<li>${step.process}</li>`;
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