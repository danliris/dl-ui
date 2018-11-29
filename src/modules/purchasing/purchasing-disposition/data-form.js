import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var UnitLoader = require('../../../loader/unit-loader');
//var IncomeTaxLoader = require('../../../loader/income-tax-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedCurrency;
    
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    itemsColumns = [{ header: "Nomor External PO"},
                    { header: "Kena PPN"},
                    { header: "Kena PPH"},
                    { header: "PPH"},
                    { header: ""}];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.supplier) {
            this.selectedSupplier = this.data.supplier;
        }
        if(this.readOnly){
            this.data.Amount=this.data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 4 });
        }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.Supplier && data.Currency")
    get filter() {
        var filter={};
        if(this.data.Supplier && this.data.Currency){
            filter = {
                supplierId: this.data.Supplier.Id || {},
                currencyId:this.data.Currency.Id|| {}
            }
        }
        return filter;
    }

    selectedSupplierChanged(newValue) {
        var _selectedSupplier = newValue;
        if (_selectedSupplier._id) {
            this.data.Supplier = _selectedSupplier;
            this.data.supplierId = _selectedSupplier._id ? _selectedSupplier._id : "";
            this.data.Supplier.Name = _selectedSupplier.name;
            this.data.Supplier.Id = _selectedSupplier._id;
            this.data.Supplier.Code = _selectedSupplier.code;
        }
    }

    selectedCurrencyChanged(newValue){
        if(newValue._id){
            this.data.Currency=newValue;
            this.data.Currency.Id=newValue._id;
            this.data.Currency.Code=newValue.code;
            this.data.Currency.Name=newValue.name;
        }
    }

    get supplierLoader() {
        return SupplierLoader;
    }
    
    get currencyLoader() {
        return CurrencyLoader;
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({ })
        };
    }

    currencyView = (currency) => {
        return `${currency.code}`
    }

    supplierView = (supplier) => {
        var code= supplier.code || supplier.Code;
        var name= supplier.name || supplier.Name;
        return `${code} - ${name}`
    }

    itemsChanged(e){
        if(this.data.Items){
            this.data.Amount=0;
            for(var item of this.data.Items){
                if(item.Details){
                    for(var detail of item.Details){
                        this.data.Amount+=detail.PaidPrice;
                    }
                }
            }
        }
    }
} 