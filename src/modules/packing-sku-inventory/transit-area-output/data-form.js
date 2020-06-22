import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

let TransitAreaLoader = require("../../../loader/input-transit-loader");
let FilterSPPLoader = require("../../../loader/pre-output-transit-spp-loader");

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

    get filterSPPLoader() {
        return FilterSPPLoader;
    }

    sppTextFormatter = (spp) => {
        return `${spp.productionOrder.no}`
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

        this.detailOptions = {
            isEdit: this.isEdit,
            destinationArea: this.data.destinationArea
        };

        if (this.data.transitProductionOrders) {
            this.data.displayTransitProductionOrders = this.data.transitProductionOrders;
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
        this.data.displayTransitProductionOrders = this.data.displayTransitProductionOrders || [];
        this.data.displayTransitProductionOrders.push({})
    };

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
        }
    }

    @bindable selectedFilterSPP;
    async selectedFilterSPPChanged(n, o) {
        if (this.selectedFilterSPP) {

            this.data.displayTransitProductionOrders = await this.service.getProductionOrderInputById(this.selectedFilterSPP.productionOrder.id);
            if (this.ItemsCollection) {
                this.ItemsCollection.bind();
            }
            console.log(this.data.displayTransitProductionOrders);
        } else {

            this.data.displayTransitProductionOrders = await this.service.getProductionOrderInput();
            if (this.ItemsCollection) {
                this.ItemsCollection.bind();
            }
        }
    }

}