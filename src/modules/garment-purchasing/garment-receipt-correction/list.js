import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

        this.context = ["Rincian"];
        
        this.columns = [
            { field: "CorrectionNo", title: "No. Koreksi Penerimaan" },
            { field: "CorrectionType", title: "Jenis Koreksi" },
            {
                field: "CorrectionDate", title: "Tanggal Koreksi",
                formatter: (value, data) => {
                    return moment(value).format("DD-MMM-YYYY");
                }
            },
            { field: "URNNo", title: "No. Bon Terima Unit" },
            { field: "UnitName", title: "Unit" },
            { field: "StorageName", title: "Gudang" },
        ];
    }

    create() {
        this.router.navigateToRoute("create");
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian": this.router.navigateToRoute('view', { id: data.Id }); break;
        }
    }


    loadData = (info) => {
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
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }
}