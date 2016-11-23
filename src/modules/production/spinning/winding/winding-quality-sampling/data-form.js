import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    spinningOption = ['SPINNING 1', 'SPINNING 2', 'SPINNING 3'];

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }
    
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    
    attached() {
        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })
        }
    }

    machineChanged(e) {
        var selectedMachine = e.detail;
        if (selectedMachine)
            this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
    }

    threadChanged(e) {
        var selectedThread = e.detail;
        if (selectedThread){
            this.data.usterId = selectedThread._id ? selectedThread._id : "";
        }
    }
}