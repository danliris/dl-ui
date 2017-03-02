import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
import {Service} from './service';
var moment = require('moment');
var momentToMillis = require('../../../../utils/moment-to-millis')

@inject(BindingEngine, Service, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    divisionFilter = 'FINISHING & PRINTING'
    machineCodeFilter = ''; 
    timePickerShowSecond = false;
    timePickerFormat = "HH:mm";
    @bindable productionOrderDetails = [];

    constructor(bindingEngine, service, element) {
        this.bindingEngine = bindingEngine;
        this.service = service;
        this.element = element;
    }

    bind()
    {
        this.data.timeInMomentStart = this.data.timeInMillisStart != undefined ? moment(this.data.timeInMillisStart) : this._adjustMoment();
        this.data.timeInMomentEnd = this.data.timeInMillisEnd != undefined && this.data.timeInMillisEnd != null ? moment(this.data.timeInMillisEnd) : this._adjustMoment();

        if (this.data.productionOrder && this.data.productionOrder.details && this.data.productionOrder.details.length > 0){
            this.productionOrderDetails = this.data.productionOrder.details;
            this._mapProductionOrderDetail();
        }

        if (this.data.dateStart)
            this.data.dateStart = moment(this.data.dateStart).format("YYYY-MM-DD");
        if (this.data.dateEnd)
            this.data.dateEnd = moment(this.data.dateEnd).format("YYYY-MM-DD");
    }

    machineChanged(e) 
    {
        delete this.data.machineEvent;

        var selectedMachine = e.detail || {};
        this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
        this.machineCodeFilter = selectedMachine.code;
    }

    timeStartChanged(e)
    {
        var tempTimeStart = e.detail;
        if (tempTimeStart){
            tempTimeStart = this._adjustMoment(tempTimeStart);
            this.data.timeInMillisStart = momentToMillis(tempTimeStart);
        }
        else{
            delete this.data.timeInMillisStart;
        }
    }

    timeEndChanged(e)
    {
        var tempTimeEnd = e.detail;
        if (tempTimeEnd){
            tempTimeEnd = this._adjustMoment(tempTimeEnd);
            this.data.timeInMillisEnd = momentToMillis(tempTimeEnd);
        }
        else{
            delete this.data.timeInMillisEnd;
        }
    }

    async productionOrderChanged(e)
    {
        this.productionOrderDetails = [];

        var productionOrder = e.detail;
        if (productionOrder){
            this.productionOrderDetails =  await this.service.getProductionOrderDetails(productionOrder.orderNo);
            
            this.data.productionOrderId = productionOrder._id;
            if (this.hasProductionOrderDetails){
                this._mapProductionOrderDetail();
                this.data.selectedProductionOrderDetail = {};
                this.data.selectedProductionOrderDetail = this.productionOrderDetails[0];
            }
        }
        else{
            delete this.data.selectedProductionOrderDetail;
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
                return `${this.colorRequest}`;  
            }
            return detail;
        });
    }

    _adjustMoment(timeInMoment){
        if (timeInMoment){
            timeInMoment.set('year', 1970);
            timeInMoment.set('month', 0);
            timeInMoment.set('date', 1);   
        }
        return timeInMoment;     
    }
}