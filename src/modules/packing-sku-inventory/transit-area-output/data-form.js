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
    itemColumns = ["No. SPP", "Qty Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Grade", "Saldo", "Qty Keluar", "Satuan"];
    shifts = ["PAGI", "SIANG"];
    detailOptions = {};
    destinationAreas = ["INSPECTION MATERIAL", "PACKING", "GUDANG JADI", "GUDANG AVAL"];
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


    groups = ["A", "B"];

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "TRANSIT";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        // if (this.data.bonNo) {
        //     this.selectedInspectionMaterial = {};
        //     this.selectedInspectionMaterial.bonNo = this.data.bonNo;
        // }
        this.detailOptions = {
            isEdit: this.isEdit,
            destinationArea: this.data.destinationArea
        };

        if (this.data.transitProductionOrders) {
            this.transitProductionOrders = this.data.transitProductionOrders;
        }

        if (this.data.destinationArea) {
            this.destinationArea = this.data.destinationArea;

            if (this.readOnly) {
                this.itemColumns = ["No. SPP", "Qty Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Grade", "Qty Keluar", "Satuan"];
            } else {
                if (this.isEdit) {
                    this.itemColumns = ["No. SPP", "Qty Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Grade", "Saldo", "Qty Keluar", "Satuan", ""];
                } else {
                    this.itemColumns = ["No. SPP", "Qty Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Grade", "Saldo", "Qty Keluar", "Satuan"];
                }

            }
        }
    }
    addItemCallback = (e) => {
        this.transitProductionOrders = this.transitProductionOrders || [];
        this.transitProductionOrders.push({})
    };

    // @bindable selectedInspectionMaterial;
    // selectedInspectionMaterialChanged(n, o) {
    //     if (this.selectedInspectionMaterial) {
    //         this.data.inputTransitId = this.selectedInspectionMaterial.id;
    //         if (this.selectedInspectionMaterial.transitProductionOrders) {
    //             this.data.transitProductionOrders = this.selectedInspectionMaterial.transitProductionOrders.filter(s => s.hasOutputDocument == false);
    //         }

    //     }

    // }


    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }

    @bindable destinationArea;
    destinationAreaChanged(n, o) {
        if (this.destinationArea) {
            this.data.destinationArea = this.destinationArea;
            this.detailOptions.destinationArea = this.data.destinationArea;
            if (this.readOnly) {
                this.itemColumns = ["No. SPP", "Qty Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Grade", "Qty Keluar", "Satuan"];
            } else {
                if (this.isEdit) {
                    this.itemColumns = ["No. SPP", "Qty Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Grade", "Saldo", "Qty Keluar", "Satuan", ""];
                } else {
                    this.itemColumns = ["No. SPP", "Qty Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Grade", "Saldo", "Qty Keluar", "Satuan"];
                }
            }
            // if (!this.data.id) {

            //     this.selectedInspectionMaterial = null;
            //     this.data.transitProductionOrders = [];
            // }

        }
    }


}