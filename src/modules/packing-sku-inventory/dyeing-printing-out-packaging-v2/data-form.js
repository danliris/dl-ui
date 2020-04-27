import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

let PackagingAreaLoader = require("../../../loader/output-packaging-loader");

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
    // itemColumns = ["No. SPP", "Buyer", "Unit", "Material", "Warna", "Motif","Jenis", "Grade", "Qty Packaging", "Packaging", "Satuan", "Saldo"];
    columns = [
        // {
        //     field: "date", title: "Tanggal", formatter: function (value, data, index) {
        //         return moment(value).format("DD MMM YYYY");
        //     }
        // },
        // { field: "bonNo", title: "No. Bon" },
        { field: "noSpp", title: "No. SPP" },  
        { field: "buyer", title: "Buyer" },        
        { field: "shift", title: "Shift" },
        { field: "material", title: "Material" },
        { field: "unit", title: "Unit" },        
        { field: "warna", title: "Warna" },        
        { field: "motif", title: "Motif" },
        // { field: "packagingType", title: "Jenis" },
        { field: "grade", title: "Grade" },        
        // { field: "packagingQty", title: "Qty Packaging" },        
        // { field: "packagingUnit", title: "Packaging" },        
        // { field: "mtr", title: "Mtr" },        
        // { field: "yds", title: "Yds" },        
        { field: "saldo", title: "Saldo" }
    ];
    shifts = ["PAGI", "SIANG"];
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

        if (this.data.bonNo) {
            this.selectedPackaging = {};
            this.selectedPackaging.bonNo = this.data.bonNo;
        }

    }
    addItemCallback = (e) => {
        this.data.PackagingProductionOrders = this.data.PackagingProductionOrders || [];
        this.data.PackagingProductionOrders.push({})
    };

    @bindable selectedPackaging;
    selectedPackagingChanged(n, o) {
        if (this.selectedPackaging) {
            this.data.inputPackagingId = this.selectedPackaging.id;
            if (this.selectedPackaging.packagingProductionOrders) {
                this.data.packagingProductionOrders = this.selectedPackaging.packagingProductionOrders;
            }

            this.detailOptions.destinationArea = this.data.destinationArea;
        }
        
    }

    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }
}


