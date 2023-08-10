import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import moment from "moment";

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    info={size:100, page:1}

    async activate(params) {
        this.params=params;
        this.Dyeing=params.area=="DYEING";//this.DYEING nilai true
        this.Pretreatment=params.area=="PRETREATMENT";//this.PRETREATMENT nilai true
        this.Printing=params.area=="PRINTING";
        var arg = {
            monthId:params.monthId,
            year:params.year,
            page:this.info.page,
            size:this.info.size,
            area:params.area
        };

        var MR=await this.service.getByMonthYear(arg);
        var idx=1;
        for(var data of MR.data){
            data.index=idx;
            data.spbDate= moment(data.spbDate).format('DD/MM/YYYY');
            data.deliveryDate= moment(data.deliveryDate).format('DD/MM/YYYY');
            if(this.Pretreatment || this.Printing){
                var spp= await this.service.getProductionOrderDetails(data.sppNo);
                console.log(spp)
                var sppData= spp.data;
                if(sppData!=null){

                    data.yarnMaterialName=sppData.yarnMaterialName;
                    data.standardTestName=sppData.standardTestName;
                    data.finishType=sppData.finishType;
                    data.deliveryDate=moment(sppData.deliveryDate).format('DD/MM/YYYY');
                    data.buyer=sppData.buyer;
                }
            }
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
            monthId: this.params.monthId,
            year: this.params.year,
            page:this.info.page,
            size:this.info.size,
            area:this.params.area
        };
        this.service.getByMonthYear(this.info)
            .then(result => {
                var idx=(this.info.page-1) *100;
                for(var data of result.data){
                    idx++;
                    data.index=idx;
                    data.spbDate= moment(data.spbDate).format('DD/MM/YYYY');
                    data.deliveryDate= moment(data.deliveryDate).format('DD/MM/YYYY');
                    var spp= this.service.getProductionOrderDetails(data.sppNo);
                    data.spp= spp.data;
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
