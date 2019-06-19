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

    constructor(service, bindingEngine, purchasingService) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.purchasingService = purchasingService;
        
    }

    bind(context) {
        this.context = context;
        this.dataView = this.context.data;
        this.data = this.context.data;
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
        if(selectedUEN){
            this.data.ExpenditureDate = selectedUEN.ExpenditureDate;
            if(!this.options.isView){
                this.data.UnitId = selectedUEN.UnitRequestId;
                this.data.UnitName = selectedUEN.UnitRequestName;
                this.data.UnitCode = selectedUEN.UnitRequestCode;
            } else {
                this.data.UnitId = selectedUEN.UnitRequest.Id;
                this.data.UnitName = selectedUEN.UnitRequest.Name;
                this.data.UnitCode = selectedUEN.UnitRequest.Code;
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
                                item.Product = item.ProductId;
                                item.Uom = item.UomId;
                                if(doItem.POItemId == item.POItemId )
                                    item.DesignColor = doItem.DesignColor;
                            }                
                        }
                    }
                });
            
        }
    }

    itemsInfo = {
        columns: [
            {header: "Kode Barang", value: "ProductCode"},
            {header: "Keterangan Barang", value: "DesignColor"},
            {header: "Jumlah", value: "Quantity"},
            {header: "Satuan", value: "UomUnit"},
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