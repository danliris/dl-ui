import {inject, bindable, BindingEngine, observable} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable data = {};
    @bindable error = {};

   
    uriSupplier = require('../../../host').core + "/v1/core/suppliers";
    uriBuyer = require('../../../host').core + "/v1/core/buyers";

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;

        this.data.deliveryDate = moment().format('YYYYMMDD');
    }

    activate() {

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