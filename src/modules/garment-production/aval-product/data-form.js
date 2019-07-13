import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';

var moment = require('moment');
var ROLoader = require('../../../loader/preparing-distinct-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable options = {};
    @bindable error;
    @bindable title;
    @bindable roNo;

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

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        
    }

    bind(context) {
        this.context = context;
        this.dataView = this.context.data;
        this.data = this.context.data;
        this.error = this.context.error;
        this.options.isCreate = this.context.isCreate;
        this.options.isView = this.context.isView;
        if(this.options.isView){
            this.roNo = this.data.RONo;
        }
    }

    async roNoChanged(newValue){
        var selectedPreparing = newValue;
        if(selectedPreparing && this.options.isCreate){
            this.data.Items.splice(0);
            this.data.RONo = selectedPreparing.RONo;
            this.data.Article = selectedPreparing.Article;
            var filterPreparing = {"RONo": selectedPreparing.RONo}
            var info = {filter : JSON.stringify(filterPreparing), size: 2147483647}
            var dataForItem = await this.service.getPreparing(info);
            for(var dataHeader of dataForItem.data){
                for(var item of dataHeader.Items){
                    if(item.RemainingQuantity>0){
                        var items = {
                            PreparingId : dataHeader.Id,
                            PreparingItemId : item.Id,
                            Product : item.Product,
                            DesignColor : item.DesignColor,
                            Quantity : item.RemainingQuantity,
                            Uom : item.Uom,
                            IsSave : false,
                        };
                        this.data.Items.push(items); 
                    }
                }
            }
        } else if(!selectedPreparing && this.options.isCreate){
            this.data.RONo = null;
            this.data.Article = null;
            this.data.AvalDate = null;
            this.data.Items=[];
        }
    }

    itemsInfo = {
        columns: [
            "Kode Barang",
            "Keterangan",
            "Jumlah",
            "Satuan",
        ]
    }

    roView = (ro) => {
        return `${ro.RONo}`
    }

    get roLoader() {
        return ROLoader;
    }
}