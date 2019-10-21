import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";
import moment from "moment";

// var ConstructionLoader = require("../../../../loader/weaving-constructions-loader");

@inject(BindingEngine, Service)
export class HistoryItems {
  // @bindable Code;
  // @bindable OrderDocument;

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
