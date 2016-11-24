import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    priceCorrectionTypes = ["Harga Satuan", "Harga Total"];
    priceCorrectionType = "Harga Satuan";
    pricePerUnitCorrectionReadOnly = false;
    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    bind() {
        if (this.data) {
            this.flag = true;
            if (this.data.priceCorrectionType == "Harga Satuan")
                this.pricePerUnitCorrectionReadOnly = false;
            else if (this.data.priceCorrectionType == "Harga Total")
                this.pricePerUnitCorrectionReadOnly = true;
        }
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
            for (var unitPaymentOrder of selectedPaymentOrder.items) {

                for (var unitReceiptNoteItem of unitPaymentOrder.unitReceiptNote.items) {

                    var unitPaymentPriceCorrectionNoteItem = {};
                    unitPaymentPriceCorrectionNoteItem.purchaseOrder = unitReceiptNoteItem.purchaseOrder;
                    unitPaymentPriceCorrectionNoteItem.purchaseOrderId = unitReceiptNoteItem.purchaseOrderId;
                    unitPaymentPriceCorrectionNoteItem.product = unitReceiptNoteItem.product;
                    unitPaymentPriceCorrectionNoteItem.productId = unitReceiptNoteItem.product._id;
                    unitPaymentPriceCorrectionNoteItem.uom = unitReceiptNoteItem.deliveredUom;
                    unitPaymentPriceCorrectionNoteItem.uomId = unitReceiptNoteItem.deliveredUom._id;
                    unitPaymentPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.pricePerDealUnit;
                    unitPaymentPriceCorrectionNoteItem.currency = unitReceiptNoteItem.currency;
                    unitPaymentPriceCorrectionNoteItem.currencyRate = unitReceiptNoteItem.currencyRate;
                    unitPaymentPriceCorrectionNoteItem.unitReceiptNoteNo = unitPaymentOrder.unitReceiptNote.no;

                    if (unitReceiptNoteItem.correction) {
                        if (unitReceiptNoteItem.correction.length > 0)
                            unitPaymentPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionQuantity;
                        else
                            unitPaymentPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                    } else
                        unitPaymentPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;

                    unitPaymentPriceCorrectionNoteItem.priceTotal = unitReceiptNoteItem.pricePerDealUnit * unitPaymentPriceCorrectionNoteItem.quantity;
                    _items.push(unitPaymentPriceCorrectionNoteItem);
                }
            }
            this.data.items = _items;
        }
        else {
            this.data.items = [];
        }
    }

    priceCorrectionTypeChanged(e) {
        if (e.srcElement) {
            if (e.srcElement.value) {
                this.data.priceCorrectionType = e.srcElement.value;
                if (this.data.priceCorrectionType == "Harga Satuan")
                    this.pricePerUnitCorrectionReadOnly = false;
                else if (this.data.priceCorrectionType == "Harga Total")
                    this.pricePerUnitCorrectionReadOnly = true;
            }
        }
    }
} 
