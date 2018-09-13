import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;

        this.UpoItem = {
            columns: [
                { header: "No. PO Eksternal", value: "purchaseOrder.purchaseOrderExternal.no" },
                { header: "No. PR", value: "purchaseOrder.purchaseRequest.no" },
                { header: "Barang", value: "product" },
                { header: "Jumlah", value: "quantity" },
                { header: "Satuan", value: "uom.unit" },
                { header: "Harga Satuan", value: "pricePerUnit" },
                { header: "Harga Total", value: "priceTotal" }
            ],
            onRemove: function() {
                this.bind();
            }
            
        }
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    bind() {
        if (this.data)
            this.flag = true;
        else
            this.flag = false;

        if(!this.readOnly) {
            this.UpoItem.columns.push({ header: "" });
        }
    }

    unitPaymentOrderChanged(e) {
        var selectedPaymentOrder = e.detail;
        if (selectedPaymentOrder && !this.readOnly) {
            this.data.useVat = selectedPaymentOrder.useVat;
            this.data.useIncomeTax = selectedPaymentOrder.useIncomeTax;
            if (!this.readOnly)
                this.data.items = [];
            this.data.unitPaymentOrderId = selectedPaymentOrder._id;
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
                        unitQuantityCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.pricePerDealUnit;
                        unitQuantityCorrectionNoteItem.currency = unitReceiptNoteItem.currency;
                        unitQuantityCorrectionNoteItem.currencyRate = unitReceiptNoteItem.currencyRate;
                        unitQuantityCorrectionNoteItem.unitReceiptNoteNo = unitPaymentOrder.unitReceiptNote.no;

                        if (unitReceiptNoteItem.correction) {
                            if (unitReceiptNoteItem.correction.length > 0) {
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
                                unitQuantityCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit;
                                unitQuantityCorrectionNoteItem.priceTotal = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPriceTotal;

                            } else {
                                unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                                unitQuantityCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.pricePerDealUnit;
                                unitQuantityCorrectionNoteItem.priceTotal = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                            }
                        } else {
                            unitQuantityCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                            unitQuantityCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.pricePerDealUnit;
                            unitQuantityCorrectionNoteItem.priceTotal = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
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