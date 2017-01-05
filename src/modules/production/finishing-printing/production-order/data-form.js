import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');
import {Service} from './service';

@inject(BindingEngine, Element,Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable uom = {};

    RUNOptions=['Tanpa RUN','1 RUN', '2 RUN'];

    constructor(bindingEngine, element,service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
        
    }

    @computedFrom("data.dataId")
    get isEdit() {
        return (this.data.dataId || '').toString() != '';
    }

    get isFilter() {
        if(this.data.processType){
            this.filter ={
                processType : this.data.processType
            };
        }
        else{
            this.filter ={
                processType : "Finishing"
            };
        }
        return this.filter;
    }

    qtyOrder=0;
    orderChanged(e){
        var selectedOrder=e.detail || {};
        if(selectedOrder){
            this.data.orderTypeId=selectedOrder._id ? selectedOrder._id : "";
            if (!this.readOnly) {
                this.data.processType={};
                this.processChanged({});
                this.data.material={};
                this.materialChanged({});
            }
            if(this.data.orderType){
                this.filterOrder={
                    "orderType.code":this.data.orderType.code
                };
                this.filterProduct = {
                    orderTypeId: this.data.orderTypeId
                };
            }
        }
    }

    processChanged(e){
        var selectedProcess = e.detail || {};
        if(selectedProcess){
            this.data.processTypeId = selectedProcess._id ? selectedProcess._id : "";
        }
        
    }

    materialChanged(e){
        var selectedMaterial= e.detail || {};
        if(selectedMaterial){
            if(selectedMaterial._id){
                this.data.materialId=selectedMaterial._id._id ? selectedMaterial._id._id : "";
                if (!this.readOnly) {
                    this.data.construction={};
                    this.constructionChanged({});
                }
                if(this.data.processType && this.data.material){
                    this.filter = {
                        orderTypeId : this.data.orderType._id,
                        materialId : this.data.materialId
                    };
                }
            }
        }
        // else{
        //     if (!this.readOnly) {
        //         this.data.instruction={};
        //         this.data.instruction.construction="";
        //         this.constructionChanged({});
        //     }
        //     if(this.data.processType){
        //         this.filter = {
        //             processType : this.data.processType
        //         };
        //     }
        // }
    }

    constructionChanged(e){
        var selectedConstruction= e.detail || {};
        // if(selectedConstruction){
        //     this.data.construction=selectedConstruction._id ? selectedConstruction._id : "";
        //     if(this.data.processType && this.data.material && this.data.construction){
        //         this.data.instructionId=selectedConstruction._id ? selectedConstruction._id : "";
        //     }
        // }
    }
    qtyChange(e){
        this.qtyOrder=this.data.orderQuantity;
    }

    uomChanged(e) {
        var selectedUom = e.detail;
        if (selectedUom)
        {
            this.data.uomId = selectedUom._id;
            for(var i of this.data.details){
                i.uom=selectedUom;
            }
        }
    }

    buyerChanged(e){
        var selectedBuyer = e.detail;
        if (selectedBuyer)
            this.data.buyerId = selectedBuyer._id;
    }

    lampStandardChanged(e){
        var selectedLamp = e.detail;
        if (selectedLamp)
            this.data.lampStandardId = selectedLamp._id;
    }

    addDetail(e){
        for(var i=0;i<this.data.details.length;i++){
            this.data.details[i].uom=this.data.uom;
        }
        
    }

   
}