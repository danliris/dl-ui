import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');
var momentToMillis = require('../../../../utils/moment-to-millis')

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable divisionFilter = 'FINISHING & PRINTING'
    @bindable showSecond = false;
    @bindable timeInMomentStart = {};
    @bindable timeInMomentEnd = {};

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    bind()
    {
        this.timeInMomentStart = this.data ? moment(this.data.timeInMillisStart) : this.timeInMomentStart;
        this.timeInMomentEnd = this.data ? moment(this.data.timeInMillisEnd) : this.timeInMomentEnd;
        var tempTimeStart = moment.utc(this.timeInMomentStart);
        var tempTimeEnd = moment.utc(this.timeInMomentEnd);
        this.data.timeInMillisStart = momentToMillis(tempTimeStart);
        this.data.timeInMillisEnd = momentToMillis(tempTimeEnd);
    }

    machineChanged(e) 
    {
        var selectedMachine = e.detail || {};
        this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
    }

    timeStartChanged(e)
    {
        var tempTimeStart = e.detail || {};
        tempTimeStart = moment.utc(tempTimeStart);
        this.data.timeInMillisStart = momentToMillis(tempTimeStart);
    }

    timeEndChanged(e)
    {
        var tempTimeEnd = e.detail || {};
        tempTimeEnd = moment.utc(tempTimeEnd);
        this.data.timeInMillisEnd = momentToMillis(tempTimeEnd);
    }
}