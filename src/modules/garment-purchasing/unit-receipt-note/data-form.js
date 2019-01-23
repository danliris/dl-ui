import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
var UnitLoader = require('../../../loader/unit-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var StorageLoader = require('../../../loader/storage-loader');
var DeliveryOrderLoader = require('../../../loader/garment-delivery-order-for-unit-receipt-note-loader');
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
    @bindable storage;

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
                { header: "Artikel" },
                { header: "Keterangan" },
                { header: "Design/Color" },
            ],
            onRemove: function () {
                this.bind();
            }
        };
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.Supplier", "data.Unit")
    get filter() {
        var filter = {};
        if (this.data.Supplier) {
            filter.SupplierId = this.data.Supplier.Id;
        }
        // if (this.data.Unit) {
        //     filter.UnitId = this.data.Unit.Id;
        // }
            
        return filter;
    }

    @computedFrom("data.Unit")
    get filterUnit() {
        var storageFilter = {}
        if (this.data.Unit) {
            storageFilter.UnitName = this.data.Unit.Name;
        }

        return storageFilter;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (!this.readOnly && !this.isEdit) {
            this.deliveryOrderItem.columns.push({ header: "" });
        }

        // if (this.data.IsStorage) {
        //     this.storage = this.data.Storage;
        // }
    }

    supplierChanged(newValue, oldValue) {
        var selectedSupplier = newValue;

        if (selectedSupplier) {
            this.data.Supplier = selectedSupplier;
        }
        else {
            this.data.Supplier = null;
        }

        this.resetErrorDeliveryOrder();
        this.context.deliveryOrderAU.editorValue = "";
        this.data.DOId = null;
        this.storage = null;
        // this.data.IsStorage = false;
        this.data.Storage = null;
    }

    unitChanged(newValue, oldValue) {
        var selectedUnit = newValue;

        if (selectedUnit) {
            this.data.Unit = selectedUnit;
        }
        else {
            this.data.Unit = null;
        }

        this.resetErrorDeliveryOrder();
        this.context.deliveryOrderAU.editorValue = "";
        this.data.DOId = null;
        this.storage = null;
        this.data.Storage = null;
        // this.data.IsStorage = false;
    }

    deliveryOrderChanged(newValue, oldValue) {
        var selectedDo = newValue;
        console.log(newValue);
        if (selectedDo) {
            this.data.DOId = selectedDo.Id;
            this.data.DONo = selectedDo.doNo;
            var selectedItem = selectedDo.items || [];

            var _items = [];
            for (var item of selectedItem) {
                for (var fulfillment of item.fulfillments) {
                    var _item = {};

                    _item.DODetailId = fulfillment.Id;

                    _item.EPOItemId = fulfillment.ePOItemId;

                    _item.PRId = fulfillment.pRId;
                    _item.PRNo = fulfillment.rONo;
                    _item.PRItemId = fulfillment.pRItemId;

                    _item.POId = fulfillment.pOId;
                    _item.POItemId = fulfillment.pOItemId;
                    _item.POSerialNumber = fulfillment.poSerialNumber;

                    _item.Product = fulfillment.product;
                    _item.Product.Remark = fulfillment.productRemark;

                    _item.RONo = fulfillment.rONo;

                    _item.ReceiptQuantity = fulfillment.doQuantity - fulfillment.receiptQuantity;

                    _item.Uom = fulfillment.purchaseOrderUom;

                    _item.PricePerDealUnit = fulfillment.pricePerDealUnit;

                    _item.Conversion = fulfillment.conversion;

                    _item.SmallUom = fulfillment.smallUom;

                    _item.Article = fulfillment.article;

                    _item.Buyer =  { Name : fulfillment.buyer.name };

                    if (_item.ReceiptQuantity > 0)
                        _items.push(_item);
                }
            }
            this.data.Items = _items;
        }
        else {
            this.data.DOId = null;
            this.data.Items = [];
        }
        this.resetErrorItems();
        this.data.Storage = null;
        this.storage = null;
        // this.data.IsStorage = false;
    }

    storageChanged(newValue) {
        var selectedStorage = newValue;
        if (selectedStorage) {
            if (selectedStorage._id) {
                this.data.Storage = selectedStorage;
            }
            else {
                this.storage = null;
                this.data.Storage = null;
            }
        }
        else {
            this.storage = null;
            this.data.Storage = undefined;
        }
    }

    resetErrorDeliveryOrder() {
        if (this.error) {
            if (this.error.DeliveryOrder) {
                this.error.DeliveryOrder = null;
            }
            if (this.error.Storage) {
                this.error.Storage = null;
            }
        }
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.Storage) {
                this.error.Storage = null;
            }
            if (this.error.Items) {
                this.error.Items = null;
            }
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get deliveryOrderLoader() {
        return DeliveryOrderLoader;
    }

    get storageLoader() {
        return StorageLoader;
    }

    storageView = (storage) => {
        console.log(storage);
        if (storage.unit) {
            return `${storage.unit.name} - ${storage.name}`;
        } else {
            return `${storage.name}`;
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`;
    }
} 