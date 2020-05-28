import {inject, bindable, containerless, computedFrom, BindingEngine} from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var IncomeTaxLoader = require('../../../loader/income-tax-loader');
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
    @bindable selectedIncomeTax;
    @bindable selectedDivision;
    @bindable selectedCategory;

    IncomeTaxByOptions=["","Supplier","Dan Liris"];
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
        this.hasCreate=true;
        if(this.data)
            this.hasCreate=false;
        //console.log(this.context);
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    @computedFrom("data.division", "data.supplier", "data.category", "data.paymentMethod", "data.currency", "data.useIncomeTax", "data.incomeTax", "data.useVat","data.incomeTaxBy")
    get filter() {
        var filter = {
            DivisionId: this.data.division ? this.data.division._id : this.data.division,
            SupplierId: this.data.supplier ? this.data.supplier._id : this.data.supplier,
            CategoryId: this.data.category ? this.data.category._id : this.data.category,
            PaymentMethod: this.data.paymentMethod,
            CurrencyCode: (this.data.currency || {}).code || (this.data.currency || {}).Code || "",
            UseIncomeTax: this.data.useIncomeTax,
            IncomeTaxId: this.data.incomeTax ? this.data.incomeTax._id : null,
            UseVat: this.data.useVat,
            incomeTaxBy: this.data.incomeTaxBy ? this.data.incomeTaxBy:"",
            CategoryCode: this.data.category ? this.data.category.code : this.data.category,
        }
        return filter;
    }

    selectedDivisionChanged(newValue) {
        var _selectedDivision = newValue;
        if (_selectedDivision.Id ||_selectedDivision._id) {
            this.data.division = _selectedDivision;
            this.data.divisionId = _selectedDivision.Id || _selectedDivision._id || "";
            this.data.division._id = this.data.divisionId;
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
        if (_selectedCurrency.Id) {
            this.data.currency = _selectedCurrency;
            this.data.currency._id = _selectedCurrency.Id;
        }
        this.resetErrorItems();
    }

    incomeTaxByChanged(e){
        this.data.items = [];
    }

    selectedIncomeTaxChanged(newValue) {
        var _selectedIncomeTax = newValue || {};
        if (_selectedIncomeTax.Id) {
            this.data.incomeTax = _selectedIncomeTax;
            this.data.incomeTax._id = _selectedIncomeTax.Id;
            this.data.incomeTaxRate = _selectedIncomeTax.rate ? _selectedIncomeTax.rate : 0;
        }
        else {
            this.data.incomeTax = {};
        }
        this.resetErrorItems();
    }

    useIncomeTaxChanged(e) {
        this.data.items = [];
        this.selectedIncomeTax = null;
        this.data.incomeTax = {};
        this.data.incomeTaxRate = 0;
        this.data.incomeTaxNo = "";
        this.data.incomeTaxDate = null;
        this.data.incomeTaxBy="";
    }

    useVatChanged(e) {
        this.data.items = [];
        this.data.vatNo = "";
        this.data.vatDate = null;
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
        return division.name || division.Name
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

    categoryView = (category) => {
        return `${category.code} - ${category.name}`
    }

    currencyView = (currency) => {
        return currency.code || currency.Code
    }

    incomeTaxView = (incomeTax) => {
        return `${incomeTax.name} - ${incomeTax.rate}`
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

    get incomeTaxLoader() {
        return IncomeTaxLoader;
    }

    addItems = (e) => {
        this.data.items.push({ unitReceiptNote: { no: "" } })
    };
} 
