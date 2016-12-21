import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');
import {Service} from './service';

@inject(BindingEngine, Element,Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable uom = {};

    processOptions = ['Finishing','Printing','Yarn Dyed'];
    RUNOptions=['Tanpa RUN','1 RUN', '2 RUN'];

    constructor(bindingEngine, element,service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
        
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
    exportChanged(e){
        var selectedExport =  e.srcElement.checked || false;
        this.data.isExport=selectedExport;
    }

    processChanged(e){
        this.filter={};
        this.data.material={};
        var selectedProcess = e.srcElement.value || "";
        if(selectedProcess){
            this.data.processType = selectedProcess ? selectedProcess : "";
            if (!this.readOnly) {
                this.data.material={};
                this.materialChanged({});
            }
            if(this.data.processType){
                this.filter = {
                    processType : this.data.processType
                };
            }
            
        }
        
    }

    materialChanged(e){
        var selectedMaterial= e.detail;
        if(selectedMaterial){
            this.data.material=selectedMaterial._id ? selectedMaterial._id : "";
            if (!this.readOnly) {
                this.data.instruction={};
                this.data.instruction.construction="";
                this.constructionChanged({});
            }
            if(this.data.processType && this.data.material){
                this.filter = {
                    processType : this.data.processType,
                    material : this.data.material
                };
            }
        }
        else{
            if (!this.readOnly) {
                this.data.instruction={};
                this.data.instruction.construction="";
                this.constructionChanged({});
            }
            if(this.data.processType){
                this.filter = {
                    processType : this.data.processType
                };
            }
        }
    }

    constructionChanged(e){
        var selectedConstruction= e.detail || {};
        if(selectedConstruction){
            this.data.construction=selectedConstruction.construction ? selectedConstruction.construction : "";
            if(this.data.processType && this.data.material && this.data.construction){
                this.data.instructionId=selectedConstruction._id ? selectedConstruction._id : "";
            }
        }
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