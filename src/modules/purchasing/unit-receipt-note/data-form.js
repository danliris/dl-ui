import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
var UnitLoader = require('../../../loader/unit-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var DeliveryOrderBySupplierLoader = require('../../../loader/delivery-order-by-supplier-loader');
var StorageLoader = require('../../../loader/storage-loader');
var moment = require('moment');

@inject(BindingEngine, Element,Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable unit;
    @bindable supplier;
    @bindable deliveryOrder;
    @bindable storage;

    constructor(bindingEngine, element, service) {
        this.bindingEngine = bindingEngine;
        this.element = element; 
        this.service = service;

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
                { header: "Barang" },
                { header: "Jumlah" },
                { header: "Satuan" },
                { header: "Keterangan" }   
            ],
            onRemove: function() {
                this.bind();
            }
        };
    }
    @computedFrom("data.deliveryOrder" , "data.unit")
    get storageFilter(){
         var storageFilter={};
        if(this.data.unit){
            storageFilter={
                "unit.code": this.data.unit.code,
                "unit.division.code" : this.data.unit.division.code
            };
        }
        return storageFilter;
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }


    @computedFrom("data.supplier", "data.unit")
    get filter() {
        var filter = {
            unitId: this.data.unitId,
            supplierId: this.data.supplierId
        };
        return filter;
    }

    storageFields=["name","code"];

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data && this.data.supplier)
            this.data.supplier.toString = function () {
                return this.code + " - " + this.name;
            };
        
        if (this.data.isInventory) {
            this.storage = await this.service.getStorageById(this.data.storageId, this.storageFields);
            this.data.storage =this.storage;
        }

        if(!this.readOnly) {
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
            this.data.supplierId = undefined;
        }
        
        this.deliveryOrderAU.editorValue = "";
        this.data.deliveryOrderId = undefined;
        this.storage=null;
        this.data.isInventory=false;
    }

    unitChanged(newValue, oldValue) {
        var selectedUnit = newValue;

        if (selectedUnit) {
            this.data.unit = selectedUnit;
            this.data.unitId = selectedUnit._id;
        }
        else {
            this.data.unitId = null;
        }

        this.deliveryOrderAU.editorValue = "";
        this.data.deliveryOrderId = undefined;
        this.data.storageId=undefined;
        this.storage=null;
        this.data.isInventory=false;
    }

    deliveryOrderChanged(newValue, oldValue) {
        var selectedDo = newValue;
        
        if (selectedDo) {
            this.data.deliveryOrder = selectedDo;
            this.data.deliveryOrderId = selectedDo._id;
            var selectedItem = selectedDo.items || []
            var _items = [];
            for (var item of selectedItem) {
                for (var fulfillment of item.fulfillments) {
                    var _item = {};
                    if (fulfillment.purchaseOrder.unitId == this.data.unitId) {
                        _item.product = fulfillment.product;
                        _item.deliveredUom = fulfillment.purchaseOrderUom;
                        _item.purchaseOrder = fulfillment.purchaseOrder;
                        _item.purchaseOrderId = fulfillment.purchaseOrderId;
                        _item.purchaseOrderQuantity = fulfillment.purchaseOrderQuantity;
                        _item.currency = fulfillment.purchaseOrder.currency;
                        _item.currencyRate = fulfillment.purchaseOrder.currencyRate;

                        var total = fulfillment.realizationQuantity
                            .map(qty => qty.deliveredQuantity)
                            .reduce((prev, curr, index) => {
                                return prev + curr;
                            }, 0);

                        _item.deliveredQuantity = fulfillment.deliveredQuantity - total;

                        for (var _poItem of fulfillment.purchaseOrder.items) {
                            if (_poItem.product._id == fulfillment.product._id) {
                                _item.pricePerDealUnit = _poItem.pricePerDealUnit;
                                break;
                            }
                        }
                        if (_item.deliveredQuantity > 0)
                            _items.push(_item);
                    }
                }
            }
            this.data.items = _items;
        }
        else {
            this.data.items = [];
        }
        this.resetErrorItems();
        this.storage=null;
        this.data.isInventory=false;
    }

    storageChanged(newValue, oldValue) {
        var selectedStorage = newValue;

        if (selectedStorage) {
            this.data.storage = selectedStorage;
            this.data.storageId = selectedStorage._id;
        }
        else {
            this.data.storageId = null;
        }

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

    get storageLoader() {
        return StorageLoader;
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

    storageView = (storage) => {
        return `${storage.unit.name} - ${storage.name}`;
    }
} 