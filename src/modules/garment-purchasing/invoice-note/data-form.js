import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var VatLoader = require('../../../loader/vat-loader');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable supplier;
    @bindable currency;
    @bindable vat;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    itemsInfo = {
        columns: [
            { header: "Nomor Surat Jalan" },
            { header: "Tanggal Surat Jalan" },
            { header: "Tanggal Barang Datang" },
            { header: "Total Amount" }],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.items.push({ deliveryOrderNo: "", deliveryOrderId: {}, items: [] });
        }.bind(this)
    };

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
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

    @computedFrom("data.supplier", "data.currency")
    get filter() {
        var filter = {
            supplierId: this.data.supplierId,
            currencyCode: (this.data.currency || {}).code || "",
        }
        return filter;
    }

    supplierChanged(newValue) {
        var selectedSupplier = newValue;
        if (selectedSupplier) {
            if (selectedSupplier._id) {
                this.data.supplier = selectedSupplier;
                this.data.supplierId = selectedSupplier._id;
            }
        } else {
            this.data.supplier = {};
            this.data.supplierId = undefined;
        }
        this.data.items = [];
        this.resetErrorItems();
    }

    currencyChanged(newValue) {
        var selectedCurrency = newValue;
        if (selectedCurrency) {
            if (selectedCurrency._id) {
                this.data.currency = selectedCurrency;
            }
        }
        else {
            this.data.currency = {};
        }
        this.data.items = [];
        this.resetErrorItems();
    }

    vatChanged(newValue) {
        var selectedVat = newValue;
        if (selectedVat) {
            if (selectedVat._id) {
                this.data.vat = selectedVat;
            }
        }
        else {
            this.data.vat = {};
        }
        this.resetErrorItems();
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    currencyView = (currency) => {
        return currency.code
    }

    get vatLoader() {
        return VatLoader;
    }

    vatView = (vat) => {
        return `${vat.name} - ${vat.rate}`
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }
} 