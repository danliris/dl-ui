import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

let PreShipmentLoader = require("../../../loader/pre-shipment-area-loader");
let DoSalesLoader = require("../../../loader/do-sales-loader");
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
    areas = ["IM", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIPMENT", "AVAL", "LAB"];
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
    get preShipmentLoader() {
        return PreShipmentLoader;
    }

    get doSalesLoader() {
        return DoSalesLoader;
    }

    areaMovementTextFormatter = (areaMovement) => {
        return `${areaMovement.bonNo}`
    }

    doSalesText = (doSales) => {
        return `${doSales.DOSalesNo}`
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "SHIPMENT";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.bonNo) {
            this.selectedPreShipment = {};
            this.selectedPreShipment.id = this.data.preShipmentAreaId;
            this.selectedPreShipment.bonNo = this.data.bonNo;
            this.selectedPreShipment.productionOrderNo = this.data.productionOrderNo;
            this.selectedPreShipment.buyerName = this.data.buyerName;
            this.selectedPreShipment.construction = this.data.construction;
            this.isPrinting = this.selectedPreShipment.unit === "PRINTING";
            this.selectedPreShipment.uomUnit = this.data.uomUnit;
            this.selectedPreShipment.color = this.data.color;
            this.selectedPreShipment.motif = this.data.motif;
            this.selectedPreShipment.grade = this.data.grade;
            this.selectedPreShipment.shift = this.data.shift;
            this.selectedPreShipment.packingQty = this.data.packingQty;
            this.selectedPreShipment.packingUom = this.data.packingUom;
            this.selectedPreShipment.packingBalance = this.data.packingBalance;
            this.packingQty = this.selectedPreShipment.packingQty;
            this.packingBalance = this.selectedPreShipment.packingBalance;
        }

        if (this.data.deliveryOrderSales) {
            this.selectedDoSales = {};
            this.selectedDoSales.Id = this.data.deliveryOrderSales.id;
            this.selectedDoSales.DOSalesNo = this.data.deliveryOrderSales.no;
        }
    }

    @bindable isPrinting;
    @bindable selectedPreShipment;
    @bindable packingQty;
    @bindable packingBalance;
    selectedPreShipmentChanged(n, o) {
        if (this.selectedPreShipment) {
            this.data.preShipmentAreaId = this.selectedPreShipment.id;
            this.data.bonNo = this.selectedPreShipment.bonNo;
            this.data.productionOrderNo = this.selectedPreShipment.productionOrderNo;
            this.data.buyerName = this.selectedPreShipment.buyerName;
            this.data.construction = this.selectedPreShipment.construction;
            this.data.color = this.selectedPreShipment.color;
            this.data.shift = this.selectedPreShipment.shift;
            this.data.motif = this.selectedPreShipment.motif;
            this.data.packingQty = this.selectedPreShipment.packingQty;
            this.data.packingUom = this.selectedPreShipment.packingUom;
            this.data.packingBalance = this.selectedPreShipment.packingBalance;
            this.isPrinting = this.selectedPreShipment.unit === "PRINTING";
            this.data.uomUnit = this.selectedPreShipment.uomUnit;
            this.packingQty = this.selectedPreShipment.packingQty;
            this.packingBalance = this.selectedPreShipment.packingBalance;
        }

    }

    @bindable selectedDoSales;
    selectedDoSalesChanged(n, o) {
        if (this.selectedDoSales) {
            this.data.deliveryOrderSales = {};
            this.data.deliveryOrderSales.id = this.selectedDoSales.Id;
            this.data.deliveryOrderSales.no = this.selectedDoSales.DOSalesNo;
        }
    }
}


