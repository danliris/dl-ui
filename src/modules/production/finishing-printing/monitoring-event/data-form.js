import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable divisionFilter = 'FINISHING & PRINTING'
    @bindable showSecond = false;
    @bindable timeInMoment = {};

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    bind()
    {
        this.timeInMoment = moment(this.data.timeInMillis);
        var tempTime = moment.utc(this.timeInMoment);
        this.data.timeInMillis = ((moment(tempTime).hour() * 3600) + (moment(tempTime).minute() * 60)) * 1000
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
}