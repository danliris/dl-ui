import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    dataToBePosted = [];
    context = ["Rincian", "Cetak PDF"];
    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.IsPosted;
                return "";
            }
        },
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
                result.data.forEach(data => {
                    data.isPosting = data.IsPosted;
                    data.CostCalculationGarment.UnitName = data.CostCalculationGarment.Unit.Name;
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

    get postButtonActive() {
        return this.dataToBePosted.filter(d => d.IsPosted === false).length < 1;
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

    posting() {
        const unpostedDataToBePosted = this.dataToBePosted.filter(d => d.IsPosted === false);
        if (unpostedDataToBePosted.length > 0) {
            if (confirm(`Post ${unpostedDataToBePosted.length} data?`)) {
                this.service.postRO(unpostedDataToBePosted.map(d => d.Id))
                    .then(result => {
                        this.table.refresh();
                        this.dataToBePosted = [];
                    }).catch(e => {
                        this.error = e;
                    })
            }
        }
    }
}