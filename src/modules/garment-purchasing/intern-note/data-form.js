import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
var CurrencyLoader = require('../../../loader/currency-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var moment = require('moment');

@inject(BindingEngine, Element, Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable currency;
    @bindable supplier;
    @bindable options = {};

    constructor(bindingEngine, element, service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
    }
    invoiceNoteItem = {
        columns: [
            { header: "Nomor Invoice", value: "invoice.invoiceNo"},
            { header: "Tanggal Invoice" },
            { header: "Total Amount" }
        ],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.items.push({});
        }.bind(this),
    };

    invoiceNoteItemReadOnly = {
        columnsReadOnly: [
            { header: "Nomor Invoice" },
            { header: "Tanggal Invoice" },
            { header: "Total Amount" }]
    }

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.supplier")
    get supplierIsImport() {
        if (this.data.supplier) {
            if (this.data.supplier.import)
                return true
            else
                return false
        }
        else
            return false
    }

    async supplierChanged(newValue, oldValue) {
        var selectedSupplier = newValue;
        if (selectedSupplier) {
            if(selectedSupplier.Id){
                this.data.supplier = selectedSupplier;
                this.data.supplierId = selectedSupplier.Id;
                this.options.supplierCode = selectedSupplier.code;
                this.options.currencyCode = this.data.currency.Code;   
            }
            if(oldValue){
                this.data.supplier = null;
                this.data.supplierId = null;
                this.data.items = [];
            }
        }
        else {
            this.data.supplier = null;
            this.data.supplierId = null;
            this.data.items = [];
        }
        this.resetErrorItems();
    }

    currencyChanged(newValue, oldValue) {
        var selectedCurrency = newValue;

        if (selectedCurrency) {
            this.data.currency = selectedCurrency;
        }
        else {
            this.data.currency = null;
        }
        this.data.items = [];
        this.context.error.items = [];
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    currencyView = (currency) => {
        return currency.Code
    }

    supplierView = (supplier) => 
    {
        var code=supplier.code? supplier.code : supplier.Code;
        var name=supplier.name? supplier.name : supplier.Name;
        return `${code} - ${name}`
    }
}