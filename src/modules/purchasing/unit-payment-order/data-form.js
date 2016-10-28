import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};



    termPaymentOptions = ['CASH', 'KREDIT', 'DP (DOWN PAYMENT) + BP (BALANCE PAYMENT)', 'DP (DOWN PAYMENT) + TERMIN 1 + BP (BALANCE PAYMENT)', 'RETENSI'];

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element; 
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    @computedFrom("data.vatNo")
    get isUseVat() {
        return (this.data.vatNo||'').trim().length > 0;
    }
    @computedFrom("data.incomeTaxNo")
    get isUseIncomeTax() {
        return (this.data.incomeTaxNo||'').trim().length > 0;
    }

    bind() {
        if (this.data && this.data.supplier)
            this.data.supplier.toString = function () {
                return this.code + " - " + this.name;
            };
    }

    supplierChanged(e) {
        var selectedSupplier = e.detail;
        if (selectedSupplier) {
            this.data.supplierId = selectedSupplier._id ? selectedSupplier._id : "";
            
            if(!this.readOnly)
                this.data.items=[];
            if (this.data.unitId && this.data.supplierId)
                this.filter = {
                    unitId: this.data.unitId,
                    supplierId: this.data.supplierId
                };
        }

    }
    unitChanged(e) {
        var selectedUnit = e.detail || {};
        if (selectedUnit) {
            this.data.unitId = selectedUnit._id ? selectedUnit._id : "";
            if(!this.readOnly)
                this.data.items=[];
            if (this.data.unitId && this.data.supplierId)
                this.filter = {
                    unitId: this.data.unitId,
                    supplierId: this.data.supplierId

                };
        }
    }
    
    vatChanged(e) {
        var selectedVat = e.detail;
        if (selectedVat)
            this.data.vatRate = selectedVat.rate ? selectedVat.rate : 0;
    }

    


} 