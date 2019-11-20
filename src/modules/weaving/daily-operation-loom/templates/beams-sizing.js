import {
    inject,
    bindable,
    BindingEngine
  } from "aurelia-framework";
  import {
    Service
  } from "../service";
  var SizingBeamByOrderLoader = require("../../../../loader/weaving-sizing-beam-by-order-loader");
  
  @inject(BindingEngine, Service)
  export class BeamsSizing {
  
    constructor(bindingEngine, service) {
      this.service = service;
      this.bindingEngine = bindingEngine;
    }

    process = ["", "Normal", "Reproses"];
  
    get beams() {
      return SizingBeamByOrderLoader;
    }
  
    async activate(context) {
      this.data = context.data;
      this.error = context.error;
  
    //   this.BeamDocument = this.data.BeamDocument;
  
      this.options = context.context.options;
      this.OrderIdFilter = {
        "OrderId": context.context.options.OrderId
      };
      
      this.readOnly = context.options.readOnly;
    }
  }
  