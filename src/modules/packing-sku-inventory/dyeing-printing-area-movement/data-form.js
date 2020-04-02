import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
var ProductionOrderLoader = require('../../../loader/production-order-azure-loader');
import MaterialLoader from "../../../loader/product-loader";
var MaterialConstructionLoader = require('../../../loader/material-construction-loader');

import UnitLoader from "../../../loader/unit-loader";
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };
    unitQuery = { "DivisionName.toUpper()": "DYEING & PRINTING" };
    shifts = ["PAGI", "SIANG"];
    mutations = ["AWAL", "MASUK", "KELUAR", "ADJ MASUK", "ADJ KELUAR"];
    uomUnits = ["MTR", "YDS"];
    areas = ["IM", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIP", "AWAL", "LAB"]
    constructor(service) {
        this.service = service;
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get materialLoader() {
        return MaterialLoader;
    }

    get materialConstructionLoader() {
        return MaterialConstructionLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "IM";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.productionOrder) {
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.Id = this.data.productionOrder.id;
            this.selectedProductionOrder.Code = this.data.productionOrder.code;
            this.selectedProductionOrder.OrderNo = this.data.productionOrder.no;
            this.selectedProductionOrder.OrderQuantity = this.data.productionOrder.productionOrderQuantity;
            this.selectedProductionOrder.Material = this.data.material;
            this.selectedProductionOrder.MaterialConstruction = this.data.materialConstruction;
            this.selectedProductionOrder.FinishWidth = this.data.materialWidth;
            this.selectedProductionOrder.OrderQuantity = this.data.productionOrderQuantity;
        }

        if (this.data.unit) {
            this.selectedUnit = this.data.unit;
            this.isPrinting = this.data.unit.name === "PRINTING";
        }

        if (this.data.length) {
            this.length = this.data.length;
        }

        if (this.data.balance) {
            this.balance = this.data.balance;
        }
    }

    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder.Id) {
            this.data.productionOrder = {};
            this.data.productionOrder.id = this.selectedProductionOrder.Id;
            this.data.productionOrder.no = this.selectedProductionOrder.OrderNo;
            this.data.productionOrder.code = this.selectedProductionOrder.Code;

            this.sppQty = this.selectedProductionOrder.OrderQuantity;
            this.selectedMaterial = this.selectedProductionOrder.Material;
            this.selectedMaterialConstruction = this.selectedProductionOrder.MaterialConstruction;
            this.data.materialWidth = this.selectedProductionOrder.FinishWidth;
        }
        else {
            this.data.productionOrder = {};
        }
    }

    @bindable sppQty;
    sppQtyChanged(newValue, oldValue) {
        if (this.sppQty) {
            this.data.productionOrderQuantity = this.sppQty;
        }
    }

    @bindable selectedMaterial;
    selectedMaterialChanged(newValue, oldValue) {
        if (this.selectedMaterial && this.selectedMaterial.Id) {
            this.data.material = this.selectedMaterial;
        }
    }

    @bindable selectedMaterialConstruction;
    selectedMaterialConstructionChanged(newValue, oldValue) {
        if (this.selectedMaterialConstruction && this.selectedMaterialConstruction.Id) {
            this.data.materialConstruction = this.selectedMaterialConstruction;
        }
    }

    @bindable selectedUnit;
    @bindable isPrinting = false;
    selectedUnitChanged(newValue, oldValue) {
        if (this.selectedUnit && this.selectedUnit.Id) {
            this.data.unit = this.selectedUnit;
            this.isPrinting = this.data.unit.name === "PRINTING";
        } else {
            this.data.Unit = {};
        }
    }

    @bindable length;
    lengthChanged(newValue, oldValue) {
        if (this.length) {
            this.data.length = this.length;
        }
    }

    @bindable balance;
    balanceChanged(newValue, oldValue) {
        if (this.balance) {
            this.data.balance = this.balance;
        }
    }
}


