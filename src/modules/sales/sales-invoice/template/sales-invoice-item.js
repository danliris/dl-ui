import { inject, bindable,BindingEngine } from "aurelia-framework";
import { SalesInvoiceDetail } from"./sales-invoice-detail";
import { DataForm } from "./../data-form";

var UomLoader = require("../../../../loader/uom-loader");
var UomDyeingLoader = require("../../../../loader/uom-dyeing-loader");

@inject(SalesInvoiceDetail,DataForm,BindingEngine)
export class SalesInvoiceItem {
  @bindable Total;
  @bindable Price;
  @bindable isDyeing;

  constructor(salesInvoiceDetail,dataForm,bindingEngine){
    this.salesInvoiceDetail = salesInvoiceDetail;
    this.dataForm = dataForm;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.readOnly = context.options.readOnly;
    this.Total = this.data.Total;
    this.Price = this.data.Price;
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;

    if (this.data.Uom) {
      this.selectedUom = {
        'Id': this.data.Uom.Id,
        'Unit': this.data.Uom.Unit
      };
    }
    
  }

  TotalChanged(newValue, oldValue) {
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;
    this.data.Total = this.Total;
  }

  PriceChanged(newValue, oldValue) {
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;
    this.data.Price = this.Price;
  }

  AmountChanged(newValue, oldValue) {
    this.data.Amount = this.getAmount;
  }

  @bindable selectedUom;
  selectedUomChanged(newValue, oldValue) {
    if (this.selectedUom && this.selectedUom.Id) {
      this.data.Uom = {};
      this.data.Uom.Id = this.selectedUom.Id;
      this.data.Uom.Unit = this.selectedUom.Unit;
      if(newValue.Unit =="MTR"){
        this.data.ConvertValue = parseInt(this.data.Total * (10936/10000));
        this.data.ConvertUnit = "YARD";
      } else if(newValue.Unit =="YARD"){
        this.data.ConvertValue = parseInt(this.data.Total / (10936/10000));
        this.data.ConvertUnit = "MTR";
      }else{
        this.data.ConvertValue = null;
        this.data.ConvertUnit= null;
      }
    } else {
      this.data.Uom.Id = null;
      this.data.Uom.Unit = null;
    }
  }

  get uomLoader() {
    var isdyeing=0;
    var refType = [
      {code :"BPF",entity:"dyeing"},
      {code :"BSF",entity:"dyeing"},
      {code :"RPF",entity:"dyeing"},
      {code :"BPR",entity:"printing"},
      {code :"BSR",entity:"printing"},
      {code :"RPR",entity:"printing"},
      {code :"BON",entity:"dyeing"},
      {code :"GPF",entity:"dyeing"},
      {code :"RGF",entity:"dyeing"},
      {code :"GPR",entity:"printing"},
      {code :"RGR",entity:"printing"},
      {code :"RON",entity:"dyeing"},
      {code :"BRG",entity:"weaving"},
      {code :"RRG",entity:"weaving"}
    ]
    var findType= refType.filter((data)=> {
      return data.code == this.dataForm.data.SalesInvoiceType;
    });
    
    if(findType.length>0){
      if(findType[0].entity == "dyeing")
      {isdyeing = 1;}
      else
      {isdyeing =  0;}
    }else{
      isdyeing = 0;
    }
    this.isDyeing = isdyeing;
    if(isdyeing){
      return UomDyeingLoader;
    }else{
      return UomLoader;
    }
  }

}
