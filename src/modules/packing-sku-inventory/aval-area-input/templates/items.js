import {
    inject,
    bindable,
    BindingEngine
  } from "aurelia-framework";
  import {
    Service
  } from "../service";
  var UomLoader = require("../../../../loader/uom-loader");
  
  @inject(BindingEngine, Service)
  export class Items {
    @bindable UomUnit
  
    constructor(bindingEngine, service) {
      this.service = service;
      this.bindingEngine = bindingEngine;
    }

    avalTypes = ["KAIN KOTOR", "TALI KOTOR", "PANCINGAN", "AVAL A", "AVAL B", "SAMBUNGAN"]
  
    get uoms() {
      return UomLoader;
    }

    UomUnitChanged(newValue){
      this.data.UomUnit = newValue.Unit;
    }
  
    async activate(context) {
      this.data = context.data;
      this.error = context.error;
  
      this.options = context.context.options;
    //   this.OrderIdFilter = {
    //     "OrderId": context.context.options.OrderId
    //   };
      
      this.readOnly = context.options.readOnly;

      if(this.data){
        this.data.AvalType = this.data.avalType;
        this.data.AvalCartNo = this.data.avalCartNo;
        this.UomUnit = this.data.uomUnit;
        this.data.Quantity = this.data.quantity;
        this.data.QuantityKg = this.data.quantityKg;
      }
    }
  }
  