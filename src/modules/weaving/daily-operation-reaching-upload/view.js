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
            data.InstallEfficiency= data.InstallEfficiency? ((parseFloat(data.InstallEfficiency)*100).toFixed(2)).toString() + '%' : '-';
            data.ReachingEfficiency= data.ReachingEfficiency? ((parseFloat(data.ReachingEfficiency)*100).toFixed(0)).toString() + '%' : '-';
            data.CombEfficiency= data.CombEfficiency? ((parseFloat(data.CombEfficiency)*100).toFixed(0)).toString() + '%': '-';
            data.DoffingEfficiency= data.DoffingEfficiency? ((parseFloat(data.DoffingEfficiency)*100).toFixed(2)).toString() + '%': '-';
            data.Eff2= data.Eff2? ((parseFloat(data.Eff2)*100).toFixed(2)).toString() + '%': '-';
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
