import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');
import { Service } from './service';


var FinishingPrintingSalesContractLoader = require('../../../loader/finishing-printing-sales-contract-loader');
var YarnMaterialLoader = require('../../../loader/yarn-material-loader');

@inject(BindingEngine, Element, Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable salesContract;

  lampHeader = [{ header: "Standar Lampu" }];
  
  RUNOptions = ['Tanpa RUN', '1 RUN', '2 RUN', '3 RUN', '4 RUN'];
  
  constructor(bindingEngine, element, service) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;
    
    this.filterAccount = {
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

      this.filterMaterial = {
      "tags" :"material"
    }
  }
  

  get fpSalesContractLoader() {
        return FinishingPrintingSalesContractLoader;
    }

  @computedFrom("data.dataId")
  get isEdit() {
    return (this.data.dataId || '').toString() != '';
  }

  @computedFrom("data.orderType")
  get isPrinting() {
    this.printing = false;
    if (this.data.orderType) {
      if (this.data.orderType.name.trim().toLowerCase() == "printing") {
        this.printing = true;
      }
    }
    return this.printing;
  }

  @computedFrom("data.orderType")
  get isYarnDyed() {
    this.yarndyed = false;
    if (this.data.orderType) {
      if (this.data.orderType.name.trim().toLowerCase() == "yarn dyed") {
        this.yarndyed = true;
      }
    }
    return this.yarndyed;
  }

  @computedFrom("data.orderType")
  get isPrintingOnly(){
        this.printingOnly=false;
        if(this.data.orderType){
            if(this.data.orderType.name.toLowerCase()=="printing"){
                this.printingOnly=true;
            }
        }
        return this.printingOnly;
    }

  @computedFrom("data.orderType")
  get isFilterOrder(){
      this.filterOrder = {
        "orderType.code": this.data.orderType.code
      };
    
    return this.filterOrder;
  }
  @computedFrom("data.dataId")
  get isRUN(){
      this.run=false;
        if(this.data.RUNWidth){
          if(this.data.RUNWidth.length>0)
            this.run=true;
        }
      return this.run;
  }

  salesContractChanged(e){
      this.data.salesContractId=this.data.salesContract._id ? this.data.salesContract._id : "";
      this.data.salesContractNo=this.data.salesContract.salesContractNo ? this.data.salesContract.salesContractNo: "";
    
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
                if(selectedOrder.name.toLowerCase()=="printing" ){
                    this.printing=true;
                }
                else{
                    this.printing=false;
                }
                if( selectedOrder.name.toLowerCase()=="yarn dyed"){
                    this.yarndyed=true;
                }
                else{
                    this.yarndyed=false;
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
              console.log(selectedRUN)
                this.run=true;
                this.data.RUNWidth[0]=0;
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

scFields=["salesContractNo"];
  async bind() {
    this.data = this.data || {};
    this.data.lampStandards = this.data.lampStandards || [];
    this.data.details = this.data.details || [];

    if (this.data.salesContractNo) {
            this.selectedSC = await this.service.getSCbyId(this.data.salesContractNo,this.scFields);
            this.data.salesContract =this.selectedSC;
           // this.selectedMaterial = this.data.material;
        }
  }

  get addLamp() {
    return (event) => {
      this.data.lampStandards.push({ lampStandard: {}, lampStandardId: {} });
    };
  }

  get detailHeader(){
    if(!this.printing && !this.yarndyed){
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
            printing : this.isPrinting
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
            printing : this.isPrinting
          };
      this.data.details.push(newDetail);
    };
  }
}
