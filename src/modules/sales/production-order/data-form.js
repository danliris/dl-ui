import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');
import { Service } from './service';

@inject(BindingEngine, Element, Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};

  lampHeader = [{ header: "Lamp Standard" }];
  
  RUNOptions = ['Tanpa RUN', '1 RUN', '2 RUN', '3 RUN', '4 RUN'];

  filterAccount = {
            "roles" : {
                "$elemMatch" : { 
                    "permissions" : {
                        "$elemMatch" : { 
                            "unit.name" : "PENJUALAN FINISHING & PRINTING"
                        }
                    }
                }
            }
        };
  
  filterMaterial = {
    "tags" :{
        "$regex" : (new RegExp("material", "i"))
    }
  }

  constructor(bindingEngine, element, service) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;

  }

  @computedFrom("data.dataId")
  get isEdit() {
    return (this.data.dataId || '').toString() != '';
  }


  get isPrinting() {
    this.printing = false;
    if (this.data.orderType) {
      if (this.data.orderType.name.trim().toLowerCase() == "printing" || this.data.orderType.name.trim().toLowerCase() == "yarndyed") {
        this.printing = true;
      }
    }
    return this.printing;
  }

  get isPrintingOnly(){
        this.printingOnly=false;
        if(this.data.orderType){
            if(this.data.orderType.name.toLowerCase()=="printing"){
                this.printingOnly=true;
            }
        }
        return this.printingOnly;
    }

  get isFilterOrder(){
      this.filterOrder = {
        "orderType.code": this.data.orderType.code
      };
    
    return this.filterOrder;
  }

  get isRUN(){
      this.run=false;
      if(this.data.RUN=="Tanpa RUN"){
          this.run=false;
          this.data.RUNWidth.length=0;
      }
      if(this.data.RUN=="1 RUN"){
          this.run=true;
          this.data.RUNWidth.length=1;
          if(this.data.RUNWidth.length==0){
              this.data.RUNWidth[0]=0;
          }
          console.log(this.data.RUNWidth);
      }
      if(this.data.RUN=="2 RUN"){
          this.run=true;
          this.data.RUNWidth.length=2;
          if(this.data.RUNWidth.length==0){
              this.data.RUNWidth.push(0,0);
          }
      }
      if(this.data.RUN=="3 RUN"){
          this.run=true;
          this.data.RUNWidth.length=3;
          if(this.data.RUNWidth.length==0){
              this.data.RUNWidth.push(0,0,0);
          }
      }
      if(this.data.RUN=="4 RUN"){
          this.run=true;
          this.data.RUNWidth.length=4;
          if(this.data.RUNWidth.length==0){
              this.data.RUNWidth.push(0,0,0,0);
          }
      }
      return this.run;
  }
  
    orderChanged(e){
        var selectedOrder=e.detail || {};
        if(selectedOrder){
            this.data.orderTypeId=selectedOrder._id ? selectedOrder._id : "";
            var code= selectedOrder.code;
            if (!this.readOnly) {
                this.data.processType={};
                this.processChanged({});
                this.data.details.length=0;
            }
            if(code){
                this.filterOrder={
                    "orderType.code": code
                }; 
            }
            if(selectedOrder.name)
            {
                if(selectedOrder.name.toLowerCase()=="printing"){
                    this.printingOnly=true;
                }
                else{
                    this.printingOnly=false;
                }
                if(selectedOrder.name.toLowerCase()=="printing" || selectedOrder.name.toLowerCase()=="yarn dyed"){
                    this.printing=true;
                }
                else{
                    this.printing=false;
                }
            }
            
        }
        else {
          if (!this.readOnly) {
            this.data.processType = {};
            this.processChanged({});
            this.data.details = [];
          }
          var code = this.data.orderType.code;
          if (this.data.orderType && code) {
            this.filterOrder = {
              "orderType.code": code
            };
          }
          if (this.data.orderType) {
            if (this.data.orderType.name.toLowerCase() == "printing" || this.data.orderType.name.toLowerCase() == "yarn dyed") {
              this.printing = true;
            }
            else {
              this.printing = false;
            }
            if (this.data.orderType.name.toLowerCase() == "printing") {
              this.printingOnly = true;
            }
            else {
              this.printingOnly = false;
            }
          }

        }
      }

  processChanged(e) {
    var selectedProcess = e.detail || {};
    if (selectedProcess) {
      this.data.processTypeId = selectedProcess._id ? selectedProcess._id : "";
    }

  }

  materialChanged(e) {
    var selectedMaterial = e.detail || {};
    if (selectedMaterial) {
      this.data.materialId = selectedMaterial._id ? selectedMaterial._id : "";
    }
  }

  constructionChanged(e) {
    var selectedConstruction = e.detail || {};
    if (selectedConstruction) {
      this.data.materialConstructionId = selectedConstruction._id ? selectedConstruction._id : "";
    }
  }

  uomChanged(e) {
    var selectedUom = e.detail;
    if (selectedUom) {
      this.data.uomId = selectedUom._id;
      if (this.data.details) {
        for (var i of this.data.details) {
          i.uom = selectedUom;
          i.uomId = selectedUom._id;
        }
      }
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

  buyerChanged(e) {
    var selectedBuyer = e.detail;
    if (selectedBuyer) {
      this.data.buyerId = selectedBuyer._id ? selectedBuyer._id : "";
    }
  }

  yarnChanged(e) {
    var selectedYarn = e.detail || {};
    if (selectedYarn) {
      this.data.yarnMaterialId = selectedYarn._id ? selectedYarn._id : "";
    }
  }

  finishTypeChanged(e) {
    var selectedFinish = e.detail || {};
    if (selectedFinish) {
      this.data.finishTypeId = selectedFinish._id ? selectedFinish._id : "";
    }
  }

  standardTestChanged(e) {
    var selectedTest = e.detail || {};
    if (selectedTest) {
      this.data.standardTestId = selectedTest._id ? selectedTest._id : "";
    }
  }

  accountChanged(e) {
    var selectedAccount = e.detail || {};
    if (selectedAccount) {
      this.data.accountId = selectedAccount._id ? selectedAccount._id : "";
    }
  }
  // NEW CODE


  bind() {
    this.data = this.data || {};
    this.data.lampStandards = this.data.lampStandards || [];
    this.data.details = this.data.details || [];
  }

  get addLamp() {
    return (event) => {
      this.data.lampStandards.push({ lampStandard: {}, lampStandardId: {} });
    };
  }

  get detailHeader(){
    if(!this.printing){
      return [{ header: "Acuan Warna/Desain" }, { header: "Warna Yang Diminta" }, { header: "Jenis Warna" }, { header: "Jumlah" }, { header: "Satuan" }];
    }
    else{
      return [{ header: "Acuan Warna/Desain" }, { header: "Warna Yang Diminta" }, { header: "Jumlah" }, { header: "Satuan" }]; 
    }
  } 
  get removeLamp() {
    return (event) => console.log(event);
  }

  get addDetailnonPrinting() {
    return (event) => {
      var newDetail=   {
            uom: this.data.uom,
            uomId: this.data.uom._id,
            colorRequest: '',
            colorTemplate: '',
            quantity: 0,
            printing : this.printing
          };
      this.data.details.push(newDetail);
    };
  }

  get addDetailPrintingYarnDyed(){
    return (event) => {
      var newDetail=   {
            uom: this.data.uom,
            uomId: this.data.uom._id,
            colorRequest: '',
            colorTemplate: '',
            quantity: 0,
            printing : this.printing
          };
      this.data.details.push(newDetail);
    };
  }
}
