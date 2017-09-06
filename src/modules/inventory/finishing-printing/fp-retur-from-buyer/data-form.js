import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './service';
var BuyerLoader = require('../../../../loader/buyers-loader');

@inject(Service, BindingEngine, BindingSignaler)
export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;
    @bindable buyer;
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
                this.data.details = [];
                this.filter = {
                    "buyer.code" : this.data.buyer.code
                }
            }else{
                delete this.data.buyerId;
                this.data.buyer = {};
                this.filter = {};
                this.data.details = [];
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
    }

    get buyerLoader(){
        return BuyerLoader;
    }
    
    get getFilter(){
        this.filter = {};
        if(this.data && this.data.buyerId && this.data.buyer && this.data.buyer.code){
            this.filter = {
                "buyer.code" : this.data.buyer.code
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