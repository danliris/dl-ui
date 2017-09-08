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
    @bindable currency;
    @bindable supplier;

    
    termPaymentImportOptions = ['T/T PAYMENT', 'CMT IMPORT', 'FREE FROM BUYER', 'SAMPLE'];
    termPaymentLocalOptions = ['DAN LIRIS', 'CMT LOKAL', 'FREE FROM BUYER', 'SAMPLE'];

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

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    @computedFrom("data.supplier")
    get filter() {
        var filter = {
            supplierId: this.data.supplierId
        };
        return filter;
    }

    bind() {
        if (!this.readOnly) {
            this.deliveryOrderItem.columns.push({ header: "" });
        }
    }

    async supplierChanged(newValue, oldValue) {
        var selectedSupplier = newValue;

        if (selectedSupplier) {
            this.data.supplier = selectedSupplier;
            this.data.supplierId = selectedSupplier._id;
            var _items = await this.service.getInvoiceNote({ supplierId: this.data.supplierId });
            this.data.items = _items||[];
        }
        else {
            this.data.supplier = {};
            this.data.supplierId = undefined;
            this.data.items=[];
        }
    }

    currencyChanged(newValue, oldValue) {
        var selectedCurrency = newValue;

        if (selectedCurrency) {
            this.data.currency = selectedCurrency;
        }
        else {
            this.data.currency = null;
        }
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
        return currency.code
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`;
    }
} 