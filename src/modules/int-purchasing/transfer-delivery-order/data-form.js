// import {inject, bindable, containerless, computedFrom, BindingEngine} from 'aurelia-framework'
// import { Service } from "./service";
// var SupplierLoader = require('../../../loader/supplier-loader');
// var DivisionLoader = require('../../../loader/division-loader');

// @containerless()
// @inject(BindingEngine, Element)
// export class DataForm {
//     @bindable readOnly = false;
//     @bindable data = {};
//     @bindable error = {};
//     @bindable title;
//     @bindable supplier;
//     @bindable division;

//     controlOptions = {
//         label: {
//             length: 4
//         },
//         control: {
//             length: 5
//         }
//     }
// 	itemsInfo = {
//         columns: [{ header: "Nomor TO External", value: "ETONo" }],
//         // onAdd: function () {
//         //     console.log(this.context);
//         //     this.context.ItemsCollection.bind();
//         //     this.data.items.push({});
//         // }.bind(this)
//     };
	
// 	constructor(bindingEngine, element) {
//         this.bindingEngine = bindingEngine;
//         this.element = element;
// 	}

// 	bind(context) {
//         this.context = context;
//         this.data = this.context.data;
//         this.error = this.context.error;

//         if (this.data) {
//             this.division = this.data.Division;
//             this.supplier = this.data.Supplier;
//         }
// 	}

// 	@computedFrom("data.Id")
//     get isEdit() {
//         return (this.data.Id || '').toString() != '';
//     }

//     @computedFrom("data.supplier")
//     get filter() {
//         var filter = {
//             DivisionName: this.data.DivisionName || {}
//         }
//         return filter;
//     }

//     get addItems() {
//         return (event) => {
//             this.data.items.push({})
//         };
//     }

//     supplierChanged(newValue, oldValue) {
//         var selectedSupplier = newValue;
//         if (selectedSupplier) {
//             if (selectedSupplier._id) {
//                 this.data.supplier = selectedSupplier;
//                 this.data.SupplierId = selectedSupplier._id;
//                 this.data.SupplierName=selectedSupplier.name;
//                 this.data.SupplierCode=selectedSupplier.code;
//             }
//         } else {
//             this.data.SupplierName = {};
//             this.data.SupplierId = undefined;
//         }
//         this.data.items = [];
//         // this.resetErrorItems();
//     }

//     get supplierLoader() {
//         return SupplierLoader;
//     }

//     supplierView = (supplier) => {
//         return `${supplier.code} - ${supplier.name}`
//     }

//     get divisionLoader() {
//         return DivisionLoader;
//     }
//     divisionView = (division) => {
//         return `${division.code} - ${division.name}`;
//     }

//     divisionChanged(newValue,oldValue) {
//         var selectedDivision = newValue;
//         if (selectedDivision) {
//             if (selectedDivision._id) {
//                 this.data.division = selectedDivision;
//                 this.data.DivisionId = selectedDivision._id;
//                 this.data.DivisionName=selectedDivision.name;
//                 this.data.DivisionCode=selectedDivision.code;
                
//             }
//         } else {
//             this.data.DivisionName = {};
//             this.data.DivisionId = undefined;
//         }
//         this.data.items = [];
//         // this.resetErrorItems();
//     }

//     resetErrorItems() {
//         if (this.error) {
//             if (this.error.items) {
//                 this.error.items = [];
//             }
//         }
//     }
// } 

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