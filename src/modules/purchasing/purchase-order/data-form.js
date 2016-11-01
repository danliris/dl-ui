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

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    attached() {

        if (this.data.isSplit) {
            this.splitPO();
        }
    }
    bind() {

    }
    splitPO() {
        for (var item of this.data.items) {
            item.isSplit = this.data.isSplit;
        }
    }

    addItem() {

    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    unitChanged(e) {
        var unit = e.detail || {};
        this.data.unitId = unit._id ? unit._id : "";
    }

    categoryChanged(e) {
        var category = e.detail || {};
        this.data.categoryId = category._id ? category._id : "";
    }
} 