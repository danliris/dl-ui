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
            month: params.month,
            yearPeriode: params.yearPeriode,
            page:this.info.page,
            size:this.info.size
        };
        var MR=await this.service.getFilter(arg);
        var idx=1;
        for(var data of MR.data){
            data.index=idx;
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
            month: this.params.month,
            yearPeriode: this.params.yearPeriode,
            page:this.info.page,
            size:this.info.size
        };
        this.service.getFilter(this.info)
            .then(result => {
                var idx=(this.info.page-1) *100;
                for(var data of result.data){
                    idx++;
                    data.index=idx;
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
