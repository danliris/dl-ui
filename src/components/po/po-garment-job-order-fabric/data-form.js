import {inject, bindable, BindingEngine, observable} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable data = {};
    @bindable error = {};

    uri = require('../../../host').core + "/v1/core/fabrics";
    uriBuyer = require('../../../host').core + "/v1/core/buyers";

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }
    
    attached() {
        
        this.bindingEngine.propertyObserver(this.data, "buyer").subscribe((newValue, oldValue) => {
            this.data.buyer = newValue;
            this.data.buyerId = newValue._id;
        });
        
        this.bindingEngine.propertyObserver(this.data, "RefPONo").subscribe((newValue, oldValue) => {
            if (!this.data.isSplit) {
                this.data.PRNo = newValue;
            }
        });
        
        if (this.data.isSplit) {
            this.splitPO();
        }
    }
    
    splitPO() {
        for (var item of this.data.items) {
            item.isSplit = this.data.isSplit;
        }
    }
    
    addItem() {
        this.data.items = this.data.items ? this.data.items : [];
        this.data.items.push({product:{name:'item'}});
        console.log(this.data);
    }
    
    removeItem(item)
    {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
    
    mapBuyer(result) {
        var list = result.data.map(item => {
            var _item = item;
            _item.labelBuyer = `${_item.code} - ${_item.name}`;

            console.log(_item);
            return _item
        });

        return list;
    }
} 