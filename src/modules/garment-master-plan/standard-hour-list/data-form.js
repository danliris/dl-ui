import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";
var moment = require('moment');
// var StyleLoader = require('../../../loader/style-loader');
var ComodityLoader = require('../../../loader/garment-master-plan-comodity-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader')

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable title;
    @bindable selectedBuyer;
    @bindable selectedComodity;

    buyerFields=["name", "code"];
    comodityFields=["name", "code"];

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    controlOptions2 = {
        label: {
            length: 4
        },
        control: {
            length: 2
        }
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        // if (this.data && this.data._id && this.data.styleId) {
        //     this.selectedStyle = this.data.style;
        // }

        if (this.data.garmentBuyerId) {
            this.selectedBuyer = await this.service.getBuyerById(this.data.garmentBuyerId, this.buyerFields);
            this.data.garmentBuyerId =this.selectedBuyer._id;
        }

        if (this.data.masterplanComodityId) {
            this.selectedComodity = await this.service.getComodityById(this.data.masterplanComodityId, this.comodityFields);
            this.data.masterplanComodityId =this.selectedComodity._id;
        }

        if (!this.data.date) {
            this.data.date = new Date();
        }
        
    }

    get hourCutting(){
        var hours = 0;
        if(this.data && this.data.shCutting && this.data.shCutting > 0)
            hours = (this.data.shCutting / 60).toFixed(2);
        return hours;
    }

    get hourSewing(){
        var hours = 0;
        if(this.data && this.data.shSewing && this.data.shSewing > 0)
            hours = (this.data.shSewing / 60).toFixed(2);
        return hours;
    }

    get hourFinishing(){
        var hours = 0;
        if(this.data && this.data.shFinishing && this.data.shFinishing > 0)
            hours = (this.data.shFinishing / 60).toFixed(2);
        return hours;
    }

    get getTotalSHMinute(){
        var hours = 0;
        if(this.data && this.data.shFinishing && this.data.shFinishing > 0)
            hours += this.data.shFinishing;
        if(this.data && this.data.shSewing && this.data.shSewing > 0)
            hours += this.data.shSewing;
        if(this.data && this.data.shCutting && this.data.shCutting > 0)
            hours += this.data.shCutting;
        return hours;
    }

    get getTotalSHHour(){
        var hours = 0;
        if(this.data && this.data.shFinishing && this.data.shFinishing > 0)
            hours += this.data.shFinishing;
        if(this.data && this.data.shSewing && this.data.shSewing > 0)
            hours += this.data.shSewing;
        if(this.data && this.data.shCutting && this.data.shCutting > 0)
            hours += this.data.shCutting;
        if(hours > 0)
            hours = (hours / 60).toFixed(2);
        return hours;
    }

    // selectedStyleChanged(newValue) {
    //     if (newValue) {
    //         this.data.styleId = newValue._id;
    //     }
    //     else {
    //         this.data.styleId = null;
    //     }
    // }

    selectedBuyerChanged(newValue) {
        var _selectedBuyer = newValue;
        if (_selectedBuyer) {
            this.data.buyer = _selectedBuyer;
            this.data.garmentBuyerId = _selectedBuyer._id ? _selectedBuyer._id : "";   
        }else{
            delete this.data.garmentBuyerId;
        }
    }

    selectedComodityChanged(newValue) {
        var _selectedComodity = newValue;
        if (_selectedComodity) {
            this.data.comodity = _selectedComodity;
            this.data.masterplanComodityId = _selectedComodity._id ? _selectedComodity._id : "";
        }else{
            delete this.data.masterplanComodityId;
        }
    }

    // styleView = (style) => {
    //     return `${style.code} - ${style.name}`
    // }

    buyerView = (buyer) => {
        return `${buyer.code} - ${buyer.name}`
    }

    comodityView = (comodity) => {
        return `${comodity.code} - ${comodity.name}`
    }
    
    // get styleLoader() {
    //     return StyleLoader;
    // }

    get comodityLoader() {
        return ComodityLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }
}