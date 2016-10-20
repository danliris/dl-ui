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
            for (var item of selectedPaymentOrder.items) {
                var unitPaymentPriceCorrectionNoteItem = {};
                var _productId = item.product._id;
                var unitReceiptNoteItem = {};
                for (var _unitReceiptNoteItem of item.unitReceiptNote.items) {
                    if (_unitReceiptNoteItem.product._id ==_productId) {
                        unitReceiptNoteItem = _unitReceiptNoteItem;
                        break;
                    }
                };

                unitPaymentPriceCorrectionNoteItem.purchaseOrderExternalId = unitReceiptNoteItem.purchaseOrder.purchaseOrderExternalId;
                unitPaymentPriceCorrectionNoteItem.purchaseOrderExternal = unitReceiptNoteItem.purchaseOrder.purchaseOrderExternal;
                unitPaymentPriceCorrectionNoteItem.purchaseRequestId = unitReceiptNoteItem.purchaseOrder.purchaseRequestId;
                unitPaymentPriceCorrectionNoteItem.purchaseRequest = unitReceiptNoteItem.purchaseOrder.purchaseRequest;
                unitPaymentPriceCorrectionNoteItem.product = item.product;
                unitPaymentPriceCorrectionNoteItem.quantity = item.unitReceiptNoteQuantity;
                unitPaymentPriceCorrectionNoteItem.uom = item.unitReceiptNoteUom;
                unitPaymentPriceCorrectionNoteItem.pricePerUnit = item.invoicePrice;
                unitPaymentPriceCorrectionNoteItem.priceTotal = item.invoicePrice * item.unitReceiptNoteQuantity;

                _item.push(unitPaymentPriceCorrectionNoteItem);
            }
            this.data.items = _item;
        }
    }
} 