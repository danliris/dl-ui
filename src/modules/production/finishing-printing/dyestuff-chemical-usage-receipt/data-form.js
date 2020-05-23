import { inject, bindable, computedFrom } from 'aurelia-framework';
import { months } from '../../../../../node_modules/moment/moment';

let ProductionOrderLoader = require("../../../../loader/production-order-loader");
let StrikeOffLoader = require("../../../../loader/strike-off-usage-loader");
var moment = require('moment');
export class DataForm {
    @bindable title;
    @bindable readOnly;

    // itemYears = [];

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };


    get productionOrderLoader() {
        return ProductionOrderLoader;
    }


    get strikeOffLoader() {
        return StrikeOffLoader;
    }

    constructor(service) {
        this.service = service;

    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.StrikeOff) {
            this.selectedStrikeOff = this.data.StrikeOff;
        }

        if (this.data.ProductionOrder) {
            this.selectedProductionOrder = this.data.ProductionOrder;
        }
    }

    construction = "";
    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(n, o) {
        if (this.selectedProductionOrder) {
            this.data.ProductionOrder = this.selectedProductionOrder;

            this.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth}`
        }
    }
    @bindable selectedStrikeOff;
    selectedStrikeOffChanged(n, o) {
        if (this.selectedStrikeOff) {
            this.data.StrikeOff = this.selectedStrikeOff;

            if (!this.data.Id) {
                this.data.UsageReceiptItems = [];
                for (var item of this.data.StrikeOff.StrikeOffItems) {

                    var usageReceipt = {};
                    usageReceipt.ColorCode = item.ColorCode;
                    usageReceipt.UsageReceiptDetails = [];
                    var idx = 0;
                    for (var detail of item.StrikeOffItemDetails) {
                        var usageDetail = {};
                        usageDetail.Index = idx++;
                        usageDetail.Name = detail.Name;
                        usageDetail.ReceiptQuantity = detail.Quantity;

                        usageReceipt.UsageReceiptDetails.push(usageDetail);
                    }
                    this.data.UsageReceiptItems.push(usageReceipt);
                }
            }
        }
    }
}