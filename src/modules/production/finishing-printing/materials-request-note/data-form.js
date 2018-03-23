import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

var UnitLoader = require('../../../../loader/unit-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable isComplete = false;
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;

        this.itemsOptions = {
            productionOrderFilter: {
                "isClosed": false
            },
            isTest: false
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.type = this.data.RequestType || null;

        if (this.data.Unit && this.data.Unit._id) {
            this.selectedUnit = this.data.Unit;
        }

        this.itemsOptions.isTest = this.data.RequestType && (this.data.RequestType.toUpperCase() == "TEST" || this.data.RequestType.toUpperCase() == "PEMBELIAN") ? true : false;
        this.itemsOptions.isComplete = this.context.isComplete ? true : false;
        this.itemsOptions.isAwal = this.data.RequestType && this.data.RequestType.toUpperCase() == "AWAL" ? true : false;
        this.itemsOptions.isView = this.context.isView ? true : false;
        this.itemsOptions.isEdit = this.context.isEdit ? true : false;
        // this.readOnly = this.itemsOptions.isComplete;
        // this.isView = this.itemsOptions.isComplete;
        // this.itemsOptions.        

    }

    numberOptions = {
        control: {
            length: 2
        }
    }

    @bindable unitFilter = { "division.name": "FINISHING & PRINTING" };
    typeItems = ["", "AWAL", "PENGGANTI BAD OUTPUT", "TEST", "PEMBELIAN"];

    itemsOptions = {};
    @bindable selectedUnit;
    selectedUnitChanged(newVal, oldVal) {
        if (this.selectedUnit && this.selectedUnit._id) {
            this.data.Unit = this.selectedUnit;

            delete this.itemsOptions.productionOrderFilter["orderType"];
            var filter = this.selectedUnit.name && this.selectedUnit.name.toUpperCase() === "PRINTING" ? { "orderType.name": "PRINTING" } : { "orderType.name": { "$nin": ["PRINTING"] } };
            Object.assign(this.itemsOptions.productionOrderFilter, filter);

            if (oldVal)
                this.data.MaterialsRequestNote_Items.splice(0, this.data.MaterialsRequestNote_Items.length);
        }
        else {
            this.data = {};
            this.data.MaterialsRequestNote_Items.splice(0, this.data.MaterialsRequestNote_Items.length);
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    @bindable type;
    typeChanged(newVal, oldVal) {
        this.data.RequestType = newVal ? newVal : this.data.RequestType;

        delete this.itemsOptions.productionOrderFilter["isRequested"];
        if (newVal && (newVal.toUpperCase() == "AWAL" || newVal.toUpperCase() == "PEMBELIAN")) {
            var filter = {
                "isRequested": false
            }
            Object.assign(this.itemsOptions.productionOrderFilter, filter);
        }

        if (oldVal)
            this.data.MaterialsRequestNote_Items.splice(0, this.data.MaterialsRequestNote_Items.length);
    }

    get itemHeader() {
        if (this.data.RequestType && (this.data.RequestType.toUpperCase() === "TEST" || this.data.RequestType.toUpperCase() == "PEMBELIAN")) {
            return [
                { header: "Nama Barang", value: "Product" },
                { header: "Grade", value: "Grade" },
                { header: "Panjang (Meter)", value: "Length" }
            ];
        } else if (this.data.RequestType && (this.context.isView && this.data.RequestType.toUpperCase() == "AWAL")) {
            return ["No. Spp", "Nama Barang", "Grade", "Panjang (Meter)", "Status"];
        } else if (this.context.isComplete) {
            return ["Pilih", "No. Spp", "Nama Barang", "Grade", "Panjang (Meter)", "Status"];
        } else {
            return [
                { header: "No. SPP", value: "ProductionOrder" },
                { header: "Nama Barang", value: "Product" },
                { header: "Grade", value: "Grade" },
                { header: "Panjang (Meter)", value: "Length" },
            ];
        }

    }

    itemInfo = {
        onAdd: function () {
            this.data.MaterialsRequestNote_Items.push({
                ProductionOrder: null,
                Product: null,
                Grade: "",
                Length: 0
            });
            this.itemsOptions.isTest = this.data.RequestType && (this.data.RequestType.toUpperCase() == "TEST" || this.data.RequestType.toUpperCase() == "PEMBELIAN") ? true : false;
        }.bind(this),
        onRemove: function () {

        }.bind(this)
    }
} 