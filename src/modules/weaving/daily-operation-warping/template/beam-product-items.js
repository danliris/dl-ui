import {
    inject,
    bindable,
    BindingEngine
  } from "aurelia-framework";
  
  @inject(BindingEngine, Service)
  export class BeamProductItems {
  
    constructor(bindingEngine, service) {
      this.service = service;
      this.bindingEngine = bindingEngine;
    }
  
    async activate(context) {
      this.data = context.data;
      this.error = context.error;
  
      this.options = context.context.options;
      this.readOnly = context.options.readOnly;
    }
  }
  