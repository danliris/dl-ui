import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './service';
var moment = require('moment');

@inject(Service, BindingEngine, BindingSignaler)
export class DataForm {
    @bindable readOnly = false;
    @bindable isView = false;
    @bindable data;
    @bindable error;
    @bindable isUseVat = false;
    @bindable isUseIncomeTax = false;

    deliveryOrderFields = [
        "_id",
        "_createdBy",
        "no",
        "date",
        "supplierDoDate",
        "supplier.code",
        "supplier._id",
        "supplier.name",
        "supplier.address",
        "shipmentType",
        "shipmentNo",
        "items.purchaseOrderExternalId",
        "items.purchaseOrderExternalNo",
        "items.fulfillments.purchaseOrderId",
        "items.fulfillments.purchaseOrderNo",
        "items.fulfillments.purchaseRequestId",
        "items.fulfillments.purchaseRequestNo",
        "items.fulfillments.purchaseRequestRefNo",
        "items.fulfillments.roNo",
        "items.fulfillments.productId",
        "items.fulfillments.product.code",
        "items.fulfillments.product.name",
        "items.fulfillments.product.price",
        "items.fulfillments.product.currency._id",
        "items.fulfillments.product.currency.code",
        "items.fulfillments.product.currency.rate",
        "items.fulfillments.product.currency.symbol",
        "items.fulfillments.product.description",
        "items.fulfillments.product.uomId",
        "items.fulfillments.product.uom.unit",
        "items.fulfillments.purchaseOrderQuantity",
        "items.fulfillments.purchaseOrderQuantity",
        "items.fulfillments.purchaseOrderUom._id",
        "items.fulfillments.purchaseOrderUom.unit",
        "items.fulfillments.purchaseOrderUom.unit",
        "items.fulfillments.deliveredQuantity",
        "items.fulfillments.realizationQuantity",
        "items.fulfillments.remainsQuantity",
        "items.fulfillments.pricePerDealUnit",
        "items.fulfillments.currency._id",
        "items.fulfillments.currency.code",
        "items.fulfillments.currency.rate",
        "items.fulfillments.currency.symbol",
        "items.fulfillments.corrections"
    ];

    itemsColumns = [
        { header: "Nomor PO External", value: "purchaseOrderExternalNo" },
        { header: "Nomor PR", value: "purchaseRequestNo" },
        { header: "Nomor Ref PR", value: "purchaseRequestRefNo" },
        { header: "Nomor RO", value: "roNo" },
        { header: "Nama Barang", value: "product.name" },
        { header: "Jumlah", value: "quantity" },
        { header: "Satuan", value: "uom.unit" },
        { header: "Harga Satuan", value: "pricePerUnit" },
        { header: "Harga Total", value: "priceTotal" }
    ];

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() !== '';
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data._id && this.data.deliveryOrder) {
            this.selectedDeliveryOrder = this.data.deliveryOrder;
        }
    }

    @bindable selectedDeliveryOrder;
    selectedDeliveryOrderChanged(e) {
        if (this.selectedDeliveryOrder && this.selectedDeliveryOrder._id) {
            this.data.deliveryOrderId = this.selectedDeliveryOrder._id;
            this.data.deliveryOrder = this.selectedDeliveryOrder;
            if (!this.readOnly) {
                var _items = [];
                for (var deliveryOrderItem of this.selectedDeliveryOrder.items) {
                    for (var deliveryOrderFulfillment of deliveryOrderItem.fulfillments) {
                        var _item = {};

                        if (deliveryOrderFulfillment.corrections && deliveryOrderFulfillment.corrections.length > 0) {
                            var lastIndex = deliveryOrderFulfillment.corrections.length - 1;
                            _item.purchaseOrderExternalId = deliveryOrderItem.purchaseOrderExternalId;
                            _item.purchaseOrderExternalNo = deliveryOrderItem.purchaseOrderExternalNo;
                            _item.purchaseOrderInternalId = deliveryOrderFulfillment.purchaseOrderId;
                            _item.purchaseOrderInternalNo = deliveryOrderFulfillment.purchaseOrderNo;
                            _item.purchaseRequestId = deliveryOrderFulfillment.purchaseRequestId;
                            _item.purchaseRequestNo = deliveryOrderFulfillment.purchaseRequestNo;
                            _item.purchaseRequestRefNo = deliveryOrderFulfillment.purchaseRequestRefNo;
                            _item.roNo = deliveryOrderFulfillment.roNo;
                            _item.productId = deliveryOrderFulfillment.productId;
                            _item.product = deliveryOrderFulfillment.product;
                            _item.quantity = deliveryOrderFulfillment.corrections[lastIndex].correctionQuantity;
                            _item.uomId = deliveryOrderFulfillment.product.uomId;
                            _item.uom = deliveryOrderFulfillment.product.uom;
                            _item.pricePerUnit = deliveryOrderFulfillment.corrections[lastIndex].correctionPricePerUnit;
                            _item.priceTotal = deliveryOrderFulfillment.corrections[lastIndex].correctionPriceTotal;
                            _item.currency = deliveryOrderFulfillment.currency;
                            _item.currencyRate = deliveryOrderFulfillment.currency.rate;
                            _items.push(_item);

                        } else {
                            _item.purchaseOrderExternalId = deliveryOrderItem.purchaseOrderExternalId;
                            _item.purchaseOrderExternalNo = deliveryOrderItem.purchaseOrderExternalNo;
                            _item.purchaseOrderInternalId = deliveryOrderFulfillment.purchaseOrderId;
                            _item.purchaseOrderInternalNo = deliveryOrderFulfillment.purchaseOrderNo;
                            _item.purchaseRequestId = deliveryOrderFulfillment.purchaseRequestId;
                            _item.purchaseRequestNo = deliveryOrderFulfillment.purchaseRequestNo;
                            _item.purchaseRequestRefNo = deliveryOrderFulfillment.purchaseRequestRefNo;
                            _item.roNo = deliveryOrderFulfillment.roNo;
                            _item.productId = deliveryOrderFulfillment.productId;
                            _item.product = deliveryOrderFulfillment.product;
                            _item.quantity = deliveryOrderFulfillment.deliveredQuantity;
                            _item.uomId = deliveryOrderFulfillment.product.uomId;
                            _item.uom = deliveryOrderFulfillment.product.uom;
                            _item.pricePerUnit = deliveryOrderFulfillment.pricePerDealUnit;
                            _item.priceTotal = deliveryOrderFulfillment.deliveredQuantity * deliveryOrderFulfillment.pricePerDealUnit;
                            _item.currency = deliveryOrderFulfillment.currency;
                            _item.currencyRate = deliveryOrderFulfillment.currency.rate;
                            _items.push(_item);
                        }
                    }
                }
                this.data.items = _items;
            }
        } else {
            this.data.deliveryOrderId = {};
            this.data.deliveryOrder = {};
            this.data.items = [];
            this.data.remarks = "";
        }

        if (this.data.deliveryOrder) {
            var getListPOext = this.data.deliveryOrder.items.map(item => {
                return this.service.getPOExternalById(item.purchaseOrderExternalId, ["no", "useIncomeTax", "useVat"]);
            })

            Promise.all(getListPOext)
                .then((purchaseOrderExternals) => {
                    this.isUseIncomeTax = purchaseOrderExternals
                        .map((item) => item.useIncomeTax)
                        .reduce((prev, curr, index) => {
                            return prev || curr
                        }, false);
                    this.isUseVat = purchaseOrderExternals
                        .map((item) => item.useVat)
                        .reduce((prev, curr, index) => {
                            return prev || curr
                        }, false);
                })
        }
    }

    get deliveryOrderLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: this.deliveryOrderFields };
            return this.service.searchDeliveryOrder(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    removeItems() {
        this.bind();
    }
} 