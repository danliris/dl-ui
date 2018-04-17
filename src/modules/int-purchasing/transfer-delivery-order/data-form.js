import {inject, bindable, containerless, computedFrom, BindingEngine} from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/supplier-loader');

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
        columns: [{ header: "Nomor TO External", value: "transferOrderExternal" }],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.items.push({ purchaseOrderExternal: { no: "" } });
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

    @computedFrom("data.supplier")
    get filter() {
        var filter = {
            supplierId: this.data.supplierId || {},
            isEdit: this.isEdit
        }
        return filter;
    }

    supplierChanged(newValue, oldValue) {
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

    get supplierLoader() {
        return SupplierLoader;
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }
} 