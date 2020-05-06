import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

let WarehousesAreaLoader = require("../../../loader/input-warehouses-loader");

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
    itemColumns = ["No. SPP", "Buyer", "Konstruksi", "Jenis", "Warna", "Motif", "Grade", "Packaging", "Qty Packaging", "Satuan", "QTY"];
    shifts = ["PAGI", "SIANG"];
    detailOptions = {};

    constructor(service) {
        this.service = service;
    }

    get warehousesAreaLoader() {
        return WarehousesAreaLoader;
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

        this.data.area = "GUDANG JADI";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.bonNo) {
            this.selectedWarehouses = {};
            this.selectedWarehouses.bonNo = this.data.bonNo;
        }

    }
    addItemCallback = (e) => {
        this.data.WarehousesProductionOrders = this.data.WarehousesProductionOrders || [];
        this.data.WarehousesProductionOrders.push({})
    };

    @bindable selectedWarehouses;
    selectedWarehousesChanged(n, o) {
        if (this.selectedWarehouses) {
            this.data.inputWarehousesId = this.selectedWarehouses.id;
            if (this.selectedWarehouses.warehousesProductionOrders) {
                this.data.warehousesProductionOrders = this.selectedWarehouses.warehousesProductionOrders;
                this.data.bonNo = this.selectedWarehouses.bonNo;
            }

            this.detailOptions.destinationArea = this.data.destinationArea;
        }
        
    }

    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }
}


