import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
var moment = require("moment");

@inject(Router, Service)
export class Edit {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
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
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        this.service.update(this.data).then(result => {
            this.cancelCallback();
        }).catch(e => {
            this.error = e;
        })
    }
}