import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var SupplierLoader = require('../../../loader/supplier-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable supplier;

    itemsColumns = [
        { header: "Nomor PO Eksternal", value: "items" }
    ]

    item = {
        columns: [
            { header: "Nomor PO Eksternal", value: "purchaseOrderExternal" }
        ],
        onAdd: function () {
            this.data.items = this.data.items || [];
            this.data.items.push({purchaseOrderExternal:{}, fulfillments:[]});
        }.bind(this),
        onRemove: function () {
            console.log("removed");
        }.bind(this)
    };

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    @computedFrom("data.supplier")
    get filter() {
        var filter = {
            supplierId: this.data.supplier._id
        }
        return filter;
    }

    supplierChanged(newValue) {
        if (newValue) {
            if (newValue._id) {
                this.data.supplier = newValue;
                this.data.supplierId = this.data.supplier._id ? this.data.supplier._id : {};
                this.data.items = [];
                this.resetErrorItems();
            }
        } else {
            this.data.supplier = newValue;
            this.data.supplierId = {};
        }

    }

    get supplierLoader() {
        return SupplierLoader;
    }

    // get addItems() {
    //     return (event) => {
    //         this.data.items.push({})
    //     };
    // }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    bind() {
        if (this.data && this.data.supplier)
            this.data.supplier.toString = function () {
                return this.code + " - " + this.name;
            };
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }
} 