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

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
	itemsInfo = {
        columns: [{ header: "Nomor TO External", value: "ETONo" }],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.items.push({ ETONo: { no: "" } });
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

	@computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.supplier")
    get filter() {
        var filter = {
            SupplierName: this.data.SupplierName || {},
            isEdit: this.isEdit
        }
        return filter;
    }

    supplierChanged(newValue, oldValue) {
        var selectedSupplier = newValue;
        if (selectedSupplier) {
            if (selectedSupplier._id) {
                this.data.supplier = selectedSupplier;
                this.data.SupplierId = selectedSupplier._id;
                this.data.SupplierName=selectedSupplier.name;
                // console.log(this.data.supplier);
            }
        } else {
            this.data.SupplierName = {};
            this.data.SupplierId = undefined;
        }
        this.data.items = [];
        this.resetErrorItems();
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

    selectedOrderDivisionChanged(newValue) {
        if (newValue) {
            this.data.OrderDivision = newValue;
            this.data.OrderDivisionId = newValue._id;
            // Object.assign(this.externalTransferOrderItemsOptions.filter, { DivisionId: newValue._id });
        }
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }
} 