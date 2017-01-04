import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    termPaymentOptions = ['CASH', 'KREDIT', 'DP (DOWN PAYMENT) + BP (BALANCE PAYMENT)', 'DP (DOWN PAYMENT) + TERMIN 1 + BP (BALANCE PAYMENT)', 'RETENSI'];
    freightCostByOptions = ['Penjual', 'Pembeli'];

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
    }

    addItem() {
        this.data.items = this.data.items ? this.data.items : [];
        this.data.items.push({ showDetails: false });
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    bind() {
        if (this.data && this.data.supplier)
            this.data.supplier.toString = function () {
                return this.code + " - " + this.name;
            };
    }

    supplierChanged(e) {
        var selectedSupplier = e.detail;
        if (selectedSupplier)
            this.data.supplierId = selectedSupplier._id ? selectedSupplier._id : "";
    }

    currencyChanged(e) {
        var selectedCurrency = e.detail;
        if (selectedCurrency)
            this.data.currencyRate = selectedCurrency.rate ? selectedCurrency.rate : 1;
        else
            this.data.currencyRate = 0;
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment == "CASH")
            this.data.paymentDueDays = 0;
        else
            this.data.paymentDueDays = 30;
    }

    vatChanged(e) {
        var selectedVat = e.detail;
        if (selectedVat)
            this.data.vatRate = selectedVat.rate ? selectedVat.rate : 0;
        else
            this.data.vatRate = 0;
    }

    useIncomeTaxChanged(e) {
        var selectedUseIncomeTax =  e.srcElement.checked || false;
        if (!selectedUseIncomeTax){
            for(var po of this.data.items){
                for(var poItem of po.items)
                {
                    poItem.useIncomeTax=false;
                    poItem.pricePerDealUnit = poItem.priceBeforeTax;
                }
            }
        }
    }

} 