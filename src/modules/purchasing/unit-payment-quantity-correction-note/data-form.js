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
    }

    unitPaymentOrderChanged(e) {
        var selectedPaymentOrder = e.detail || {};
        if (selectedPaymentOrder && !this.readOnly) {
            if (!this.readOnly)
                this.data.items = [];
            this.data.unitPaymentOrderId = selectedPaymentOrder._id;
            var _items = []
            if (selectedPaymentOrder.items) {
                for (var unitPaymentOrder of selectedPaymentOrder.items) {

                    for (var unitReceiptNoteItem of unitPaymentOrder.unitReceiptNote.items) {

                        var unitQuantityPriceCorrectionNoteItem = {};
                        unitQuantityPriceCorrectionNoteItem.purchaseOrder = unitReceiptNoteItem.purchaseOrder;
                        unitQuantityPriceCorrectionNoteItem.purchaseOrderId = unitReceiptNoteItem.purchaseOrderId;
                        unitQuantityPriceCorrectionNoteItem.product = unitReceiptNoteItem.product;
                        unitQuantityPriceCorrectionNoteItem.productId = unitReceiptNoteItem.product._id;
                        unitQuantityPriceCorrectionNoteItem.uom = unitReceiptNoteItem.deliveredUom;
                        unitQuantityPriceCorrectionNoteItem.uomId = unitReceiptNoteItem.deliveredUom._id;
                        unitQuantityPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.pricePerDealUnit;
                        unitQuantityPriceCorrectionNoteItem.currency = unitReceiptNoteItem.currency;
                        unitQuantityPriceCorrectionNoteItem.currencyRate = unitReceiptNoteItem.currencyRate;
                        unitQuantityPriceCorrectionNoteItem.unitReceiptNoteNo = unitPaymentOrder.unitReceiptNote.no;

                        if (unitReceiptNoteItem.correction) {
                            if (unitReceiptNoteItem.correction.length > 0) {
                                unitQuantityPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionQuantity;
                                unitQuantityPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit;
                                unitQuantityPriceCorrectionNoteItem.priceTotal = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPriceTotal;
                            } else {
                                unitQuantityPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                                unitQuantityPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.pricePerDealUnit;
                                unitQuantityPriceCorrectionNoteItem.priceTotal = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                            }
                        } else {
                            unitQuantityPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                            unitQuantityPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.pricePerDealUnit;
                            unitQuantityPriceCorrectionNoteItem.priceTotal = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                        }

                        _items.push(unitQuantityPriceCorrectionNoteItem);
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
    }
} 
