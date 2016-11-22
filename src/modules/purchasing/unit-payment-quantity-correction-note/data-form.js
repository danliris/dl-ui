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
            for (var unitPaymentOrder of selectedPaymentOrder.items) {

                for (var unitReceiptNoteItem of unitPaymentOrder.unitReceiptNote.items) {

                    var unitPaymentPriceCorrectionNoteItem = {};
                    unitPaymentPriceCorrectionNoteItem.purchaseOrder = unitReceiptNoteItem.purchaseOrder;
                    unitPaymentPriceCorrectionNoteItem.purchaseOrderId = unitReceiptNoteItem.purchaseOrderId;
                    unitPaymentPriceCorrectionNoteItem.product = unitReceiptNoteItem.product;
                    unitPaymentPriceCorrectionNoteItem.productId = unitReceiptNoteItem.product._id;
                    unitPaymentPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                    unitPaymentPriceCorrectionNoteItem.uom = unitReceiptNoteItem.deliveredUom;
                    unitPaymentPriceCorrectionNoteItem.uomId = unitReceiptNoteItem.deliveredUom._id;
                    unitPaymentPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.pricePerDealUnit;
                    unitPaymentPriceCorrectionNoteItem.priceTotal = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                    unitPaymentPriceCorrectionNoteItem.currency = unitReceiptNoteItem.currency;
                    unitPaymentPriceCorrectionNoteItem.currencyRate = unitReceiptNoteItem.currencyRate;
                    unitPaymentPriceCorrectionNoteItem.unitReceiptNoteNo = unitPaymentOrder.unitReceiptNote.no;

                    _items.push(unitPaymentPriceCorrectionNoteItem);
                }
            }
            this.data.items = _items;
        }
        else {
            this.data.items = [];
        }
    }
} 
