import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var arg = {
            monthId: params.month,
            year: params.year,
        };
        var MR=await this.service.getByMonthYear(arg);
        for(var data of MR.data){
            data.RPMProduction100= data.RPMProduction100? (parseFloat(data.RPMProduction100).toFixed(2)).toString() : '-';
            data.Production100= data.Production100? (parseFloat(data.Production100).toFixed(0)).toString(): '-';
            data.Production= data.Production? (parseFloat(data.Production).toFixed(0)).toString() : '-';
            data.MC2Eff= data.MC2Eff? ((parseFloat(data.MC2Eff)*100).toFixed(2)).toString() + '%': '-';
            data.PercentEff= data.PercentEff? ((parseFloat(data.PercentEff)*100).toFixed(2)).toString() + '%': '-';
        }
        this.data = MR.data;
    }

    list() {
        this.router.navigateToRoute("list");
    }

    cancelCallback(event) {
        this.list();
    }
}
