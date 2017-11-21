import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './service';
var BuyerLoader = require('../../../../loader/buyers-loader');
var StorageLoader = require('../../../../loader/storage-loader');

@inject(Service, BindingEngine, BindingSignaler)
export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;
    @bindable title;
    @bindable buyer;
    @bindable selectedStorage;
    destinationItems = ["", "Pack I", "Pack II"];

    controlOptions = {
        control: {
            length: 4
        }
    };
    detailColumns = [{ header: "Nomor Surat Perintah Produksi", value: "productionOrderNo"}]

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }
    
    filter={};

    buyerChanged(newValue, oldValue){
        var selectedData = newValue;
        if(!this.readOnly){
            if(selectedData && selectedData._id){
                this.data.buyerId = selectedData._id;
                this.data.buyer = selectedData;
                this.filter = {
                    "buyer" : this.data.buyerId
                }
            }else{
                delete this.data.buyerId;
                this.data.buyer = {};
                this.filter = {};
            }
            if(this.data && this.data.details && this.data.details.length > 0){
                for(var a = this.data.details.length; a >= 0; a--){
                    this.data.details.splice((a-1), 1);
                }
            }
        }
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        // console.log(this.context.data);
        if(this.data && this.data.buyer){
            this.buyer = this.data.buyer
            // this.data.details = this.context.data.details;
            console.log(this.context.data);
        }
        if (this.data && this.data._id && this.data.storageId) {
            this.selectedStorage = await this.service.getStorageById(this.data.storageId);
        }
    }

    selectedStorageChanged(newValue) {
        if (newValue) {
            this.data.storageId = newValue._id;
        }
        else {
            this.data.storageId = null;
        }
    }

    storageView = (storage) => {
        return `${storage.unit.name} - ${storage.name}`
    }

    get storageLoader() {
        return StorageLoader;
    }

    get buyerLoader(){
        return BuyerLoader;
    }
    
    get getFilter(){
        this.filter = {};
        if(this.data && this.data.buyerId){
            this.filter = {
                "buyer" : this.data.buyerId
            }
        }
        return this.filter;
    }

    get addDetails(){
        return(event) => {
            this.data.details.push({isAdd : true});
        }
    }

    get hasBuyer(){
        return this.data && this.data.buyerId && this.data.buyerId !== "";
    }
}