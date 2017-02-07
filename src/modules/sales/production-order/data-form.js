import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');
import {Service} from './service';

@inject(BindingEngine, Element,Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    RUNOptions=['Tanpa RUN','1 RUN', '2 RUN', '3 RUN', '4 RUN'];

    constructor(bindingEngine, element,service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
        
    }

    @computedFrom("data.dataId")
    get isEdit() {
        return (this.data.dataId || '').toString() != '';
    }
    
    get isPrinting(){
        this.printing=false;
        if(this.data.orderType){
            if(this.data.orderType.name.trim().toLowerCase()=="printing" || this.data.orderType.name.trim().toLowerCase()=="yarndyed"){
                this.printing=true;
            }
        }
        return this.printing;
    }

    get isPrintingOnly(){
        this.printingOnly=false;
        if(this.data.orderType){
            if(this.data.orderType.name.trim().toLowerCase()=="printing"){
                this.printingOnly=true;
            }
        }
        return this.printingOnly;
    }

    orderChanged(e){
        var selectedOrder=e.detail || {};
        if(selectedOrder){
            this.data.orderTypeId=selectedOrder._id ? selectedOrder._id : "";
            var code= selectedOrder.code;
            if (!this.readOnly) {
                this.data.processType={};
                this.processChanged({});
                this.data.details = [];
            }
            if(code){
                this.filterOrder={
                    "orderType.code": code
                }; 
            }
            if(selectedOrder.name)
            {
                if(selectedOrder.name.trim().toLowerCase()=="printing"){
                    this.printingOnly=true;
                }
                else{
                    this.printingOnly=false;
                }
                if(selectedOrder.name.trim().toLowerCase()=="printing" || selectedOrder.name.trim().toLowerCase()=="yarndyed"){
                    this.printing=true;
                }
                else{
                    this.printing=false;
                }
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
            this.data.materialId=selectedMaterial._id ? selectedMaterial._id : "";
        }
    }

    constructionChanged(e){
        var selectedConstruction= e.detail || {};
        if(selectedConstruction){
            this.data.materialConstructionId=selectedConstruction._id ? selectedConstruction._id : "";
        }
    }

    uomChanged(e) {
        var selectedUom = e.detail;
        if (selectedUom)
        {
            this.data.uomId = selectedUom._id;
            if(this.data.details){
                for(var i of this.data.details){
                    i.uom=selectedUom;
                }
            }
        }
    }

    buyerChanged(e){
        var selectedBuyer = e.detail;
        if (selectedBuyer){
            this.data.buyerId = selectedBuyer._id ? selectedBuyer._id : "";
        }
    }

    yarnChanged(e){
        var selectedYarn=e.detail || {};
        if(selectedYarn){
            this.data.yarnMaterialId=selectedYarn._id ? selectedYarn._id : "";
        }
    }

    finishTypeChanged(e){
        var selectedFinish=e.detail || {};
        if(selectedFinish){
            this.data.finishTypeId=selectedFinish._id ? selectedFinish._id : "";
        }
    }

    RUNChanged(e){
        var selectedRUN=e.srcElement.value;
        if(selectedRUN){
            this.data.RUNWidth = [];
            if(selectedRUN=="Tanpa RUN"){
                this.run=false;
                this.data.RUNWidth.length=0;
            }
            if(selectedRUN=="1 RUN"){
                this.run=true;
                this.data.RUNWidth.length=0;
                if(this.data.RUNWidth.length==0){
                    this.data.RUNWidth[0]=0;
                }
                console.log(this.data.RUNWidth);
            }
            if(selectedRUN=="2 RUN"){
                this.run=true;
                this.data.RUNWidth.length=0;
                if(this.data.RUNWidth.length==0){
                    this.data.RUNWidth.push(0,0);
                }
            }
            if(selectedRUN=="3 RUN"){
                this.run=true;
                this.data.RUNWidth.length=0;
                if(this.data.RUNWidth.length==0){
                    this.data.RUNWidth.push(0,0,0);
                }
            }
            if(selectedRUN=="4 RUN"){
                this.run=true;
                this.data.RUNWidth.length=0;
                if(this.data.RUNWidth.length==0){
                    this.data.RUNWidth.push(0,0,0,0);
                }
            }
            
        }
    }

    standardTestChanged(e){
        var selectedTest=e.detail || {};
        if(selectedTest){
            this.data.standardTestId=selectedTest._id ? selectedTest._id : "";
        }
    }

    accountChanged(e){
        var selectedAccount=e.detail || {};
        if(selectedAccount){
            this.data.accountId=selectedAccount._id ? selectedAccount._id : "";
        }
    }

    addDetail(e){
        for(var i=0;i<this.data.details.length;i++){
            this.data.details[i].uom=this.data.uom;
        }
    }

}