import {inject, bindable, BindingEngine, observable,computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataFormPodl {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    uriSupplier = require('../../../host').core + "/v1/core/suppliers";
    uri = require('../../../host').core + "/v1/po/textiles/nohaspodl";

    termPaymentOptions = ['Free', 'Cash', 'Credit', 'Letter of Credit'];
    currencyOptions = ['Rupiah', '$ USD'];
    ongkosSelection = [{value:true, label:"BUYER"},{value:false, label:"SUPPLIER"}];
    
    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }
    
    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    
    attached() {
        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })
        }
        this.bindingEngine.propertyObserver(this.data, "supplier").subscribe((newValue, oldValue) => {
            this.data.supplier = newValue;
            this.data.supplierId = newValue._id;
        });
        
        this.bindingEngine.propertyObserver(this.data, "deliveryFeeByBuyer").subscribe((newValue, oldValue) => {
            this.data.deliveryFeeByBuyer = (newValue||'').toString().toLowerCase() == 'true'; 
        });
    }
    
    // horseyChanged(index,event) {
    //     // Object.keys(this.data).forEach(key => {
    //     //     delete this.data[key];
    //     // })
        
    //     // Object.assign(this.data, event.detail);
    //     Object.assign(this.data.items[index], event.detail);
    // }
    
    addItem() {
        console.log(this.data);
        this.data.items = this.data.items ? this.data.items : [];
        this.data.items.push({showDetails: false});
    }
    
    removeItem(item)
    {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
    
    // mapSupplier(result) {
    //     var list = result.data.map(item => {
    //         var _item = item;
    //         _item.labelSupplier = `${_item.code} - ${_item.name}`;

    //         console.log(_item);
    //         return _item
    //     });

    //     return list;
    // }
    
    // map(result) {
    //     var list = result.data.map(item => {
    //         var _item = item;
    //         _item.label = `${_item.RefPONo}`;
    //         return _item
    //     });
        
    //     return list;
    // }
    
    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
    
    bind() {
        if (this.data && this.data.supplier)
            this.data.supplier.toString = function () {
                return this.code +" - "+this.name ;
            };
    }

    supplierChanged(e) {
        var selectedSupplier = e.detail;
        if (selectedSupplier)
            this.data.supplierId = selectedSupplier._id;
    }
} 