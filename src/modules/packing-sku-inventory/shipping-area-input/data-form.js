import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
let PreShippingAreaLoader = require("../../../loader/pre-input-transit-loader");

@inject(Service)
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
    imQuery = {"DestinationArea" : "TRANSIT"}
    itemColumns = ["No. DO", "No. SPP", "Buyer", "Konstruksi", "Jenis",  "Warna", "Motif", "Grade", "Packing", "QTY Packing", "QTY", "Satuan"];
    shifts = ["PAGI", "SIANG"];
    areas = ["INSPECTION MATERIAL", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIPPING", "AWAL", "LAB"]
    constructor(service) {
        this.service = service;
    }

    get preShippingAreaLoader() {
        return PreShippingAreaLoader;
    }

    areaMovementTextFormatter = (areaInput) => {
        return `${areaInput.bonNo}`
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "SHIPPING";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.bonNo) {
            this.selectedPreShipping = {};
            this.selectedPreShipping.bonNo = this.data.bonNo;
        }
    }
    addItemCallback = (e) => {
        this.data.shippingProductionOrders = this.data.shippingProductionOrders || [];
        this.data.shippingProductionOrders.push({})
    };

    @bindable selectedPreShipping;
    selectedPreShippingChanged(n, o) {
        if (this.selectedPreShipping) {
            this.data.outputInspectionMaterialId = this.selectedPreShipping.id;
            if (this.selectedPreShipping.preShippingProductionOrders) {
                this.data.shippingProductionOrders = this.selectedInspectionMaterial.preShippingProductionOrders;
            }

        }

    }
}


