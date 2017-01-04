import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
import {Service} from './service';
var moment = require('moment');


@inject(BindingEngine, Element,Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor(bindingEngine, element,service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
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

    prChanged(e) {
        var pr = e.detail || {};   
        if (pr) {
            this.data.purchaseRequestId = pr._id;
            var selectedItem = pr.items || [];
            var _items = [];
            this.data.remark=pr.remark;
            for (var item of selectedItem) {
                var _item = {};
                _item.product = item.product;
                _item.defaultUom = item.product.uom;
                _item.defaultQuantity = item.quantity;
                _item.remark = item.remark;
                _items.push(_item);

            }
            this.data.items = _items;
        }
        else
        {
            this.data.remark="";
            this.data.items=[];
        }
     }

} 