import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {

    info = {
        machineId: "",
        productionOrderNumber: '',
        date: "",
        time: 0
    };
    Options = {
        "readOnly": true,

    }

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    async activate(params) {
        
        this.info.machineId = params.id;
        this.info.machineEventId = params.eventId;
        this.info.productionOrderNumber = params.productionOrderNumber;
        this.info.date = params.date;
        this.info.time = params.time;
        this.dateFrom = params.dateF;
        this.dateTo = params.dateT;
        this.mId = params.mId;
        this.Mach=params.Mach;
        this.meId = params.meId;
        this.MachE=params.MachE;
        this.pONOn = params.pONOn;
        this.ProdNo = params.ProdNo;
        await this.service.getMachine(this.info).then(data => {
            console.log(data);
            this.data = data;
        })
    }

    list(mId,Mach,meId,MachE,pONOn,ProdNo,dateF,dateT) {
        this.router.navigateToRoute('list' , { mId: this.mId, Mach: this.Mach, meId: this.meId, MachE: this.MachE, pONOn: this.pONOn, ProdNo: this.ProdNo, dateF: this.dateFrom, dateT: this.dateTo });
    }


}