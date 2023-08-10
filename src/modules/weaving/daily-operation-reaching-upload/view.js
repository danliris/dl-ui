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
            data.InstallEfficiency= data.InstallEfficiency? ((parseFloat(data.InstallEfficiency)*100).toFixed(2)).toString() + '%' : '-';
            data.ReachingEfficiency= data.ReachingEfficiency? ((parseFloat(data.ReachingEfficiency)*100).toFixed(0)).toString() + '%' : '-';
            data.CombEfficiency= data.CombEfficiency? ((parseFloat(data.CombEfficiency)*100).toFixed(0)).toString() + '%': '-';
            data.DoffingEfficiency= data.DoffingEfficiency? ((parseFloat(data.DoffingEfficiency)*100).toFixed(2)).toString() + '%': '-';
            data.Eff2= data.Eff2? ((parseFloat(data.Eff2)*100).toFixed(0)).toString() + '%': '-';
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
                    data.InstallEfficiency= data.InstallEfficiency? ((parseFloat(data.InstallEfficiency)*100).toFixed(2)).toString() + '%' : '-';
                    data.ReachingEfficiency= data.ReachingEfficiency? ((parseFloat(data.ReachingEfficiency)*100).toFixed(0)).toString() + '%' : '-';
                    data.CombEfficiency= data.CombEfficiency? ((parseFloat(data.CombEfficiency)*100).toFixed(0)).toString() + '%': '-';
                    data.DoffingEfficiency= data.DoffingEfficiency? ((parseFloat(data.DoffingEfficiency)*100).toFixed(2)).toString() + '%': '-';
                    data.Eff2= data.Eff2? ((parseFloat(data.Eff2)*100).toFixed(0)).toString() + '%': '-';
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
