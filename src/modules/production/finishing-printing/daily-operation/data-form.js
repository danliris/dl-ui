import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnlyInput = false;
    @bindable readOnlyOutput = false;
    @bindable readOnly = false;
    @bindable output = false;
    @bindable data = {};
    @bindable error = {};
    shiftOptions = ['Shift I: 06.00 – 14.00', 'Shift II: 14.00 – 22.00', 'Shift III: 22:00 – 06.00'];
    hourOptions = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
    minuteOptions = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30",
                      "31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60"];

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    get isSteps(){
        this.data.steps = [];
        return this.data.steps;
    }

    get isColourType(){
        this.data.ColorType = {
            name : ""
        };
        return this.data.ColorType;
    }

    get isInstruction(){
        this.data.instruction = {
            name : ""
        };
        return this.data.instruction;
    }

    get isFilterColor(){
        this.filterColor = {
            "productionOrder.orderNo" : this.data.productionOrder ? this.data.productionOrder.orderNo : ""
        };
        return this.filterColor;
    }

    get isFilterMachine(){
        this.filterMachine = {
            stepId : this.data.stepId ? this.data.stepId : ""
        };
        return this.filterMachine;
    }

    get isFilterInstruction(){
        this.filterInstruction = {};
        if(this.data.productionOrder){
            if(this.data.productionOrder.orderType.name != 'Yarn Dyed' && this.data.productionOrder.orderType.name != 'Printing'){
                this.filterInstruction ={
                            "$and" : [{
                                "colorType.code" : this.data.productionOrder.orderType.name == 'Yard Dyed' || this.data.productionOrder.orderType.name == 'Printing' ? '' : this.data.colorType ? this.data.colorType.code : ''
                            },{
                                construction : this.data.construction ? this.data.construction : this.data.productionOrder ? this.data.productionOrder.construction : ''
                            },{
                                "orderType.code" : this.data.productionOrder ? this.data.productionOrder.orderType.code : ''
                            },{
                                "material.code" : this.data.material ? this.data.material.code : ''
                            }]
                        };
            }else{
                this.filterInstruction ={
                            "$and" : [{
                                construction : this.data.construction ? this.data.construction : this.data.productionOrder ? this.data.productionOrder.construction : ''
                            },{
                                "orderType.code" : this.data.productionOrder ? this.data.productionOrder.orderType.code : ''
                            },{
                                "material.code" : this.data.material ? this.data.material.code : ''
                            }]
                        };
            }
        }
        return this.filterInstruction;
    }
    
    get isFilterStep() {
        this.filterStep ={
            process : {"$in" : this.data.instruction ? this.data.instruction.steps : ''}
        };
        return this.filterStep;
    }
    
    productionOrderChanged(e){
        var selectedProductionOrder = e.detail;
        if(selectedProductionOrder){
            this.data.material = selectedProductionOrder.material ? selectedProductionOrder.material : {name:""};
            this.data.materialId = selectedProductionOrder.materialId ? selectedProductionOrder.materialId : "";
            this.data.construction = selectedProductionOrder.construction ? selectedProductionOrder.construction : "";
            if(this.data.material){
                this.filterColor = {
                    "productionOrder.orderNo" : selectedProductionOrder.orderNo
                };
            }
        }
    }

    colorChanged(e){
        var selectColor = e.detail;
        if(selectColor){
            this.data.colorType = selectColor.colorType ? selectColor.colorType : {};
            this.data.colorTypeId = selectColor.colorTypeId ? selectColor.colorTypeId : {};
            if(this.data.colorType){
                this.filterInstruction ={
                    "$and" : [{
                        "colorType.code" : this.data.productionOrder.orderType.name == 'Yard Dyed' || this.data.productionOrder.orderType.name == 'Printing' ? '' : this.data.colorType ? this.data.colorType.code : ''
                    },{
                        construction : this.data.construction ? this.data.construction : this.data.productionOrder ? this.data.productionOrder.construction : ''
                    },{
                        "orderType.code" : this.data.productionOrder ? this.data.productionOrder.orderType.code : ''
                    },{
                        "material.code" : this.data.material ? this.data.material.code : ''
                    }]
                };
            }else{
                this.filterInstruction ={
                    "$and" : [{
                        construction : this.data.construction ? this.data.construction : this.data.productionOrder ? this.data.productionOrder.construction : ''
                    },{
                        "orderType.code" : this.data.productionOrder ? this.data.productionOrder.orderType.code : ''
                    },{
                        "material.code" : this.data.material ? this.data.material.code : ''
                    }]
                };
            }
        }
    }

    instructionChanged(e){
        var selectInstruction = e.detail;
        if(selectInstruction){
            this.data.instructionId = selectInstruction._id ? selectInstruction._id : "";
            if(selectInstruction.steps){
                this.filterStep ={
                    process : {"$in" : selectInstruction.steps ? selectInstruction.steps : ''}
                };
            }
        }
    }

    machineChanged(e) {
        var selectedMachine = e.detail || {};
        if (selectedMachine)
            this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
    }

    stepChanged(e) {
        var selectedStep = e.detail || {};
        if (selectedStep){
            this.data.stepId = selectedStep._id ? selectedStep._id : "";
            if(this.data.stepId){
                this.data.steps = [];
                for(var a of selectedStep.itemMonitoring){
                    var x = {
                        key : a,
                        value : ""
                    };
                    this.data.steps.push(x);
                }
                this.filterMachine = {
                    "step.process" : selectedStep.process
                };
            }
        }
    }
}