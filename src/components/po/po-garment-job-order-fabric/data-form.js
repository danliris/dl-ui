import {inject, bindable, BindingEngine, observable} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable data = {};
    @bindable error = {};

    uri = "http://127.0.0.1:8900/v1/core/fabrics";
    uriSupplier = "http://127.0.0.1:8900/v1/core/suppliers";
    uriBuyer = "http://127.0.0.1:8900/v1/core/buyers";

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;

        this.data.deliveryDate = moment().format('YYYYMMDD');
        this.data.PRNo = 'pr123456';
    }
    
    attached() {
        this.bindingEngine.propertyObserver(this.data, "supplier").subscribe((newValue, oldValue) => {
            this.data.supplier = newValue;
            this.data.supplierId = newValue._id;
        });
        this.bindingEngine.propertyObserver(this.data, "buyer").subscribe((newValue, oldValue) => {
            this.data.buyer = newValue;
            this.data.buyerId = newValue._id;
        });
    }
    
    addItem() {
        this.data.items = this.data.items ? this.data.items : [];
        this.data.items.push({product:{name:'santos'}});
        console.log(this.data);
    }
    removeItem(item)
    {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
    mapSupplier(result) {
        var list = result.data.map(item => {
            var _item = item;
            _item.labelSupplier = `${_item.code} - ${_item.name}`;

            console.log(_item);
            return _item
        });

        return list;
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