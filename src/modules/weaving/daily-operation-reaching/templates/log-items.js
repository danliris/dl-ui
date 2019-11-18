import {
    inject,
    bindable,
    BindingEngine
  } from "aurelia-framework";
  import {
    Service
  } from "../service";
  import moment from "moment";
  
  @inject(BindingEngine, Service)
  export class LogItems {
  
    constructor(bindingEngine, service) {
      this.service = service;
      this.bindingEngine = bindingEngine;
    }
  
    activate(context) {
      this.data = context.data;
      this.error = context.error;
  
      if (this.data.DateTimeMachine) {
          var DateMachine = moment(this.data.DateTimeMachine).format('DD/MM/YYYY');
          var TimeMachine = moment(this.data.DateTimeMachine).format('LT');
    
          this.data.MachineDate = DateMachine;
          this.data.MachineTime = TimeMachine;
      }
  
      this.options = context.context.options;
      this.readOnly = context.options.readOnly;
    }
  }
  