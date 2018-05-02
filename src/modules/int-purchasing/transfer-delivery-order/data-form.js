import {inject, bindable, containerless, computedFrom, BindingEngine} from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/supplier-loader');
var DivisionLoader = require('../../../loader/division-loader');

@containerless()
@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable supplier;
    @bindable division;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
	// itemsInfo = {
    //     columns: [{ header: "Nomor TO External", value: "ETONo" }],
    //     // onAdd: function () {
    //     //     console.log(this.context);
    //     //     this.context.ItemsCollection.bind();
    //     //     this.data.items.push({});
    //     // }.bind(this)
    // };
    itemsInfoColumns = [
        "Nomor TO External",
    ];
	
	constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
        this.transferDeliveryOrderItemsOptions = { filter: {} };
	}

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        console.log(this.data);
        this.error = this.context.error;

        if (this.readOnly) {
            this.itemsInfoColumns.push("");
        }

        if (this.data) {
            this.supplier = this.data.Supplier;
            this.division = this.data.Division;
        }

    }

	@computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.supplier")
    get filter() {
        var filter = {
            DivisionName: this.data.DivisionName || {}
        }
        return filter;
    }

    supplierChanged(newValue) {
        if (newValue) {
            this.data.supplier = newValue;
            this.data.SupplierId = newValue._id;
            this.data.SupplierName=newValue.name;
            this.data.SupplierCode=newValue.code;
            Object.assign(this.transferDeliveryOrderItemsOptions.filter, { DivisionId: this.data.DivisionId });
        }
        this.data.items = [];
        // this.resetErrorItems();
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

    get divisionLoader() {
        return DivisionLoader;
    }
    divisionView = (division) => {
        return `${division.code} - ${division.name}`;
    }

    divisionChanged(newValue,oldValue) {
        var selectedDivision = newValue;
        if (selectedDivision) {
            this.data.division = selectedDivision;
            this.data.DivisionId = selectedDivision._id;
            this.data.DivisionName=selectedDivision.name;
            this.data.DivisionCode=selectedDivision.code;            
        }
    }

    divisionChanged(newValue) {
        if (newValue) {
            this.data.division = newValue;
            this.data.DivisionId = newValue._id;
            this.data.DivisionName=newValue.name;
            this.data.DivisionCode=newValue.code;
        }
    }

    get addTransferDeliveryOrderItems() {
        return () => {
            this.data.items.push({});
        }
    };
    // resetErrorItems() {
    //     if (this.error) {
    //         if (this.error.items) {
    //             this.error.items = [];
    //         }
    //     }
    // }
} 