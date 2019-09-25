import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service, PurchasingService } from './service';
import { debug } from 'util';

var moment = require('moment');
var UENLoader = require('../../../loader/unit-expenditure-note-gpreparing-loader');

@containerless()
@inject(Service, BindingEngine, PurchasingService)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable hasDelete = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable options = {};
    @bindable error;
    @bindable title;
    @bindable uenNo;


    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    }

    get filterUen(){
        return{
            ExpenditureType : "PROSES"
        }
    }

    constructor(service, bindingEngine, purchasingService) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.purchasingService = purchasingService;
        
    }

    bind(context) {
        this.context = context;
        this.dataView = this.context.data;
        this.data = this.context.data;
        for(var a of this.context.data.Items){
            if(a.RemainingQuantity != a.Quantity){
                this.context.hasDelete=false;
            }
        }
        this.error = this.context.error;
        this.options.isCreate = this.context.isCreate;
        this.options.isView = this.context.isView;
        if(this.options.isView){
            this.purchasingService.getUnitExpenditureNoteById(this.dataView.UENId)
            .then((uenNo) => {
                this.uenNo = uenNo;
            });
        }
    }

    uenNoChanged(newValue) {
        var selectedUEN = newValue;
        if(selectedUEN && this.options.isCreate){
            this.data.ExpenditureDate = selectedUEN.ExpenditureDate;
            this.data.Unit = {};
            if(!this.options.isView){
                this.data.Unit.Id = selectedUEN.UnitRequestId;
                this.data.Unit.Name = selectedUEN.UnitRequestName;
                this.data.Unit.Code = selectedUEN.UnitRequestCode;
            } else {
                this.data.Unit.Id = selectedUEN.UnitRequest.Id;
                this.data.Unit.Name = selectedUEN.UnitRequest.Name;
                this.data.Unit.Code = selectedUEN.UnitRequest.Code;
            }
            this.data.UENId = selectedUEN.Id;
            this.data.UENNo = selectedUEN.UENNo;
            this.data.Items = selectedUEN.Items;
            this.purchasingService.getUnitDeliveryOrderById(selectedUEN.UnitDOId)
                .then((deliveryOrder) => {
                    if(deliveryOrder){
                        this.data.Article = deliveryOrder.Article;
                        this.data.RONo = deliveryOrder.RONo;
                        for(var doItem of deliveryOrder.Items){
                            for(var item of this.data.Items){
                                item.Product = {};
                                item.Uom = {};
                                item.Product.Id = item.ProductId;
                                item.Product.Code = item.ProductCode;
                                item.Product.Name = item.ProductName;

                                item.Uom.Id = item.UomId;
                                item.Uom.Unit = item.UomUnit
                                if(doItem.Id == item.UnitDOItemId ){item.DesignColor = doItem.DesignColor;}
                                
                            }                
                        }
                    }
                });
        } else if(!selectedUEN && this.options.isCreate){
            this.data.ExpenditureDate = null;
            this.data.Unit = {};
            this.data.UENId = null;
            this.data.UENNo = null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.ProcessDate = null;
            this.data.Items = [];
        }
    }

    itemsInfo = {
        columns: [
            {header: "Kode Barang", value: "Product.Code"},
            {header: "Keterangan Barang", value: "DesignColor"},
            {header: "Jumlah", value: "Quantity"},
            {header: "Satuan", value: "Uom.Unit"},
            {header: "Harga", value: "BasicPrice"},
            {header: "Mata Uang", value: "currency"},
            {header: "Tipe Fabric", value: "FabricType"},
        ]
    }

    uenView = (uen) => {
        return `${uen.UENNo}`
    }

    get uenLoader() {
        return UENLoader;
    }
}