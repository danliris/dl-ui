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
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;


    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.Unit && this.data.Unit._id) {
            this.selectedUnit = this.data.Unit;
        }
    }

    numberOptions = {
        control: {
            length: 2
        }
    }

    @bindable unitFilter = { "division.name": "FINISHING & PRINTING" };
    typeItems = ["", "AWAL", "PENGGANTI BAD OUTPUT", "TEST"];

    itemsOptions = {};
    @bindable selectedUnit;
    selectedUnitChanged(newVal, oldVal) {
        if (this.selectedUnit && this.selectedUnit._id) {
            this.data.Unit = this.selectedUnit;
            this.itemsOptions.productionOrderFilter = this.selectedUnit.name && this.selectedUnit.name.toUpperCase() === "PRINTING" ? { "orderType.name": "PRINTING", "isClosed": false } : { "orderType.name": { "$nin": ["PRINTING"] }, "isClosed": false };

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

    typeChanged(e) {
        this.data.MaterialsRequestNote_Items.splice(0, this.data.MaterialsRequestNote_Items.length);
    }

    get itemHeader() {
        if (this.data.RequestType && this.data.RequestType.toUpperCase() === "TEST") {
            return [
                { header: "Nama Barang", value: "Product" },
                { header: "Grade", value: "Grade" },
                { header: "Panjang (Meter)", value: "Length" }
            ]
        } else {
            return [
                { header: "No. SPP", value: "ProductionOrder" },
                { header: "Nama Barang", value: "Product" },
                { header: "Grade", value: "Grade" },
                { header: "Panjang (Meter)", value: "Length" }
            ]
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
            this.itemsOptions.isTest = this.data.RequestType && this.data.RequestType.toUpperCase() == "TEST" ? true : false;
        }.bind(this),
        onRemove: function () {

        }.bind(this)
    }
} 