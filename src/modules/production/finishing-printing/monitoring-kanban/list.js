import {inject, computedFrom} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    dateFrom = null;
    dateTo = null;
    orderNo = '';
    orderType = null;
    processType = null;

    activate() {
    }

    @computedFrom('orderType')
    get filterOrder() {
        if (this.orderType)
            return {
                "orderType.code": this.orderType.code
            }
        return {};
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.orderNo = '';
        this.orderType = null;
        this.processType = null;
        this.data = [];
    }
    
    
    searching() {
        //var data = [];
        this.service.getReport(this.dateFrom, this.dateTo, this.orderNo, this.orderType, this.processType)
            .then(kanban => {
                //this.data = data;
                var dataTemp = [];
                for(var a of kanban){
                    var temp = {
                        "_createdDate" : a._createdDate,
                        "orderNo" : a.orderNo,
                        "orderType" : a.orderType,
                        "processType" : a.processType,
                        "color" : a.color,
                        "handfeelStandard" : a.handlingStandard,
                        "finishWidth" : a.finishWidth,
                        "material" : a.material,
                        "construction" : a.construction,
                        "yarnNumber" : a.yarnNumber,
                        "grade" : a.grade,
                        "cartNumber" : a.cartNumber,
                        "length" : a.length,
                        "pcs" : a.pcs,
                        "uom" : a.uom,
                        "isComplete" : a.isComplete ? "Complete" : a.currentStepIndex === a.steps.length ? "Pending" : "Incomplete" ,
                        "currentStepIndex" : `${a.currentStepIndex} / ${a.steps.length}`,
                        "step" : a.currentStepIndex === 0 ? " - " : a.steps[a.currentStepIndex - 1].process
                    }
                    dataTemp.push(temp);
                }
                this.data = dataTemp;
            })
    }

    ExportToExcel() {
        this.service.generateExcel(this.dateFrom, this.dateTo, this.orderNo, this.orderType, this.processType,);
    }

    // orderTypeChanged(e){
    //     var selectedOrderType = e.detail || null;
    //     if(selectedOrderType){
    //         this.filterOrder = {
    //             "orderType.code": selectedOrderType.code
    //         }
    //     }else{
    //         this.orderType = null;
    //         this.processType = null;
    //         this.filterOrder = {};
    //     }
    // }

    // processTypeChanged(e){
    //     var selectedProcessType = e.detail || null;
    //     if(!selectedProcessType){
    //         this.processType = null;
    //     }
    // }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}