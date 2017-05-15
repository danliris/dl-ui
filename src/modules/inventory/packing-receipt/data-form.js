import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { Service } from './service';
import { BindingSignaler } from 'aurelia-templating-resources';

var moment = require('moment');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {

    // tableOptions = {
    //     pagination: false,
    //     search: false,
    //     showColumns: false,
    //     showToggle: false
    // }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    }

    itemsColumns = [
        { header: "Nama Barang", value: "product" },
        { header: "Quantity Diterima", value: "defaultQuantity" },
        { header: "Remark", value: "defaultUom" },
        { header: "Catatan", value: "remark" }
    ]

    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;

    // productionOrderFields = ["salesContractNo"];

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        // console.log(context.data);
        this.context = context;
        this.context._this = this;
        this.data = this.context.data;
        // this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    errorChanged() {
        if (this.error && this.error.fabricGradeTests) {
            var index = this.data.fabricGradeTests.indexOf(this.selectedFabricGradeTest);
            this.selectedFabricGradeTestError = this.error.fabricGradeTests[index];
        }
    }

    packingTextFormatter = (packing) => {
        return `${packing.code}`;
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() !== '';
    }

    @computedFrom("selectedPacking.productionOrderNo")
    get orderNo() {
        if (!this.selectedPacking)
            return "-";
        return `${this.selectedPacking.productionOrderNo}`;
    }

    get colorRequest() {
        if (!this.selectedPacking)
            return "-";
        return `${this.selectedPacking.colorName}`;
    }

    get construction() {
        if (!this.selectedPacking)
            return "-";
        return `${this.selectedPacking.construction}`;
    }

    get packingUom() {
        if (!this.selectedPacking)
            return "-";
        return `${this.selectedPacking.packingUom}`;
    }

    // @computedFrom("selectedPacking.productionOrderNo")
    // get originStorage() {
    //     if (!this.selectedPacking)
    //         return "-";
    //     return `Quality Control`;
    // }

    // @computedFrom("selectedPacking.productionOrderNo")
    // get destinationStorage() {
    //     if (!this.selectedPacking)
    //         return "-";
    //     return `Gudang Jadi`;
    // }

    get packingLoader() {
        return (keyword) => {
            var info = { keyword: keyword, };
            return this.service.searchPacking(info)
                .then((result) => {
                    // console.log(result);
                    // debugger
                    return result.data;
                })
        }
    }

    @bindable selectedPacking;
    salesContractNo = "";

    packingChanged() {
        if (this.selectedPacking) {
            this.salesContractNo = this.selectedPacking.salesContractNo;
        }
        console.log(this.salesContractNo);
        // console.log(this.selectedPacking);
    }

    setColumns() {
        this.columns = [
            {
                field: "dateIm", title: "Tanggal", formatter: (value, data) => {
                    return moment(value).format("DD-MMM-YYYY");
                }
            },
            { field: "shiftIm", title: "Shift" },
            { field: "operatorIm", title: "Operator" },
            { field: "machineNoIm", title: "No. Mesin" },
            { field: "productionOrderNo", title: "No. Order" },
            { field: "productionOrderType", title: "Jenis Order" },
            { field: "cartNo", title: "No. Kereta" }
        ];
    }

    // get purchaseRequestPostedLoader() {
    //     return PurchaseRequestPostedLoader;
    // }

    // get unitLoader() {
    //     return UnitLoader;
    // }

    // get categoryLoader() {
    //     return CategoryLoader;
    // }

    // purchaseRequestChanged(newValue) {
    //     this.data.purchaseRequest=newValue;
    //     if (this.data.purchaseRequest) {
    //         var _items = [];
    //         this.data.purchaseRequestId = this.data.purchaseRequest._id;

    //         this.data.purchaseRequest.unit.toString = function () {
    //             return [this.division.name, this.name]
    //                 .filter((item, index) => {
    //                     return item && item.toString().trim().length > 0;
    //                 }).join(" - ");
    //         }

    //         this.data.purchaseRequest.category.toString = function () {
    //             return [this.code, this.name]
    //                 .filter((item, index) => {
    //                     return item && item.toString().trim().length > 0;
    //                 }).join(" - ");
    //         }

    //         this.data.remark = this.data.purchaseRequest.remark;
    //         this.data.purchaseRequest.items.map((item) => {
    //             var _item = {};
    //             _item.product = item.product;
    //             _item.defaultUom = item.product.uom;
    //             _item.defaultQuantity = item.quantity;
    //             _item.remark = item.remark;
    //             _items.push(_item);
    //         })
    //         this.data.items = _items;

    //         this.data.items.forEach(item => {
    //             item.product.toString = function () {
    //                 return [this.code, this.name]
    //                     .filter((item, index) => {
    //                         return item && item.toString().trim().length > 0;
    //                     }).join(" - ");
    //             }
    //         })
    //     }
    //     else {
    //         this.data.purchaseRequest = {};
    //         this.data.purchaseRequestId = {};
    //         this.data.remark = "";
    //         this.data.items = [];
    //     }
    // }

} 