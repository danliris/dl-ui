import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
var UnitLoader = require('../../../loader/unit-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var DeliveryOrderBySupplierLoader = require('../../../loader/garment-delivery-order-by-supplier-loader');
var moment = require('moment');

@inject(Service, BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable unit;
    @bindable supplier;
    @bindable deliveryOrder;

    constructor(service, bindingEngine, element) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.element = element;

        this.auInputOptions = {
            label: {
                length: 4,
                align: "right"
            },
            control: {
                length: 5
            }
        };

        this.deliveryOrderItem = {
            columns: [
                { header: "No. Referensi PR" },
                { header: "No. RO" },
                { header: "Barang" },
                { header: "Jumlah" },
                { header: "Satuan" },
                { header: "Konversi" },
                { header: "Jumlah Kecil" },
                { header: "Satuan Kecil" },
                { header: "Buyer" },
                { header: "Keterangan" }
            ],
            onRemove: function () {
                this.bind();
            }
        };
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    @computedFrom("data.supplier")
    get filter() {
        var filter = {
            supplierId: this.data.supplierId
        };
        return filter;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (!this.readOnly) {
            this.deliveryOrderItem.columns.push({ header: "" });
        }
    }

    supplierChanged(newValue, oldValue) {
        var selectedSupplier = newValue;

        if (selectedSupplier) {
            this.data.supplier = selectedSupplier;
            this.data.supplierId = selectedSupplier._id;
        }
        else {
            this.data.supplier = null;
            this.data.supplierId = null;
        }

        if (this.context.error) {
            if (this.context.error.deliveryOrderId) {
                this.context.error.deliveryOrderId = null;
            }
        }
        this.context.deliveryOrderAU.editorValue = "";
        this.data.deliveryOrderId = null;
    }

    unitChanged(newValue, oldValue) {
        var selectedUnit = newValue;

        if (selectedUnit) {
            this.data.unit = selectedUnit;
            this.data.unitId = selectedUnit._id;
        }
        else {
            this.data.unit = null;
            this.data.unitId = null;
        }
    }

    async deliveryOrderChanged(newValue, oldValue) {
        var selectedDo = newValue;

        if (selectedDo) {
            this.data.deliveryOrder = selectedDo;
            this.data.deliveryOrderId = selectedDo._id;
            var selectedItem = selectedDo.items || []
            var listPurchaseRequestId = selectedDo.items.map((doItem) => {
                return doItem.fulfillments.map((fulfillment) => {
                    return fulfillment.purchaseRequestId
                })
            })
            listPurchaseRequestId = [].concat.apply([], listPurchaseRequestId);
            listPurchaseRequestId = listPurchaseRequestId.filter(function (elem, index, self) {
                return index == self.indexOf(elem);
            })

            var jobs = [];
            for (var prId of listPurchaseRequestId) {
                jobs.push(this.service.getPurchaseRequestById(prId, ["buyer", "no","_id"]))
            }

            Promise.all(jobs)
                .then(purchaseRequests => {
                    var _items = [];
                    for (var item of selectedItem) {
                        for (var fulfillment of item.fulfillments) {
                            var _item = {};
                            var pr = purchaseRequests.find((purchaseRequest) => purchaseRequest._id.toString() === fulfillment.purchaseRequestId.toString());
                            if (pr) {
                                _item.buyer = pr.buyer;
                                _item.buyerId = pr.buyer._id;
                            }
                            _item.product = fulfillment.product;
                            _item.deliveredUom = fulfillment.purchaseOrderUom;
                            _item.purchaseOrderNo = fulfillment.purchaseOrderNo;
                            _item.purchaseOrderId = fulfillment.purchaseOrderId;
                            _item.purchaseRequestNo = fulfillment.purchaseRequestNo;
                            _item.roNo = fulfillment.roNo;
                            _item.purchaseRequestId = fulfillment.purchaseRequestId;
                            _item.purchaseRequestRefNo = fulfillment.purchaseRequestRefNo;
                            _item.purchaseOrderQuantity = fulfillment.purchaseOrderQuantity;
                            _item.currency = fulfillment.currency;
                            _item.pricePerDealUnit = fulfillment.pricePerDealUnit;
                            _item.uomConversion = fulfillment.uomConversion;
                            _item.quantityConversion = fulfillment.quantityConversion;
                            _item.conversion = fulfillment.conversion;

                            // _item.uomConversion = fulfillment.purchaseOrderUom;
                            // _item.quantityConversion = fulfillment.purchaseOrderQuantity;
                            // _item.conversion = 1;

                            var total = fulfillment.realizationQuantity
                                .map(qty => qty.deliveredQuantity)
                                .reduce((prev, curr, index) => {
                                    return prev + curr;
                                }, 0);

                            _item.deliveredQuantity = fulfillment.deliveredQuantity - total;

                            if (_item.deliveredQuantity > 0)
                                _items.push(_item);
                        }
                    }
                    this.data.items = _items;
                })
                .catch(e => {
                    this.data.items = [];
                })
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

    get unitLoader() {
        return UnitLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get deliveryOrderBySupplierLoader() {
        return DeliveryOrderBySupplierLoader;
    }

    unitView = (unit) => {
        return `${unit.division.name} - ${unit.name}`;
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`;
    }
} 