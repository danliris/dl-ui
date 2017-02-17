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

    bind() {
        if (this.data && this.data.supplier)
            this.data.supplier.toString = function () {
                return this.code + " - " + this.name;
            };
    }

    @computedFrom("data.division", "data.supplier", "data.category", "data.paymentMethod", "data.currency", "data.vatRate", "data.useIncomeTax")
    get filter() {
        var filter = {
            divisionId: this.data.divisionId,
            supplierId: this.data.supplierId,
            categoryId: this.data.categoryId,
            paymentMethod: this.data.paymentMethod,
            currencyCode: (this.data.currency || {}).code || "",
            vatRate: this.data.vatRate,
            useIncomeTax: this.data.useIncomeTax
        }
        return filter;
    }

    supplierChanged(e) {
        var selectedSupplier = e.detail;
        if (selectedSupplier) {
            this.data.supplierId = selectedSupplier._id ? selectedSupplier._id : "";
            this.data.items = [];
            this.resetErrorItems();
        }

    }
    divisionChanged(e) {
        var selectedDivision = e.detail || {};
        if (selectedDivision) {
            this.data.divisionId = selectedDivision._id ? selectedDivision._id : "";
            this.data.items = [];
            this.resetErrorItems();
        }
    }
    currencyChanged(e) {
        var selectedCurrency = e.detail || {};
        if (selectedCurrency) {
            this.data.items = [];
            this.resetErrorItems();
        }
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.paymentMethod = selectedPayment ? selectedPayment : "";
            this.data.items = [];
            this.resetErrorItems();
        }
    }

    categoryChanged(e) {
        var selectedCategory = e.detail || {};
        if (selectedCategory) {
            this.data.categoryId = selectedCategory._id ? selectedCategory._id : "";
            this.data.items = [];
            this.resetErrorItems();
        }
    }

    vatChanged(e) {
        var selectedVat = e.detail || {};
        this.data.vatRate = this.data.vatRate ? this.data.vatRate : 0;
        this.data.useIncomeTax = this.data.useIncomeTax ? this.data.useIncomeTax : false;
        if (selectedVat) {
            this.data.vatRate = selectedVat.rate ? selectedVat.rate : 0;
            this.data.items = [];
            this.resetErrorItems();
        }
    }

    useVatChanged(e) {
        this.data.items = [];
        this.data.vat = {};
        this.data.vatRate = 0;
        this.data.vatNo = "";
        this.data.vatDate = null;
    }

    useIncomeTaxChanged(e) {
        this.data.items = [];
        this.data.incomeTaxNo = "";
        this.data.incomeTaxDate = null;
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }

} 