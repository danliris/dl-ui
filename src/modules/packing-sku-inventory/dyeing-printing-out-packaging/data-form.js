import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

let PackagingAreaLoader = require("../../../loader/output-packaging-loader");

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable readOnlyKeterangan;
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
    itemColumns = ["No. SPP","Qty Order", "Buyer", "Unit", "Material", "Warna", "Motif","Jenis", "Grade", "Qty Packaging", "Packaging", "Satuan", "Saldo","QTY Keluar","Keterangan"];
    shifts = ["PAGI", "SIANG"];
    groups = ["A", "B"];
    detailOptions = {};
    destinationAreas = ["INSPECTION MATERIAL","TRANSIT", "GUDANG AVAL","GUDANG JADI"];
    constructor(service) {
        this.service = service;
    }

    get packagingAreaLoader() {
        return PackagingAreaLoader;
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

        this.data.area = "PACKING";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        console.log(this);
        if (this.data.bonNo) {
            this.selectedPackaging = {};
            this.selectedPackaging.bonNo = this.data.bonNo;
            console.log(this);
        }

    }
    addItemCallback = (e) => {
        this.data.packagingProductionOrders = this.data.packagingProductionOrders || [];
        this.data.packagingProductionOrders.push({});
    };

    @bindable selectedPackaging;
    selectedPackagingChanged(n, o) {
        this.detailOptions.destinationArea = this.data.destinationArea;
        if(n){
            this.data.bonNoInput = n.bonNo;
        }
        // console.log(n);
    }

    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }
}


