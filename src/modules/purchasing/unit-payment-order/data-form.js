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
        // this.data.vatRate = this.data.vatRate ? this.data.vatRate : 0;
        // this.data.useIncomeTax = this.data.useIncomeTax ? this.data.useIncomeTax : false;
        // this.data.currency = this.data.currency ? this.data.currency : {};
        // this.data.division = this.data.division ? this.data.division : {};

    }

    supplierChanged(e) {
        var selectedSupplier = e.detail;
        if (selectedSupplier) {
            this.data.supplierId = selectedSupplier._id ? selectedSupplier._id : "";
            if (!this.readOnly)
                this.data.items = [];
            this.filter = {
                division: this.data.division.name,
                supplierId: this.data.supplierId,
                categoryId: this.data.categoryId,
                paymentMethod: this.data.paymentMethod,
                currencyCode: this.data.currency.code,
                vatRate: this.data.vatRate,
                useIncomeTax: this.data.useIncomeTax
            };
        }

    }
    divisionChanged(e) {
        var selectedDivision = e.detail || {};
        if (selectedDivision) {
            this.data.divisionId = selectedDivision._id ? selectedDivision._id : "";
            if (!this.readOnly)
                this.data.items = [];
            this.filter = {
                division: this.data.division.name,
                supplierId: this.data.supplierId,
                categoryId: this.data.categoryId,
                paymentMethod: this.data.paymentMethod,
                currencyCode: this.data.currency.code,
                vatRate: this.data.vatRate,
                useIncomeTax: this.data.useIncomeTax
            };
        }
    }
    currencyChanged(e) {
        var selectedCurrency = e.detail || {};
        if (selectedCurrency) {
            if (!this.readOnly)
                this.data.items = [];
            this.filter = {
                division: this.data.division.name,
                supplierId: this.data.supplierId,
                categoryId: this.data.categoryId,
                paymentMethod: this.data.paymentMethod,
                currencyCode: this.data.currency.code,
                vatRate: this.data.vatRate,
                useIncomeTax: this.data.useIncomeTax
            };
        }
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedUnit) {
            this.data.paymentMethod = selectedPayment ? selectedPayment : "";
            if (!this.readOnly)
                this.data.items = [];
            this.filter = {
                division: this.data.division.name,
                supplierId: this.data.supplierId,
                categoryId: this.data.categoryId,
                paymentMethod: this.data.paymentMethod,
                currencyCode: this.data.currency.code,
                vatRate: this.data.vatRate,
                useIncomeTax: this.data.useIncomeTax
            };
        }
    }

    categoryChanged(e) {
        var category = e.detail || {};
        this.data.categoryId = category._id ? category._id : "";
        if (!this.readOnly)
            this.data.items = [];
        this.filter = {
            division: this.data.division.name,
            supplierId: this.data.supplierId,
            categoryId: this.data.categoryId,
            paymentMethod: this.data.paymentMethod,
            currencyCode: this.data.currency.code,
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
        else
            this.data.vatRate = 0;
        this.filter = {
            division: this.data.division.name,
            supplierId: this.data.supplierId,
            categoryId: this.data.categoryId,
            paymentMethod: this.data.paymentMethod,
            currencyCode: this.data.currency.code,
            vatRate: this.data.vatRate,
            useIncomeTax: this.data.useIncomeTax
        };
    }

    useVatChanged(e) {
        if (!this.readOnly)
            this.data.items = [];

        this.data.vat = {};
        this.data.vatRate = 0;
        this.data.vatNo = "";
        this.data.vatDate = null;
        this.filter = {
            division: this.data.division.name,
            supplierId: this.data.supplierId,
            categoryId: this.data.categoryId,
            paymentMethod: this.data.paymentMethod,
            currencyCode: this.data.currency.code,
            vatRate: this.data.vatRate,
            useIncomeTax: this.data.useIncomeTax
        };
    }

    useIncomeTaxChanged(e) {
        if (!this.readOnly)
            this.data.items = [];
        this.data.incomeTaxNo = "";
        this.data.incomeTaxDate = null;
        this.filter = {
            division: this.data.division.name,
            supplierId: this.data.supplierId,
            categoryId: this.data.categoryId,
            paymentMethod: this.data.paymentMethod,
            currencyCode: this.data.currency.code,
            vatRate: this.data.vatRate,
            useIncomeTax: this.data.useIncomeTax
        };
    }

} 