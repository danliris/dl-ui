import {inject, bindable, containerless, computedFrom, BindingEngine} from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var VatLoader = require('../../../loader/vat-loader');
var DivisionLoader = require('../../../loader/division-loader');
var CategoryLoader = require('../../../loader/category-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedCurrency;
    @bindable selectedVat;
    @bindable selectedDivision;
    @bindable selectedCategory;

    termPaymentOptions = ['CASH', 'KREDIT', 'DP (DOWN PAYMENT) + BP (BALANCE PAYMENT)', 'DP (DOWN PAYMENT) + TERMIN 1 + BP (BALANCE PAYMENT)', 'RETENSI'];
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    // itemsColumns = [{ header: "Nomor Bon Unit- Nomor Surat Jalan", value: "unitReceiptNote.no" }];

    itemsInfo = {
        columns: [{ header: "Nomor Bon Unit- Nomor Surat Jalan", value: "unitReceiptNote.no" }],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.items.push({ unitReceiptNote: { no: "" } });
        }.bind(this)
    };

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;

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

    selectedDivisionChanged(newValue) {
        var _selectedDivision = newValue;
        if (_selectedDivision._id) {
            this.data.division = _selectedDivision;
            this.data.divisionId = _selectedDivision._id ? _selectedDivision._id : "";
        }
        this.resetErrorItems();
    }

    selectedSupplierChanged(newValue) {
        var _selectedSupplier = newValue;
        if (_selectedSupplier._id) {
            this.data.supplier = _selectedSupplier;
            this.data.supplierId = _selectedSupplier._id ? _selectedSupplier._id : "";
        }
        this.resetErrorItems();
    }

    selectedCategoryChanged(newValue) {
        var _selectedCategory = newValue;
        if (_selectedCategory._id) {
            this.data.category = _selectedCategory;
            this.data.categoryId = _selectedCategory._id ? _selectedCategory._id : "";
        }
        this.resetErrorItems();
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.paymentMethod = selectedPayment ? selectedPayment : "";
        }
        this.resetErrorItems();
    }

    selectedCurrencyChanged(newValue) {
        var _selectedCurrency = newValue;
        if (_selectedCurrency._id) {
            this.data.currency = _selectedCurrency;
        }
        this.resetErrorItems();
    }

    selectedVatChanged(newValue) {
        var _selectedVat = newValue;
        // this.data.vatRate = this.data.vatRate ? this.data.vatRate : 0;
        // this.data.useIncomeTax = this.data.useIncomeTax ? this.data.useIncomeTax : false;
        if (_selectedVat._id) {
            this.data.vat = _selectedVat;
            this.data.vatRate = _selectedVat.rate ? _selectedVat.rate : 0;
        }
        this.resetErrorItems();
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
        this.data.items = [];
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }

    divisionView = (division) => {
        return division.name
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

    categoryView = (category) => {
        return `${category.code} - ${category.name}`
    }

    currencyView = (currency) => {
        return currency.code
    }

    vatView = (vat) => {
        return `${vat.name} - ${vat.rate}`
    }

    get divisionLoader() {
        return DivisionLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get vatLoader() {
        return VatLoader;
    }

    addItems = (e) => {
        this.data.items.push({ unitReceiptNote: { no: "" } })
    };
} 