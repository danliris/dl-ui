import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var BuyerLoader = require('../../../loader/garment-buyers-loader');
var StyleLoader = require('../../../loader/garment-master-plan-style-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedBuyer;
    @bindable selectedStyle;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    detailColumns = [{ header: "Unit" },{ header: "Tahun" },{header: "Week"}, {header: "Jumlah"}];

    buyerFields=["name", "code"];
    fields=["year"];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.garmentBuyerId) {
            this.selectedBuyer = await this.service.getBuyerById(this.data.garmentBuyerId, this.buyerFields);
            this.data.garmentBuyerId =this.selectedBuyer._id;
        }
        if (this.data.styleId) {
            this.selectedStyle = await this.service.getStyleById(this.data.styleId, this.buyerFields);
            this.data.styleId =this.selectedStyle._id;
        }
        if(this.data.details){
            for(var detail of this.data.details){
                if (detail.weeklyPlanId) {
                    detail.weeklyPlan = await this.service.getWeekById(detail.weeklyPlanId, this.fields);
                    //this.data.styleId =this.selectedStyle._id;
                }
            }
        }
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    selectedBuyerChanged(newValue) {
        var _selectedBuyer = newValue;
        if (_selectedBuyer) {
            this.data.buyer = _selectedBuyer;
            this.data.garmentBuyerId = _selectedBuyer._id ? _selectedBuyer._id : "";
            
        }
    }

    async selectedStyleChanged(newValue) {
        var _selectedStyle = newValue;
        if (_selectedStyle) {
            this.data.style = _selectedStyle;
            this.data.styleId = _selectedStyle._id ? _selectedStyle._id : "";
            this.data.styleName = _selectedStyle.name;
            this.data.standardHour = await this.service.getStandardHourByStyle(_selectedStyle.code);
            if(this.data.standardHour){
                this.data.shSewing=this.data.standardHour[0].firstSHSewing;
                this.data.standardHourId=this.data.standardHour[0].shId;
            }
        }
        else{
            this.data.standardHour=null;
            this.data.shSewing="";
            this.data.styleName ="";
            this.data.standardHourId=null;
        }
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    get styleLoader() {
        return StyleLoader;
    }


    get addItems() {
        return (event) => {
            var newDetail=   {
                unit: this.data.unit,
                year: 0,
                week: this.data.week,
                quantity: 0
            };
            this.data.details.push(newDetail);
        };
    }

    buyerView = (buyer) => {
        return `${buyer.code} - ${buyer.name}`
    }

    styleView = (style) => {
        return style.code
    }
} 