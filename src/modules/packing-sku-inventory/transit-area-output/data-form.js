import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

let TransitAreaLoader = require("../../../loader/input-transit-loader");

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
    itemColumns = ["No. SPP", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Grade", "Satuan", "Saldo"];
    shifts = ["PAGI", "SIANG"];
    detailOptions = {};
    destinationAreas = ["GUDANG JADI"];
    areas = ["INSPECTION MATERIAL", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIP", "AWAL", "LAB"]
    constructor(service) {
        this.service = service;
    }

    get transitAreaLoader() {
        return TransitAreaLoader;
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

        this.data.area = "TRANSIT";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.bonNo) {
            this.selectedInspectionMaterial = {};
            this.selectedInspectionMaterial.bonNo = this.data.bonNo;
        }

    }
    addItemCallback = (e) => {
        this.data.transitProductionOrders = this.data.transitProductionOrders || [];
        this.data.transitProductionOrders.push({})
    };

    @bindable selectedInspectionMaterial;
    selectedInspectionMaterialChanged(n, o) {
        if (this.selectedInspectionMaterial) {
            this.data.inputTransitId = this.selectedInspectionMaterial.id;
            if (this.selectedInspectionMaterial.transitProductionOrders) {
                this.data.transitProductionOrders = this.selectedInspectionMaterial.transitProductionOrders.filter(s => s.hasOutputDocument == false);
            }

            this.detailOptions.destinationArea = this.data.destinationArea;
        }

    }

    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }
}


