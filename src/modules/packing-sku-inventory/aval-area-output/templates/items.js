import {
    inject,
    bindable,
    BindingEngine
  } from "aurelia-framework";
  import {
    Service
  } from "../service";
  
  @inject(BindingEngine, Service)
  export class Items {
  
    constructor(bindingEngine, service) {
      this.service = service;
      this.bindingEngine = bindingEngine;
    }
  
    async activate(context) {
      this.data = context.data;
      this.error = context.error;
  
      this.options = context.context.options;
    //   this.OrderIdFilter = {
    //     "OrderId": context.context.options.OrderId
    //   };
      
      this.readOnly = context.options.readOnly;
// console.log(this.data);
      if(this.data.avalInputId || this.data.id){
        this.data.AvalItemId = this.data.avalItemId;
        this.data.AvalType = this.data.avalType;
        this.data.AvalCartNo = this.data.avalCartNo;
        this.data.AvalUomUnit = this.data.avalUomUnit;
        this.data.AvalQuantity = this.data.avalQuantity;
        this.data.AvalQuantityKg = this.data.avalQuantityKg;
      }
    }
  }
  