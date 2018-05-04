import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

var SupplierLoader = require('../../../loader/supplier-loader');
var DivisionLoader = require('../../../loader/division-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable title;
    @bindable supplier;
    @bindable division;

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
        this.externalTransferOrderItemsOptions = { filter: {} };
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    itemsInfo = [
        "Nomor TO External",
    ];

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        
        this.error = this.context.error;

        if (this.readOnly) {
            this.itemsInfo.push("");
        }

        if (this.data) {
            this.division = this.data.Division;
            this.supplier = this.data.Supplier;
        }
    }

    get divisionLoader() {
        return DivisionLoader;
    }
    get supplierLoader() {
        return SupplierLoader;
    }
    divisionView = (division) => {
        return `${division.code} - ${division.name}`;
    }
    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

    supplierChanged(newValue) {
        var selectedSupplier = newValue;
        if (selectedSupplier) {
            if (selectedSupplier._id) {
                this.data.supplier = selectedSupplier;
                this.data.SupplierId = selectedSupplier._id;
                this.data.SupplierName=selectedSupplier.name;
                this.data.SupplierCode=selectedSupplier.code;
                Object.assign(this.externalTransferOrderItemsOptions.filter, { OrderDivisionName: this.data.DivisionName });
            }
        }
    }

    divisionChanged(newValue) {
        var selectedDivision = newValue;
        if (selectedDivision) {
            if (selectedDivision._id) {
                this.data.division = selectedDivision;
                this.data.DivisionId = selectedDivision._id;
                this.data.DivisionName=selectedDivision.name;
                this.data.DivisionCode=selectedDivision.code;
                
            }
        }
    }

    get addItems() {
        return () => {
            this.data.items.push({});
            
        }
    };

}