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
    typeItems = ["", "AWAL", "PENGGANTI BAD OUTPUT"];

    itemsOptions = {};
    @bindable selectedUnit;
    async selectedUnitChanged(newVal, oldVal) {
        // this.data.MaterialsRequestNote_Items = !this.isView ? [] : this.data.MaterialsRequestNote_Items;
        if (this.selectedUnit && this.selectedUnit._id) {
            this.data.Unit = this.selectedUnit;
            this.itemsOptions.productionOrderFilter = this.selectedUnit.name && this.selectedUnit.name.toUpperCase() === "PRINTING" ? { "orderType.name": "PRINTING", "isClosed": false } : { "orderType.name": { "$nin": ["PRINTING"] }, "isClosed": false };

            // console.log(this);
            if (oldVal)
                this.data.MaterialsRequestNote_Items = [];
        }
        else {
            this.data = {};
            this.data.MaterialsRequestNote_Items = [];
            this.selectedUnit = null;
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    // MaterialsRequestNoteInfo = {
    //     columns: [
    //         { header: "No. SPP" },
    //         { header: "Nama Barang" },
    //         { header: "Grade" },
    //         { header: "Panjang (Meter)" }
    //     ],
    //     onAdd: function () {
    //         this.data.MaterialsRequestNote_Items.push({});
    //     }.bind(this)
    // }

    get itemHeader() {
        return [
            { header: "No. SPP", value: "ProductionOrder" },
            { header: "Nama Barang", value: "Product" },
            { header: "Grade", value: "Grade" },
            { header: "Panjang (Meter)", value: "Length" }
        ]
    }

    get addItems() {
        return (event) => {
            var newDetail = {
                ProductionOrder: null,
                Product: null,
                Grade: "",
                Length: 0
            };
            this.context.MaterialsCollection.bind();
            this.data.MaterialsRequestNote_Items.push(newDetail);
        };
    }
} 