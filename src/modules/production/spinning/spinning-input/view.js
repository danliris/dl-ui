import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var moment = require("moment");

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        var InputModel = {};
        var InputTemp = [];
        this.data = await this.service.getById(id);
        InputModel.Counter = this.data.Counter;
        InputModel.Hank = this.data.Hank;
        InputTemp.push(InputModel);
        this.unit=this.data.UnitName;
        this.machine=this.data.MachineName;
        this.yarn=this.data.YarnName;
        this.lot = this.data.Lot;
        this.data.Date=moment(new Date(this.data.Date)).format("DD MMM YYYY"); 
        this.data.Input = InputTemp;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    deleteCallback(event) {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

}