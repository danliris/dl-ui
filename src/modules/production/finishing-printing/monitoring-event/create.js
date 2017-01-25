import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'

var moment = require('moment');

@inject(Router, Service, BindingEngine, Element)
export class Create 
{
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable divisionFilter = 'FINISHING & PRINTING'
    @bindable showSecond = false;
    @bindable timeInMoment = {};

    constructor(router, service, bindingEngine, element) 
    {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.router = router;
        this.service = service;
    }

    bind()
    {
        var tempTime = moment.utc(this.timeInMoment);
        this.data.timeInMillis = ((moment(tempTime).hour() * 3600) + (moment(tempTime).minute() * 60)) * 1000
    }

    back() 
    {
        this.router.navigateToRoute('list');
    }

    machineChanged(e) 
    {
        var selectedMachine = e.detail || {};
        this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
    }

    timeChanged(e)
    {
        var tempTime = e.detail || {};
        tempTime = moment.utc(tempTime);
        this.data.timeInMillis = ((moment(tempTime).hour() * 3600) + (moment(tempTime).minute() * 60)) * 1000
    }

    save() {
        this.service.create(this.data)
            .then(result => {
                this.back();
            })
            .catch(e => {
                this.error = e;
            })
    }
}