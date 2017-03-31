import { inject, bindable, computedFrom } from 'aurelia-framework';

var BuyersLoader = require('../../../loader/buyers-loader');
var ComodityLoader = require('../../../loader/comodity-loader');
var UomLoader = require('../../../loader/uom-loader');
var QualityLoader = require('../../../loader/quality-loader');
var AccountBankLoader = require('../../../loader/account-banks-loader');
var MaterialLoader = require('../../../loader/material-loader');
var ProductLoader = require('../../../loader/products-loader');
var YarnMaterialLoader = require('../../../loader/yarn-material-loader');
var TermOfPaymentLoader = require('../../../loader/term-of-payment-loader');
var AgentLoader = require('../../../loader/agent-loader');
var OrderTypeLoader= require('../../../loader/order-type-loader');
var DesignMotiveLoader=  require('../../../loader/design-motive-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;

    @bindable title;

    @bindable isEdit;
    @bindable isView;


    termOfPaymentFilter = {};

    tagsFilter = { tags: { "$regex": "material", "$options": "i" } };
    filterComodity = { type:{ "$regex":"Finishing Printing", "$options": "i"} };

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        this.data.details = this.data.details || [];
    }

  @computedFrom("data.orderType")
  get isPrinting(){
      this.printing=false;
      if(this.data.orderType){
        if(this.data.orderType.name.toLowerCase()=="printing"){
          this.printing=true;
        }
      }
    
    return this.printing;
  }
  
  @computedFrom("data.buyer")
  get buyerType(){
    this.ekspor=false;
    if(this.data.buyer){
      if(this.data.buyer.type.toLowerCase()=="ekspor"||this.data.buyer.type.toLowerCase()=="export"){
          this.ekspor=true;
        }
    }
      return this.ekspor;
  }

  @computedFrom("data.buyer")
    get istermOfPayment() {
        this.termOfPayment = false;
        this.termOfPaymentFilter = {};
        if (this.data.buyer) {
            this.termOfPayment = true;
            if (this.data.buyer.type.trim().toLowerCase() == "ekspor") {
                this.termOfPaymentFilter = { "isExport": true };
            } else {
                this.termOfPaymentFilter = { "isExport": false };
            }
        } 
        return this.termOfPayment;
    }

    orderChanged(e){
        if(this.data.orderType){
            this.data.orderTypeId=this.data.orderType._id ? this.data.orderType._id : "";
            if (!this.data.orderTypeId || this.data.orderTypeId=="") {
                this.data.designMotive={};
                this.designMotiveChanged({});
            }
        }
      }

  

  materialChanged(e) {
    if (this.data.material) {
      this.data.materialId = this.data.material._id ? this.data.material._id : "";
    }
  }

  designMotiveChanged(e){
    if (this.data.designMotive) {
      this.data.designMotiveId = this.data.designMotive._id ? this.data.designMotive._id : "";
    }
  }

  constructionChanged(e) {
    if (this.data.materialConstruction) {
      this.data.materialConstructionId = this.data.materialConstruction._id ? this.data.materialConstruction._id : "";
    }
  }

  termOfPaymentChanged(e){
    if (this.data.termOfPayment) {
      this.data.termOfPaymentId = this.data.termOfPayment._id ? this.data.termOfPayment._id : "";
    }
    
  }

  comodityChanged(e){
    if (this.data.comodity) {
      this.data.comodityId = this.data.comodity._id ? this.data.comodity._id : "";
    }
  }

  uomChanged(e) {
    if (this.data.uom) {
      this.data.uomId = this.data.uom._id ? this.data.uom._id : "";
    }
  }

  buyerChanged(e) {
    if (this.data.buyer) {
      this.data.buyerId = this.data.buyer._id ? this.data.buyer._id : "";
      if(this.data.buyer.type.toLowerCase()=="ekspor"||this.data.buyer.type.toLowerCase()=="export"){
        this.filterpayment = {
          "isExport": true
        };
      }
      else{
        this.filterpayment = {
          "isExport": false
        };
      }
      if (!this.data.buyerId || this.data.buyerId=="") {
          this.data.agent={};
          this.data.agentId="";
          this.data.termOfPayment={};
          this.data.termOfPaymentId="";
          this.data.designMotive={};
          this.data.designMotiveId="";
          this.data.remark="";
          this.data.useIncomeTax=false;
          this.data.termOfShipment="";
          this.data.comission="";
      }
          
    }
    else{
      this.data.buyerId="";
      this.data.agent={};
      this.data.agentId="";
      this.data.termOfPayment={};
      this.data.termOfPaymentId="";
      this.termOfPaymentChanged({});
      this.data.designMotive={};
      this.data.designMotiveId="";
      this.data.remark="";
      this.data.useIncomeTax=false;
      this.data.termOfShipment="";
      this.data.comission="";
    }
  }

  agentChanged(e) {
    if (this.data.agent) {
      this.data.agentId = this.data.agent._id ? this.data.agent._id : "";
      if(!this.data.agentId || this.data.agentId==""){
        this.data.comission="";
      }
    }
    else{
      this.data.comission="";
      this.data.agentId="";
    }
  }

  yarnChanged(e) {
    if (this.data.yarnMaterial) {
      this.data.yarnMaterialId = this.data.yarnMaterial._id ? this.data.yarnMaterial._id : "";
    }
  }

  bankChanged(e) {
    if (this.data.accountBank) {
      this.data.accountBankId = this.data.accountBank._id ? this.data.accountBank._id : "";
      this.data.details.length=0;
    }
    else{
      this.data.accountBankId="";
      this.data.details.length=0;
    }
  }

  useIncomeTaxChanged(e) {
        this.data.details.length=0;
    }

  qualityChanged(e){
    if (this.data.quality) {
      this.data.qualityId = this.data.quality._id ? this.data.quality._id : "";
    }
  }

  get buyersLoader() {
        return BuyersLoader;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get uomLoader() {
        return UomLoader;
    }

    get qualityLoader() {
        return QualityLoader;
    }

    get accountBankLoader() {
        return AccountBankLoader;
    }

    get materialLoader() {
        return MaterialLoader;
    }

    get productLoader() {
        return ProductLoader;
    }

    get yarnMaterialLoader() {
        return YarnMaterialLoader;
    }

    get termOfPaymentLoader() {
        return TermOfPaymentLoader;
    }

    get agentLoader() {
        return AgentLoader;
    }

    get designMotiveLoader() {
        return DesignMotiveLoader;
    }

    get orderTypeLoader() {
        return OrderTypeLoader;
    }

  get detailHeader(){
    if(!this.data.useIncomeTax){
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }];
    }
    else{
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }, {header: "Include PPn?"}]; 
    }
  } 
  
  get addDetail(){
    return (event) => {
      var newDetail=   {
            currency: this.data.accountBank.currency,
            color: '',
            price: 0,
            UseIncomeTax : false
          };
      this.data.details.push(newDetail);
    };
  }
}
