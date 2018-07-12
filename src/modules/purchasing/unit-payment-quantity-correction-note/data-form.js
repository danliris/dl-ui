import { inject, bindable, computedFrom } from 'aurelia-framework'
import {Service} from './service';
var SupplierLoader = require('../../../loader/supplier-loader');
var UnitPaymentOrderLoader = require('../../../loader/unit-payment-order-loader')
var moment = require('moment');

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    }
    
    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        if (this.data)
            this.flag = true;
        else
            this.flag = false;
    }

    itemsColumns = [
        { header: "No. PO Eksternal", value: "product" },
        { header: "No. PR", value: "defaultQuantity" },
        { header: "Barang", value: "defaultUom" },
        { header: "Jumlah", value: "remark" },
        { header: "Satuan", value: "defaultUom" },
        { header: "Harga Satuan", value: "defaultUom" },
        { header: "Harga Total", value: "defaultUom" },
    ]

    get supplierLoader() {
        return SupplierLoader;
    }

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }

    unitPaymentOrderChanged(e) {
        var selectedPaymentOrder = e.detail;
        console.log(selectedPaymentOrder);
        if (selectedPaymentOrder && !this.readOnly) {
            this.data.useVat = selectedPaymentOrder.useVat;
            this.data.useIncomeTax = selectedPaymentOrder.useIncomeTax;
            console.log(this.data); 
            if (!this.readOnly)
                this.data.items = [];
            this.data.uPOId = selectedPaymentOrder._id;
            this.data.supplier = selectedPaymentOrder.supplier;
            var _items = [];
            if (selectedPaymentOrder.items) {
                for (var unitPaymentOrder of selectedPaymentOrder.items) {

                    for (var unitReceiptNoteItem of unitPaymentOrder.unitReceiptNote.items) {

                        var unitQuantityCorrectionNoteItem = {};
                        unitQuantityCorrectionNoteItem.purchaseOrder = unitReceiptNoteItem.purchaseOrder;
                        unitQuantityCorrectionNoteItem.purchaseOrderId = unitReceiptNoteItem.purchaseOrderId;
                        unitQuantityCorrectionNoteItem.product = unitReceiptNoteItem.product;
                        unitQuantityCorrectionNoteItem.productId = unitReceiptNoteItem.product._id;
                        unitQuantityCorrectionNoteItem.uom = unitReceiptNoteItem.deliveredUom;
                        unitQuantityCorrectionNoteItem.uomId = unitReceiptNoteItem.deliveredUom._id;
                        unitQuantityCorrectionNoteItem.pricePerDealUnitBefore = unitReceiptNoteItem.pricePerDealUnit;
                        // unitQuantityCorrectionNoteItem.pricePerDealUnitAfter = unitReceiptNoteItem.pricePerDealUnit;
                        unitQuantityCorrectionNoteItem.currency = unitReceiptNoteItem.currency;
                        unitQuantityCorrectionNoteItem.currencyRate = unitReceiptNoteItem.currencyRate;
                        unitQuantityCorrectionNoteItem.uRNNo = unitPaymentOrder.unitReceiptNote.no;
                        unitQuantityCorrectionNoteItem.priceTotalBefore = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                        if (unitReceiptNoteItem.correction) {
                            if (unitReceiptNoteItem.correction.length > 0) {
                                // var _qty = 0;
                                // var _hasQtyCorrection = false;
                                // for (var correction of unitReceiptNoteItem.correction) {
                                //     if (correction.correctionRemark === "Koreksi Jumlah") {
                                //         _qty += correction.correctionQuantity;
                                //         _hasQtyCorrection = true;
                                //     }
                                // }
                                // if (!_hasQtyCorrection) {
                                //     unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionQuantity;
                                //     unitQuantityCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit;
                                //     unitQuantityCorrectionNoteItem.priceTotal = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPriceTotal;
                                // } else {
                                //     unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity - _qty;
                                //     unitQuantityCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit;
                                //     unitQuantityCorrectionNoteItem.priceTotal = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit * unitQuantityCorrectionNoteItem.quantity;
                                // }
                                var _qty = unitReceiptNoteItem.correction
                                    .map((correction) => {
                                        if (correction.correctionRemark === "Koreksi Jumlah") {
                                            return correction.correctionQuantity;
                                        }
                                        else {
                                            return 0;
                                        }
                                    })
                                    .reduce((prev, curr, index) => {
                                        return prev + curr;
                                    }, 0);

                                unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity - _qty;
                                unitQuantityCorrectionNoteItem.pricePerDealUnitAfter = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit;
                                unitQuantityCorrectionNoteItem.priceTotalAfter = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPriceTotal;

                            } else {
                                unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                                unitQuantityCorrectionNoteItem.pricePerDealUnitAfter = unitReceiptNoteItem.pricePerDealUnit;
                                unitQuantityCorrectionNoteItem.priceTotalAfter = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                            }
                        } else {
                            unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                            unitQuantityCorrectionNoteItem.pricePerDealUnitAfter = unitReceiptNoteItem.pricePerDealUnit;
                            unitQuantityCorrectionNoteItem.priceTotalAfter = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                        }
                        _items.push(unitQuantityCorrectionNoteItem);
                    }
                }
                this.data.items = _items;
            }
            else {
                this.data.items = [];
            }
        }
        else {
            this.data.items = [];
        }
        this.resetErrorItems();
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }
} 