import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["Detail", "Cetak Cost Calculation", "Cetak Budget"];
    columns = [
        { field: "ProductionOrderNo", title: "Nomor SPP" },
        { field: "InstructionName", title: "Nama Instruksi" },
        { field: "GreigeName", title: "Nama Greige" },
        { field: "BuyerName", title: "Nama Buyer" }
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
        // return { total: 0, data: {} };
        return this.service.search(arg)
            .then(result => {
                console.log(result)
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
            case "Detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak Cost Calculation":
                this.service.getPdfById(data.Id)
                break;
            case "Cetak Budget":
                this.service.getBudgetById(data.Id)
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}