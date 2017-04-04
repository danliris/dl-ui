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
        this.info.productionOrderNumber = params.productionOrderNumber;
        this.info.date = params.date;
        this.info.time = params.time;
        await this.service.getMachine(this.info).then(data => {
            this.data = data[0];
        })
    }

    list() {
        this.router.navigateToRoute('list');
    }


}