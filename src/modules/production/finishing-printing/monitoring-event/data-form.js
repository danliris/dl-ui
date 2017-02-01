import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
import {Service} from './service';
var moment = require('moment');
var momentToMillis = require('../../../../utils/moment-to-millis')

@inject(BindingEngine, Service, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable divisionFilter = 'FINISHING & PRINTING'
    @bindable machineCodeFilter = ''; 
    @bindable timePickerShowSecond = false;
    @bindable timePickerFormat = "HH:mm";
    @bindable timeInMomentStart = {};
    @bindable timeInMomentEnd = {};
    @bindable productionOrderDetails = [];

    constructor(bindingEngine, service, element) {
        this.bindingEngine = bindingEngine;
        this.service = service;
        this.element = element;
    }

    bind()
    {
        this.timeInMomentStart = this.data ? moment(this.data.timeInMillisStart) : this.timeInMomentStart;
        this.timeInMomentEnd = this.data ? moment(this.data.timeInMillisEnd) : this.timeInMomentEnd;
        var tempTimeStart = moment.utc(this.timeInMomentStart);
        var tempTimeEnd = moment.utc(this.timeInMomentEnd);
        this.data.timeInMillisStart = momentToMillis(tempTimeStart);
        this.data.timeInMillisEnd = momentToMillis(tempTimeEnd);

        if (this.data.productionOrder && this.data.productionOrder.details && this.data.productionOrder.details.length > 0){
            this.productionOrderDetails = this.data.productionOrder.details;
            this._mapProductionOrderDetail();
        }
    }

    machineChanged(e) 
    {
        this.data.machineEvent = {};

        var selectedMachine = e.detail || {};
        this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
        this.machineCodeFilter = selectedMachine.code;
    }

    timeStartChanged(e)
    {
        var tempTimeStart = e.detail || {};
        tempTimeStart = moment.utc(tempTimeStart);
        this.data.timeInMillisStart = momentToMillis(tempTimeStart);
    }

    timeEndChanged(e)
    {
        var tempTimeEnd = e.detail || {};
        tempTimeEnd = moment.utc(tempTimeEnd);
        this.data.timeInMillisEnd = momentToMillis(tempTimeEnd);
    }

    async productionOrderChanged(e)
    {
        this.productionOrderDetails = [];
        this.data.selectedProductionOrderDetail = {};
        this.data.selectedProductionOrderDetail.colorType = {};
        this.data.selectedProductionOrderDetail.colorType.name = '';

        var productionOrder = e.detail;
        if (productionOrder){
            this.productionOrderDetails =  await this.service.getProductionOrderDetails(productionOrder.orderNo);
            this._mapProductionOrderDetail();
        }
    }

    get hasProductionOrderDetails(){
        return this.productionOrderDetails.length > 0;
    }
    
    get hasMachine(){
        return this.data && this.data.machineId && this.data.machineId !== '';
    }

    _mapProductionOrderDetail()
    {
        this.productionOrderDetails.map(detail => {
            detail.toString = function(){
                return `${this.colorType.name}`;  
            }
            return detail;
        });
    }
}