import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var StorageLoader = require('../../../loader/storage-loader');
//var UnitLoader = require('../../../loader/garment-units-loader');
var UnitSenderLoader = require('../../../loader/garment-units-loader');
var UnitRequestLoader = require('../../../loader/garment-units-loader');
var UnitReceiptNoteLoader = require('../../../loader/garment-unit-receipt-note-for-unit-delivery-order-loader');
import moment from 'moment';

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable options = { };
    @bindable unitRequest;
    @bindable unitSender;
    @bindable storage;
    @bindable RONo;
    @bindable RONoHeader;

    typeUnitDeliveryOrderOptions = ['PROSES', 'TRANSFER', 'SAMPLE'];
    controlOptions = {
        label: {
            align : "left",
            length: 4
        },
        control: {
            length: 5,
            align: "right"
        }
    }
    RONoOptions = {
        label: {
            align : "left",
            length: 4
        },
        control: {
            length: 8,
            align: "left"
        }
    }

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isItem = false;
        if (this.data.UnitDOType) {
            if (this.data.UnitDOType === "PROSES") {
                this.isProses = true;
            }
            else {
                this.isProses= false;
            }
        }
        else {
            this.isProses = true;
        }
        
        if(this.data.Items)
            if (this.data.Items.length > 0) {
                this.isItem = true;
            }

        this.options.readOnly = this.readOnly;
        
        this.readOnlySender = true;
        
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.UnitSender")
    get filterUnit() {
        var storageFilter = {}
        if (this.data.UnitSender) {
            storageFilter.UnitName = this.data.UnitSender.Name;
        }

        return storageFilter;
    }

    @computedFrom("data.UnitSender")
    get filterUnits() {
        var rONoFilter = {}
        if (this.data.UnitSender) {
            rONoFilter.UnitId = this.data.UnitSender.Id;
        }
        return rONoFilter;
    }

    unitDOTypeChanged(e) {
        var selectedCategory = e.srcElement.value;
        if (selectedCategory) {
            this.data.UnitDOType = selectedCategory;

            this.data.RONo = '';
            this.data.ProductName = '';
            this.data.ProductCode = '';
            this.data.ProductRemark = '';
            this.data.Quantity = '';
            this.data.UomUnit = '';
            if(this.data.UnitDOType === "PROSES" || this.data.UnitDOType === "SAMPLE"){
                this.readOnlySender = true;
                this.data.UnitSender = this.data.UnitRequest;
            }
            else{
                this.unitSender = null;
                this.unitRequest = null;
                this.readOnlySender = this.options.readOnly;
            }
            if (this.data.UnitDOType === "PROSES") {
                this.isProses = true;
            }
            else {
                this.isProses = false;
            }
            this.data.Items = [];
        }
        this.unitRequest = null;
        this.unitSender = null;
        this.storage = null;
        this.RONo = null;
        this.data.Article = null;
    }

    get storageLoader() {
        return StorageLoader;
    }

    get garmentUnitReceiptNoteHeaderLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
            };
            return this.service.searchUnitReceiptNote(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    storageView = (storage) => {
        var code=storage.code? storage.code : storage.Code;
        var name=storage.name? storage.name : storage.Name;
        return `${code} - ${name}`
    }

    unitRequestChanged(newValue){
        var selectedUnit = newValue;
        if(selectedUnit){
            this.data.UnitRequest = selectedUnit;
            this.data.UnitRequest.Id = selectedUnit.Id;
            this.data.UnitRequest.Code = selectedUnit.Code;
            this.data.UnitRequest.Name = selectedUnit.Name;
            this.unitSender = selectedUnit;
        }
        else{
            this.data.UnitRequest = null;
            this.data.UnitSender = null;
        }
    }

    unitSenderChanged(newValue){
        var selectedUnit = newValue;
        if(this.data.UnitDOType === "PROSES" || this.data.UnitDOType === "SAMPLE"){
            this.data.UnitSender = this.data.UnitRequest;
        } else{
            this.data.UnitSender = null;
        }
        if(selectedUnit){

            this.data.UnitSender = selectedUnit;
            this.data.UnitSender.Id = selectedUnit.Id;
            this.data.UnitSender.Code = selectedUnit.Code;
            this.data.UnitSender.Name = selectedUnit.Name;
        }
        else{
            this.data.UnitRequest = null;
            this.data.UnitSender = null;
        }
    }

    storageChanged(newValue){
        var selectedStorage = newValue;
        if(selectedStorage){
            this.data.Storage = selectedStorage;
            this.data.Storage.Id = selectedStorage.Id;
            this.data.Storage.Code = selectedStorage.Code;
            this.data.Storage.Name = selectedStorage.Name;
        }
        else{
            this.data.Storage = null;
        }
    }

    RONoChanged(newValue){
        var selectedro = newValue;
        console.log(selectedro);
        if(newValue == null){
            this.data.Items = null;
            this.error = null;
        }
        else if(newValue){
            this.data.RONo = selectedro.RONo;
            this.data.Article = selectedro.Article;
            this.data.Items = [];
            for(var item of selectedro.Items){
                var Items = {};
                Items.URNItemId = item.Id;
                Items.URNNo = item.URNNo;
                Items.DODetailId = item.DODetailId;
                Items.URNId = item.URNId;
                Items.POItemId = item.POItemId;
                Items.EPOItemId = item.EPOItemId;
                Items.PRItemId = item.PRItemId;
                Items.RONo = item.RONo;
                Items.Article = item.Article;
                Items.POSerialNumber = item.POSerialNumber;
                Items.ProductId = item.ProductId;
                Items.ProductCode = item.ProductCode;
                Items.ProductName = item.ProductName;
                Items.ProductRemark = item.ProductRemark;
                Items.RONOItem = item.RONo;
                Items.UomId =  item.SmallUomId;
                Items.UomUnit = item.SmallUomUnit;
                Items.PricePerDealUnit = item.PricePerDealUnit;
                Items.Quantity = (item.SmallQuantity - item.OrderQuantity);

                this.data.Items.push(Items);
            }
        }
        else{
            this.data = null;
        }
    }

    RONoHeaderChanged(newValue){
        var selectedROHeader = newValue;
        console.log(newValue);
        if(selectedROHeader == null){
            this.data.Items = null;
            this.error = null;
        }
        else if(selectedROHeader){
            
            this.data.ProductId = selectedROHeader.Id;
            this.data.ProductCode = selectedROHeader.ProductCode;
            this.data.ProductName = selectedROHeader.ProductName;
            this.data.ProductRemark = selectedROHeader.ProductRemark;

            this.data.RONoAsal = selectedROHeader.RONo;
            this.data.UomId = selectedROHeader.SmallUomId;
            this.data.UomUnit = selectedROHeader.SmallUomUnit;
            this.data.QuantityHeader = (selectedROHeader.SmallQuantity - selectedROHeader.OrderQuantity);

            this.data.Items.push(selectedROHeader);
        }

    }

    get unitRequestLoader() {
        return UnitRequestLoader;
    }

    get unitSenderLoader() {
        return UnitSenderLoader;
    }


    roNoView = (rono) => {
        return `${rono.RONo} - ${rono.ProductName} - ${rono.ProductRemark}`
    }

    unitRequestView = (unitRequest) => {
        return `${unitRequest.Code} - ${unitRequest.Name}`
    }

    unitSenderView = (unitSender) => {
        return `${unitSender.Code} - ${unitSender.Name}`
    }

    get unitReceiptNoteLoader() {
        return UnitReceiptNoteLoader;
    }

    async searchRONo() {
        this.data.Items.push(this.RONo);
        this.isItem = true;
    }

    async searchProduct(){
        this.data.Items.push(this.RONoHeader);
        this.context.ItemsCollection.bind();
    }

    items = {
        columns: [
            "",
            "Kode Barang",
            "Nama Barang",
            "Keterangan Barang",
            "RO Asal",
            "Jumlah",
            "Satuan",
            "Tipe Fabric"],
            onAdd: function () {
                this.context.ItemsCollection.bind();
                this.data.items.push({});
            }.bind(this),
    };
}