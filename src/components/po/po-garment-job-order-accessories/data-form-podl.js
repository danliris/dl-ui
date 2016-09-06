import {inject, bindable, BindingEngine, observable} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataFormPodl {
    @bindable data = {};
    @bindable error = {};

    uriSupplier = require('../../../host').core + "/v1/core/suppliers";
    uri = require('../../../host').core + "/v1/po/garmentjoborderaccessories";

    termPaymentOptions = ['Free', 'Cash', 'Credit', 'Letter of Credit'];
    currencyOptions = ['Rupiah', '$ USD'];
    
    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        
        // this.data.deliveryDate = moment().format('YYYYMMDD');
    }
    
    attached() {
        this.bindingEngine.propertyObserver(this.data, "supplier").subscribe((newValue, oldValue) => {
            this.data.supplier = newValue;
            this.data.supplierId = newValue._id;
        });
    }
    
    // addItem() {
    //     console.log(this.data);
    //     this.data.items = this.data.items ? this.data.items : [];
    //     this.data.items.push({coba:{}});
    // }
    
    // removeItem(item)
    // {
    //     var itemIndex = this.data.items.indexOf(item);
    //     this.data.items.splice(itemIndex, 1);
    // }
    
    mapSupplier(result) {
        var list = result.data.map(item => {
            var _item = item;
            _item.labelSupplier = `${_item.code} - ${_item.name}`;

            console.log(_item);
            return _item
        });

        return list;
    }
} 