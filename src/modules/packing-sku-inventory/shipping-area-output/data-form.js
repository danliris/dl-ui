import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

let ShippingAreaLoader = require("../../../loader/output-shipping-loader");
var DOSalesLoader = require('../../../loader/do-sales-loader');
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
    itemColumns = ["No. SPP", "Material", "Unit", "Buyer", "Warna", "Motif", "Jenis", "Grade", "Satuan", "Saldo", "Qty IN"];
    shifts = ["PAGI", "SIANG"];
    detailOptions = {};
    destinationAreas = ["PENJUALAN", "BUYER"];
    areas = ["INSPECTION MATERIAL", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIPPING", "AWAL", "LAB"]
    constructor(service) {
        this.service = service;
    }

    groups = ["A", "B"];

    get shippingAreaLoader() {
        return ShippingAreaLoader;
    }

    get doSalesLoader() {
        return DOSalesLoader;
    }

    areaMovementTextFormatter = (areaInput) => {
        return `${areaInput.bonNo}`
    }

    doTextFormatter = (deliveryOrder) => {
        return `${deliveryOrder.DOSalesNo}`
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
            this.selectedShipping = {};
            this.selectedShipping.bonNo = this.data.bonNo;
        }

        if (this.data.shippingProductionOrders) {
            this.data.displayShippingProductionOrders = this.data.shippingProductionOrders;
        }

        if (this.data.destinationArea) {
            this.destinationArea = this.data.destinationArea;

            if (this.destinationArea === "PENJUALAN") {
                if (this.readOnly) {
                    this.itemColumns = ["No. SPP", "Material", "Unit", "Buyer", "Warna", "Motif", "Jenis", "Grade", "Satuan", "Qty IN"];
                } else {
                    this.itemColumns = ["No. SPP", "Material", "Unit", "Buyer", "Warna", "Motif", "Jenis", "Grade", "Satuan", "Saldo", "Qty IN"];
                }
                this.isSales = true;
            } else {
                this.itemColumns = ["No. SPP", "Material", "Unit", "Buyer", "Warna", "Motif", "Jenis", "Grade", "Satuan", "Qty IN", "SJ"];
                this.isSales = true;
            }
            this.detailOptions.isSales = this.isSales;

        }

        if (this.data.deliveryOrder) {
            this.selectedDO = {};
            this.selectedDO.Id = this.data.deliveryOrder.id;
            this.selectedDO.DOSalesNo = this.data.deliveryOrder.no;
        }

    }
    addItemCallback = (e) => {
        this.data.displayShippingProductionOrders = this.data.displayShippingProductionOrders || [];
        this.data.displayShippingProductionOrders.push({})
    };

    @bindable selectedShipping;
    selectedShippingChanged(n, o) {
        if (this.selectedShipping) {
            this.data.inputShippingId = this.selectedShipping.id;
            if (this.selectedShipping.shippingProductionOrders) {
                this.data.displayShippingProductionOrders = this.selectedShipping.shippingProductionOrders.filter(s => !s.hasNextAreaDocument);
                this.data.bonNo = this.selectedShipping.bonNo;
                this.data.deliveryOrder = this.selectedShipping.deliveryOrder;
                this.data.inputShippingId == this.selectedShipping.id;
            }

        }

    }
    shippingQuery = {
        DestinationArea: "PENJUALAN"
    };
    @bindable selectedDO;
    async selectedDOChanged(n, o) {
        if (this.selectedDO) {
            this.data.deliveryOrder = {};
            this.data.deliveryOrder.id = this.selectedDO.Id;
            this.data.deliveryOrder.no = this.selectedDO.DOSalesNo;
            if (!this.isEdit)
                this.data.displayShippingProductionOrders = await this.service.getProductionOrderFromInput(this.selectedDO.Id);
        }
    }

    @bindable destinationArea;
    destinationAreaChanged(n, o) {
        if (this.destinationArea) {
            this.data.destinationArea = this.destinationArea;
            if (this.destinationArea === "PENJUALAN") {
                this.isSales = true;
                if (this.readOnly) {
                    this.itemColumns = ["No. SPP", "Material", "Unit", "Buyer", "Warna", "Motif", "Jenis", "Grade", "Satuan", "Qty IN"];
                } else {
                    this.itemColumns = ["No. SPP", "Material", "Unit", "Buyer", "Warna", "Motif", "Jenis", "Grade", "Satuan", "Saldo", "Qty IN"];
                }
            } else {
                this.isSales = false;
                this.itemColumns = ["No. SPP", "Material", "Unit", "Buyer", "Warna", "Motif", "Jenis", "Grade", "Satuan", "Qty IN", "SJ"];
            }
            this.detailOptions.isSales = this.isSales;
        }
    }

    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }
}


