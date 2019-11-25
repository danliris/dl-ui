import {
    inject,
    bindable,
    BindingEngine
  } from "aurelia-framework";
  import {
    Service
  } from "../service";
  import moment from 'moment';
  
  @inject(Service, BindingEngine)
  export class BeamProductItems {
  
    constructor(service, bindingEngine) {
      this.service = service;
      this.bindingEngine = bindingEngine;
    }
  
    async activate(context) {
      this.data = context.data;
  
      this.error = context.error || {};
  
      if (this.data.LatestDateTimeBeamProduct) {
        var DateBeamProduct = moment(this.data.LatestDateTimeBeamProduct).format('DD/MM/YYYY');
        var TimeBeamProduct = moment(this.data.LatestDateTimeBeamProduct).format('LT');
  
        this.data.LatestDateBeamProduct = DateBeamProduct;
        this.data.LatestTimeBeamProduct = TimeBeamProduct;
      }
  
      this.options = context.context.options;
      this.readOnly = context.options.readOnly;
    }
  }
  