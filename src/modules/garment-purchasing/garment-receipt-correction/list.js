import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service,AuthService)
export class List {

    activate(params) {
        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
        this.filter={
          CreatedBy: username
        }
      }

    constructor(router, service,authService) {
        this.service = service;
        this.router = router;
        this.authService=authService;

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

    filter={};

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
            filter:JSON.stringify(this.filter)
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