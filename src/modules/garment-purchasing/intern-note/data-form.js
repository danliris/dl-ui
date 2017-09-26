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

    termPaymentImportOptions = ['T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    termPaymentLocalOptions = ['DAN LIRIS', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];

    constructor(bindingEngine, element, service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;

        this.auInputOptions = {
            label: {
                length: 4,
                align: "right"
            },
            control: {
                length: 5
            }
        };

        this.invoiceNoteItem = {
            columns: [
                { header: "Nomor Invoice" },
                { header: "Tanggal Invoice" },
                { header: "Total Amount" }
            ],
            onRemove: function () {
                this.bind();
            }
        };
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
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
            this.data.supplier = selectedSupplier;
            this.data.supplierId = selectedSupplier._id;
            var res = await this.service.getInvoiceNote({supplierId: this.data.supplierId, currency: this.data.currency.code});
            var _items = res.data || [];
            this.data.items = _items;
        }
        else {
            this.data.supplier = null;
            this.data.supplierId = null;
            this.data.items=[];
        }
        this.context.error.items=[];
    }

    currencyChanged(newValue, oldValue) {
        var selectedCurrency = newValue;

        if (selectedCurrency) {
            this.data.currency = selectedCurrency;
        }
        else {
            this.data.currency = null;
        }
        this.data.items=[];
        this.context.error.items=[];
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }
    
    currencyView = (currency) => {
        return currency.code
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`;
    }
} 