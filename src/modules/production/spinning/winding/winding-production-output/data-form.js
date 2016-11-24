import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    spinningOptions = ['Spinning 1','Spinning 2','Spinning 3'];
    shiftOptions = ['Shift I: 06.00 – 14.00', 'Shift II: 14.00 – 22.00', 'Shift III: 22:00 – 06.00'];
    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }
    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    machineChanged(e) {
        var selectedmachine= e.detail || {};
        if (selectedmachine)
            this.data.machineId = selectedmachine._id ? selectedmachine._id : "";
    }

    threadChanged(e) {
        var selectedThread = e.detail || {};
        if (selectedThread) {
            if(this.data.lotMachine!=undefined)
            this.data.lotMachine.lot=selectedThread.lot ? selectedThread.lot : "";
            this.data.productId=selectedThread.productId ? selectedThread.productId : null;
        }
     }
}