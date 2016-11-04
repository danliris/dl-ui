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
        for(var i=0; i<pr.items.length; i++)
        {
            this.data.items[i].defaultUom=this.data.items[i].uom;
            this.data.items[i].defaultQuantity=this.data.items[i].quantity;
        }
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

    async prChanged(e) {
        var pr={};
        pr = await e.detail || {};
        if(this.data.purchaseRequest!=undefined && pr!=undefined)
        {
            this.data.purchaseRequest._id=pr._id;
            this.data.purchaseRequest.no=pr.no;
            this.data.purchaseRequest.date= pr.date;
            this.data.purchaseRequest.expectedDeliveryDate= pr.expectedDeliveryDate;
            this.data.purchaseRequest.unit= pr.unit;
            this.data.purchaseRequest.category= pr.category;
            this.data.remark=pr.remark;
            this.data.items=pr.items;
            for(var i=0; i<pr.items.length; i++)
            {
                this.data.items[i].defaultUom=pr.items[i].uom;
                this.data.items[i].defaultQuantity=pr.items[i].quantity;
            }
        }
        
    }
} 