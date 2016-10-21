import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    unitChanged(e) {
        var unit = e.detail || {};
        this.data.unitId = unit._id ? unit._id : "";
    }

    
    budgetChanged(e) {
        var budget = e.detail || {};
        this.data.budgetId = budget._id ? budget._id : "";
    }

    categoryChanged(e) {
        var category = e.detail || {};
        this.data.categoryId = category._id ? category._id : "";
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
}