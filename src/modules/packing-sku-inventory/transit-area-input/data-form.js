import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

let InspectionAreaLoader = require("../../../loader/input-inspection-material-loader");

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
    areas = ["IM", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIP", "AWAL", "LAB"];
    remarks = ["ACC BUYER", "KEP. PROD", "PERBAIKAN", "AVAL KARANTINA", "A", "B", "BS", "TS",
        "AVAL1", "AVAL2", "KG"];
    constructor(service) {
        this.service = service;
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }
    imQuery = { "IsChecked": true }
    get inspectionAreaLoader() {
        return InspectionAreaLoader;
    }
    areaMovementTextFormatter = (areaMovement) => {
        return `${areaMovement.bonNo}`
    }
    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "TRANSIT";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.bonNo) {
            this.selectedInspectionMaterial = {};
            this.selectedInspectionMaterial.id = this.data.inspectionAreaId;
            this.selectedInspectionMaterial.bonNo = this.data.bonNo;
            this.selectedInspectionMaterial.productionOrderNo = this.data.productionOrderNo;
            this.selectedInspectionMaterial.cartNo = this.data.cartNo;
            this.selectedInspectionMaterial.unitName = this.data.unit;
            this.selectedInspectionMaterial.materialName = this.data.material;
            this.selectedInspectionMaterial.materialConstructionName = this.data.materialConstruction;
            this.isPrinting = this.data.unit === "PRINTING";
            this.selectedInspectionMaterial.materialWidth = this.data.materialWidth;
            this.selectedInspectionMaterial.uomUnit = this.data.uomUnit;
            this.selectedInspectionMaterial.balance = this.balance;
            this.selectedInspectionMaterial.color = this.data.color;
            this.selectedInspectionMaterial.motif = this.data.motif;
            this.selectedInspectionMaterial.balance = this.data.balance;
        }
    }

    @bindable isPrinting;
    @bindable selectedInspectionMaterial;
    @bindable balance;
    selectedInspectionMaterialChanged(n, o) {
        if (this.selectedInspectionMaterial) {
            this.data.inspectionAreaId = this.selectedInspectionMaterial.id;
            this.data.bonNo = this.selectedInspectionMaterial.bonNo;
            this.data.productionOrderNo = this.selectedInspectionMaterial.productionOrderNo;
            this.data.cartNo = this.selectedInspectionMaterial.cartNo;
            this.data.unit = this.selectedInspectionMaterial.unitName;
            this.data.material = this.selectedInspectionMaterial.materialName;
            this.data.materialConstruction = this.selectedInspectionMaterial.materialConstructionName;
            this.isPrinting = this.data.unit === "PRINTING";
            this.data.materialWidth = this.selectedInspectionMaterial.materialWidth;
            this.data.uomUnit = this.selectedInspectionMaterial.uomUnit;
            this.balance = this.selectedInspectionMaterial.balance;
            this.data.color = this.selectedInspectionMaterial.color;
            this.data.motif = this.selectedInspectionMaterial.motif;
            this.data.balance = this.balance;
        }

    }
}


