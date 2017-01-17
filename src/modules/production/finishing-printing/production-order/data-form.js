import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');
import {Service} from './service';

@inject(BindingEngine, Element,Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

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
    get isFilter(){
        this.data.constructionId=this.data.construction._id;
        this.filter={
            orderTypeId : this.data.orderTypeId,
            materialId : this.data.materialId,
            construction : this.data.constructionId
        };
        return this.filter;
    }
    get isFilterOrder(){
        this.filterOrder={
            "orderType.code": this.data.orderType.code
        };
        return this.filterOrder;
    }
    get isFilterOrderId(){
        this.filterOrderId={
            orderTypeId: this.data.orderTypeId
        };
        return this.filterOrderId;
    }
    get isFilterProduct(){
        this.filterProduct = {
            orderTypeId : this.data.orderTypeId,
            materialId : this.data.materialId
        };
        return this.filterProduct;
    }

    orderChanged(e){
        var selectedOrder=e.detail || {};
        if(selectedOrder){
            this.data.orderTypeId=selectedOrder._id ? selectedOrder._id : "";
            if (!this.readOnly) {
                this.data.processType={};
                this.processChanged({});
                this.data.material={};
                this.materialChanged({});
                this.data.construction={};
                this.constructionChanged({});
                this.data.details = [];
            }
            if(this.data.orderType){
                this.filterOrder={
                    "orderType.code": this.data.orderType.code
                };
                this.filterOrderId={
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
        this.data.materialId=selectedMaterial._id ? selectedMaterial._id._id : "";
            if(selectedMaterial._id){
                if (!this.readOnly) {
                    this.data.construction={};
                    this.constructionChanged({});
                    this.data.details = [];
                }
                if(this.data.processType && this.data.material){
                    this.filterProduct = {
                        orderTypeId : this.data.orderType._id,
                        materialId : selectedMaterial._id._id
                    };
                }
            }
            else{
                if (!this.readOnly) {
                    this.data.construction={};
                    this.constructionChanged({});
                }
            }
        }
        else{
            if (!this.readOnly) {
                this.data.construction={};
                this.constructionChanged({});
            }
        }
    }

    constructionChanged(e){
        var selectedConstruction= e.detail || {};
        if(selectedConstruction){
            this.data.constructionId=selectedConstruction._id ? selectedConstruction._id : "";
             if(this.data.processType && this.data.material && this.data.constructionId){
                 this.filter={
                    orderTypeId : this.data.orderType._id,
                    materialId : this.data.materialId,
                    construction : this.data.constructionId
                 }
                 if (!this.readOnly)
                    this.data.details = [];
             }
         }
         else{
             this.data.details = [];
         }
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
        if (selectedBuyer){
            this.data.buyerId = selectedBuyer._id;
        }
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