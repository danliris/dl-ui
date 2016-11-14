import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
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
    // isUseVat = false;
    // isUseIncomeTax = false;

    // @computedFrom("data.vatNo")
    // get isUseVat() {

    //     return (this.data.vatNo||'').trim().length > 0;
    // }
    // @computedFrom("data.incomeTaxNo")
    // get isUseIncomeTax() {
    //     return (this.data.incomeTaxNo||'').trim().length > 0;
    // }

    bind() {
        if (this.data && this.data.supplier)
            this.data.supplier.toString = function () {
                return this.code + " - " + this.name;
            };
        // this.isUseVat = (this.data.vatNo || '').trim().length > 0;
        // this.isUseIncomeTax = (this.data.incomeTaxNo || '').trim().length > 0;

    }

    supplierChanged(e) {
        var selectedSupplier = e.detail;
        if (selectedSupplier) {
            this.data.supplierId = selectedSupplier._id ? selectedSupplier._id : "";
            this.data.vatRate = this.data.vatRate ? this.data.vatRate : 0;
            this.data.useIncomeTax = this.data.useIncomeTax ? this.data.useIncomeTax : false;
            if (!this.readOnly)
                this.data.items = [];
            // if (this.data.division && this.data.supplierId && this.data.paymentMethod && this.data.currencyCode && this.data.vatRate && this.data.useIncomeTax && this.data.categoryId)
                this.filter = {
                    division: this.data.division,
                    supplierId: this.data.supplierId,
                    categoryId: this.data.categoryId,
                    paymentMethod: this.data.paymentMethod,
                    currencyCode: this.data.currencyCode,
                    vatRate: this.data.vatRate,
                    useIncomeTax: this.data.useIncomeTax
                }; 
        }

    }
    unitChanged(e) {
        var selectedUnit = e.detail || {};
        if (selectedUnit) {
            this.data.division = selectedUnit.name ? selectedUnit.name : "";
            this.data.unitId= selectedUnit._id ? selectedUnit._id : "";
            this.data.vatRate = this.data.vatRate ? this.data.vatRate : 0;
            this.data.useIncomeTax = this.data.useIncomeTax ? this.data.useIncomeTax : false;
            if (!this.readOnly)
                this.data.items = [];
            // if (this.data.division && this.data.supplierId && this.data.paymentMethod && this.data.currencyCode && this.data.vatRate && this.data.useIncomeTax && this.data.categoryId) 
                this.filter = {
                    division: this.data.division,
                    supplierId: this.data.supplierId,
                    categoryId: this.data.categoryId,
                    paymentMethod: this.data.paymentMethod,
                    currencyCode: this.data.currencyCode,
                    vatRate: this.data.vatRate,
                    useIncomeTax: this.data.useIncomeTax
                }; 
        }
    }
    currencyChanged(e) {
        var selectedCurrency = e.detail || {};
        if (selectedCurrency) {
            this.data.currencyCode = selectedCurrency.code ? selectedCurrency.code : "";
            this.data.vatRate = this.data.vatRate ? this.data.vatRate : 0;
            this.data.useIncomeTax = this.data.useIncomeTax ? this.data.useIncomeTax : false;
            if (!this.readOnly)
                this.data.items = [];
            // if (this.data.division && this.data.supplierId && this.data.paymentMethod && this.data.currencyCode && this.data.vatRate && this.data.useIncomeTax && this.data.categoryId)
                this.filter = {
                    division: this.data.division,
                    supplierId: this.data.supplierId,
                    categoryId: this.data.categoryId,
                    paymentMethod: this.data.paymentMethod,
                    currencyCode: this.data.currencyCode,
                    vatRate: this.data.vatRate,
                    useIncomeTax: this.data.useIncomeTax
                }; 
        }
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedUnit) {
            this.data.paymentMethod = selectedPayment ? selectedPayment : "";
            this.data.vatRate = this.data.vatRate ? this.data.vatRate : 0;
            this.data.useIncomeTax = this.data.useIncomeTax ? this.data.useIncomeTax : false;
            if (!this.readOnly)
                this.data.items = [];
            // if (this.data.division && this.data.supplierId && this.data.paymentMethod && this.data.currencyCode && this.data.vatRate && this.data.useIncomeTax && this.data.categoryId) 
                this.filter = {
                    division: this.data.division,
                    supplierId: this.data.supplierId,
                    categoryId: this.data.categoryId,
                    paymentMethod: this.data.paymentMethod,
                    currencyCode: this.data.currencyCode,
                    vatRate: this.data.vatRate,
                    useIncomeTax: this.data.useIncomeTax
                }; 
        }
    }

    categoryChanged(e) {
        var category = e.detail || {};
        this.data.categoryId = category._id ? category._id : "";
        this.data.vatRate = this.data.vatRate ? this.data.vatRate : 0;
        this.data.useIncomeTax = this.data.useIncomeTax ? this.data.useIncomeTax : false;
        if (!this.readOnly)
            this.data.items = [];
        // if (this.data.division && this.data.supplierId && this.data.paymentMethod && this.data.currencyCode && this.data.vatRate && this.data.useIncomeTax && this.data.categoryId)
            this.filter = {
                division: this.data.division,
                supplierId: this.data.supplierId,
                categoryId: this.data.categoryId,
                paymentMethod: this.data.paymentMethod,
                currencyCode: this.data.currencyCode,
                vatRate: this.data.vatRate,
                useIncomeTax: this.data.useIncomeTax
            }; 
    }

    vatChanged(e) {
        var selectedVat = e.detail;
        this.data.vatRate = this.data.vatRate ? this.data.vatRate : 0;
        this.data.useIncomeTax = this.data.useIncomeTax ? this.data.useIncomeTax : false;
        if (selectedVat)
            this.data.vatRate = selectedVat.rate ? selectedVat.rate : 0;
    }

} 