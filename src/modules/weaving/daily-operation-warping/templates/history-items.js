import { inject, BindingEngine } from "aurelia-framework";
import moment from "moment";

@inject(BindingEngine)
export class HistoryItems {
  constructor(bindingEngine) {
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
