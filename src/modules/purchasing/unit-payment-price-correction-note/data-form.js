import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
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
        // if (this.data && this.data.supplier)
        //     this.data.supplier.toString = function () {
        //         return this.code + " - " + this.name;
        //     };
    }

    unitPaymentOrderChanged(e) {
        var selectedPaymentOrder = e.detail || {};
        if (selectedPaymentOrder._id) {
            this.data.unitPaymentOrderId = selectedPaymentOrder._id;

            var _item = []
            for (var unitReceiptNote of selectedPaymentOrder.unitReceiptNote.items) {
                var unitPaymentPriceCorrectionNoteItem = {};

                for (var unitReceiptNoteItem of unitReceiptNote.items) {
                    unitPaymentPriceCorrectionNoteItem.purchaseOrderExternalId = unitReceiptNoteItem.purchaseOrder.purchaseOrderExternalId;
                    unitPaymentPriceCorrectionNoteItem.purchaseOrderExternal = unitReceiptNoteItem.purchaseOrder.purchaseOrderExternal;
                    unitPaymentPriceCorrectionNoteItem.purchaseRequestId = unitReceiptNoteItem.purchaseOrder.purchaseRequestId;
                    unitPaymentPriceCorrectionNoteItem.purchaseRequest = unitReceiptNoteItem.purchaseOrder.purchaseRequest;
                    unitPaymentPriceCorrectionNoteItem.product = unitReceiptNote.product;
                    unitPaymentPriceCorrectionNoteItem.quantity = unitReceiptNote.deliveredQuantity;
                    unitPaymentPriceCorrectionNoteItem.uom = unitReceiptNote.deliveredUom;
                    unitPaymentPriceCorrectionNoteItem.pricePerUnit = unitReceiptNote.pricePerDealUnit;
                    unitPaymentPriceCorrectionNoteItem.priceTotal = unitReceiptNote.pricePerDealUnit * unitReceiptNote.deliveredQuantity;
                    unitPaymentPriceCorrectionNoteItem.currency = unitReceiptNoteItem.currency;
                    unitPaymentPriceCorrectionNoteItem.currencyRate = unitReceiptNoteItem.currencyRate;

                    _item.push(unitPaymentPriceCorrectionNoteItem);
                }
            }
            this.data.items = _item;
        }
    }
} 