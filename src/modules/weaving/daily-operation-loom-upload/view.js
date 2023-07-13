import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    info={size:100, page:1}

    async activate(params) {
        this.params=params;
        var arg = {
            monthId: params.month,
            year: params.year,
            page:this.info.page,
            size:this.info.size
        };
        var MR=await this.service.getByMonthYear(arg);
        var idx=1;
        for(var data of MR.data){
            data.index=idx;
            data.RPMProduction100= data.RPMProduction100? (parseFloat(data.RPMProduction100).toFixed(2)).toString() : '-';
            data.Production100= data.Production100? (parseFloat(data.Production100).toFixed(0)).toString(): '-';
            data.Production= data.Production? (parseFloat(data.Production).toFixed(0)).toString() : '-';
            data.MC2Eff= data.MC2Eff? ((parseFloat(data.MC2Eff)*100).toFixed(2)).toString() + '%': '-';
            data.PercentEff= data.PercentEff? ((parseFloat(data.PercentEff)*100).toFixed(2)).toString() + '%': '-';
            idx++;
        }
        this.data = MR.data;
        this.info.total=MR.info.total;
    }

    list() {
        this.router.navigateToRoute("list");
    }

    cancelCallback(event) {
        this.list();
    }

    loadPage() {
        this.info = {
            monthId: this.params.month,
            year: this.params.year,
            page:this.info.page,
            size:this.info.size
        };
        this.service.getByMonthYear(this.info)
            .then(result => {
                var idx=(this.info.page-1) *100;
                for(var data of result.data){
                    idx++;
                    data.index=idx;
                    data.RPMProduction100= data.RPMProduction100? (parseFloat(data.RPMProduction100).toFixed(2)).toString() : '-';
                    data.Production100= data.Production100? (parseFloat(data.Production100).toFixed(0)).toString(): '-';
                    data.Production= data.Production? (parseFloat(data.Production).toFixed(0)).toString() : '-';
                    data.MC2Eff= data.MC2Eff? ((parseFloat(data.MC2Eff)*100).toFixed(2)).toString() + '%': '-';
                    data.PercentEff= data.PercentEff? ((parseFloat(data.PercentEff)*100).toFixed(2)).toString() + '%': '-';
                }
                this.data = result.data;
                this.info = result.info;
            })
    }
    
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }
}
