import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["Rincian", "Cetak PDF"];
    columns = [
        { field: "CostCalculationGarment.RO_Number", title: "No RO" },
        { field: "CostCalculationGarment.Article", title: "Artikel" },
        { field: "CostCalculationGarment.UnitName", title: "Unit" },
        { field: "Total", title: "Kuantitas RO" },
        { field: "CostCalculationGarment.IsValidatedROSample", title: "Approval Sample"
            , formatter: (value) => value === true ? "SUDAH" : "BELUM"},
        { field: "CostCalculationGarment.IsValidatedROPPIC", title: "Approval PPIC"
            , formatter: (value) => value === true ? "SUDAH" : "BELUM"},
    ];

    rowFormatter(data, index) {
        if (data.CostCalculationGarment.IsValidatedROSample && data.CostCalculationGarment.IsValidatedROPPIC)
            return { classes: "success" }
        else
            return { classes: "danger" }
    }

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
                result.data.map(d => d.CostCalculationGarment.UnitName = d.CostCalculationGarment.Unit.Name);
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
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}