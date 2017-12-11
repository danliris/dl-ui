import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isView = false;
    @bindable data = {};
    @bindable title;
    @bindable deliveryOrder;
    @bindable correctionType;
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

    constructor(service) {
        this.service = service;

        this.formOptions = {
            cancelText: "Kembali"
        };

        this.typeData = ["Harga Satuan", "Harga Total"];

        this.controlOptions = {
            label: {
                length: 4
            },
            control: {
                length: 5
            }
        };

        this.deliveryOrderItem = {
            columns: [
                { header: "Nomor PO Eksternal" },
                { header: "Nomor PR" },
                { header: "Nomor Ref PR", value: "purchaseRequestRefNo" },
                { header: "Nomor RO", value: "roNo" },
                { header: "Nama Barang" },
                { header: "Jumlah" },
                { header: "Satuan" },
                { header: "Harga Satuan" },
                { header: "Harga Total" },
            ],
            onRemove: function () {
                this.bind();
            }
        };

        this.collectionOptions = {
            pricePerUnitReadOnly: true
        };

        this.itemsTemp = [];
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (!this.readOnly) {
            this.deliveryOrderItem.columns.push({ header: "" });
        }
    }

    get garmentDeliveryOrderLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: this.deliveryOrderFields };
            return this.service.searchDeliveryOrder(info)
                .then((result) => {
                    return result.data;
                });
        }
    }


    deliveryOrderChanged(newValue, oldValue) {
        this.data.deliveryOrder = newValue;
        this.data.items = [];
        this.itemsTemp = [];
        this.collectionOptions.correction = false;

        if (this.data.deliveryOrder) {
            for (var item of this.data.deliveryOrder.items) {
                for (var fulfillment of item.fulfillments) {
                    var correction = fulfillment.corrections || [];

                    if (correction.length > 0) {
                        this.collectionOptions.correction = true;
                        this.collectionOptions.pricePerUnitFirst = true;

                        fulfillment.quantity = correction[correction.length - 1].correctionQuantity;
                        fulfillment.pricePerUnit = correction[correction.length - 1].correctionPricePerUnit;
                        fulfillment.priceTotal = correction[correction.length - 1].correctionPriceTotal;
                    }
                    else {
                        fulfillment.quantity = fulfillment.deliveredQuantity;
                        fulfillment.pricePerUnit = fulfillment.pricePerDealUnit;
                        fulfillment.priceTotal = fulfillment.pricePerDealUnit * fulfillment.deliveredQuantity;
                    }

                    var obj = {
                        purchaseOrderExternalId: item.purchaseOrderExternalId,
                        purchaseOrderExternalNo: item.purchaseOrderExternalNo,
                        purchaseOrderInternalId: fulfillment.purchaseOrderId,
                        purchaseOrderInternalNo: fulfillment.purchaseOrderNo,
                        purchaseRequestId: fulfillment.purchaseRequestId,
                        purchaseRequestNo: fulfillment.purchaseRequestNo,
                        purchaseRequestRefNo: fulfillment.purchaseRequestRefNo,
                        roNo: fulfillment.roNo,
                        productId: fulfillment.productId,
                        product: fulfillment.product,
                        quantity: fulfillment.quantity,
                        uomId: fulfillment.product.uomId,
                        uom: fulfillment.purchaseOrderUom,
                        pricePerUnit: fulfillment.pricePerUnit,
                        priceTotal: fulfillment.priceTotal,
                        currency: fulfillment.currency,
                        currencyRate: fulfillment.currency.rate
                    };
                    this.data.items.push(obj);
                }
            }
            this.itemsTemp = JSON.parse(JSON.stringify(this.data.items)); /* Clone Array */
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

    correctionTypeChanged(newValue, oldValue) {
        this.data.correctionType = newValue;

        if (this.data.correctionType === "Harga Satuan") {
            this.collectionOptions.pricePerUnitReadOnly = false;
            this.collectionOptions.pricePerUnitFirst = true;
        }
        else
            this.collectionOptions.pricePerUnitReadOnly = true;

        this.data.items = JSON.parse(JSON.stringify(this.itemsTemp));
    }

    @computedFrom("data.deliveryOrder")
    get hasDeliveryOrder() {
        return this.data.deliveryOrder ? this.data.deliveryOrder.items.length > 0 : false;
    }
}