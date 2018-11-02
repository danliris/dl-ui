import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var UnitLoader = require('../../../loader/unit-loader');
var IncomeTaxLoader = require('../../../loader/income-tax-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    itemsColumns = [{ header: "Nomor External PO"},
                    { header: "Unit"},
                    { header: "Kena PPN"},
                    { header: "Kena PPH"},
                    { header: "PPH"}];

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
        
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.Supplier")
    get filter() {
        var filter = {
            supplierId: this.data.Supplier.Id || {},
            supplierCode: this.data.Supplier.Code,
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

    get supplierLoader() {
        return SupplierLoader;
    }
    
    get addItems() {
        return (event) => {
            this.data.Items.push({ })
        };
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

} 