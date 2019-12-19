import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
var UnitLoader = require('../../../loader/unit-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var StorageLoader = require('../../../loader/storage-loader');
var DeliveryOrderLoader = require('../../../loader/garment-delivery-order-for-unit-receipt-note-loader');
var DeliveryReturnLoader = require('../../../loader/garment-delivery-retur-loader');
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
    @bindable deliveryReturn;
    @bindable URNType;

    typeOptions = ['PEMBELIAN','PROSES'];

    filterDR={
        IsUsed :false
    };

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

        this.deliveryReturnItem={
            columns: [
                { header: "Kode Barang" },
                { header: "Nama Barang" },
                { header: "Keterangan Barang" },
                { header: "RO Asal" },
                { header: "Jumlah" },
                { header: "Satuan" },
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
        this.isDiffStorage=false;
        if(this.data.URNType=="PROSES"){
            this.isProcess=true;
        }
        else if(this.data.URNType=="GUDANG LAIN"){
            this.isProcess=false;
            this.isDiffStorage=true;
        }
        else{
            this.isProcess=false;
        }
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

    async deliveryReturnChanged(newValue, oldValue){
        var selectedDR=newValue;
        this.data.UnitFrom=null;
        this.data.StorageFrom=null;
        if(selectedDR){
            this.data.ReturnDate=selectedDR.ReturnDate;
            this.data.Unit=selectedDR.Unit;
            this.unit=selectedDR.Unit;
            this.Storage=selectedDR.Storage.Name;
            this.data.Unit=selectedDR.Unit;
            this.data.ReturnType=selectedDR.ReturnType;
            this.data.UnitDONo=selectedDR.UnitDONo;
            this.data.DRId=selectedDR.Id;
            this.data.DRNo=selectedDR.DRNo;
            this.data.Article=selectedDR.Article;
            this.data.RONo=selectedDR.RONo;
            this.data.Storage=selectedDR.Storage;
            this.data.Storage={
                _id:selectedDR.Storage.Id,
                name:selectedDR.Storage.Name,
                code:selectedDR.Storage.Code
            }
           // this.data.Items=[];
            var DRItems=[];
            var UnitDO= await this.service.getUnitDOById(selectedDR.UnitDOId);
            console.log(UnitDO);
            var OldUnitDO={};
            if(UnitDO.UnitDOFromId){
                OldUnitDO=await this.service.getUnitDOById(UnitDO.UnitDOFromId);
                this.data.UnitFrom=OldUnitDO.UnitSender;
                this.data.StorageFrom=OldUnitDO.Storage;
            }
            
            for(var dritem of selectedDR.Items ){
                var dup= UnitDO.Items.find(a=>a.Id==dritem.UnitDOItemId);
                var DRItem={};
                if(dup){
                    var oldURN=await this.service.getById(dup.URNId);
                    var same= oldURN.Items.find(a=>a.Id==dup.URNItemId);
                    if(same){
                        DRItem.DRId= dritem.DRId;
                        DRItem.DesignColor= dritem.DesignColor;
                        DRItem.DRItemId= dritem.Id;
                        DRItem.UENItemId=dritem.UENItemId;
                        DRItem.UnitDOItemId=dritem.UnitDOItemId;
                        DRItem.PricePerDealUnit= same.PricePerDealUnit;
                        DRItem.SmallUom=dritem.Uom;
                        DRItem.SmallQuantityE=dritem.Quantity;
                        DRItem.SmallQuantity=DRItem.SmallQuantityE;
                        DRItem.Product= dritem.Product;
                        DRItem.Product.Remark=dup.ProductRemark;
                        DRItem.Article=same.Article;
                        DRItem.Conversion=parseFloat(same.Conversion);
                        DRItem.EPOItemId=dup.EPOItemId;
                        DRItem.PRId= same.PRId;
                        DRItem.PRNo=same.PRNo;
                        DRItem.DODetailId= dup.DODetailId;
                        DRItem.POItemId=dup.POItemId;
                        DRItem.POSerialNumber=dup.POSerialNumber;
                        DRItem.PRItemId=dup.PRItemId;
                        DRItem.POId=same.POId;
                        DRItem.Uom= same.Uom;
                        DRItem.Quantity= DRItem.SmallQuantity/DRItem.Conversion;
                        DRItem.RONo=dritem.RONo;
                        DRItem.ReceiptQuantity=DRItem.SmallQuantity/DRItem.Conversion;
                        DRItem.ReceiptCorrection=DRItem.SmallQuantity/DRItem.Conversion;
                        DRItem.OrderQuantity=0;
                        DRItem.DOCurrencyRate=dup.DOCurrency.Rate;
                        DRItems.push(DRItem)
                    }
                }
            }
            this.data.DRItems=DRItems;
        }
        else{
            
            this.deliveryOrder=null;
            this.unit=null;
            this.storage=null;
            this.data.Storage=null;
            this.data.ReturnDate=null;
            this.data.ReturnType="";
            this.data.Unit=null;
            this.data.UnitDONo="";
            this.data.DRId=null;
            this.data.DRNo="";
            this.data.Article="";
            this.data.RONo="";
            this.supplier=null;
            this.data.UnitFrom=null;
            this.data.StorageFrom=null;
        }
    }

    URNTypeChanged(newValue){
        this.data.URNType=newValue;
        if(this.data.URNType=="PROSES"){
            this.isProcess=true;
            this.deliveryOrder=null;
            this.unit=null;
            this.storage=null;
            this.data.Storage=null;
            this.data.ReturnDate=null;
            this.data.ReturnType="";
            this.data.Unit=null;
            this.data.UnitDONo="";
            this.data.DRId=null;
            this.data.DRNo="";
            this.data.Article="";
            this.data.RONo="";
            this.supplier=null;
            this.data.UnitFrom=null;
            this.data.StorageFrom=null;
        }
        else{
            this.isProcess=false;
            this.deliveryReturn=null;
            this.unit=null;
            this.storage=null;
            this.data.Storage=null;
            this.deliveryOrder=null;
            this.data.ReturnType="";
            this.unit=null;
            this.storage=null;
            this.data.Storage=null;
            this.data.ReturnDate=null;
            this.data.Unit=null;
            this.data.UnitDONo="";
            this.data.DRId=null;
            this.data.DRNo="";
            this.data.Article="";
            this.data.RONo="";
            this.data.UnitFrom=null;
            this.data.StorageFrom=null;
        }
    }

    deliveryOrderChanged(newValue, oldValue) {
        var selectedDo = newValue;
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
                    _item.PRNo = fulfillment.pRNo;
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

    get deliveryReturnLoader() {
        return DeliveryReturnLoader;
    }

    
} 