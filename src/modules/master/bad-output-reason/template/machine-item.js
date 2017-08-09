import { bindable } from 'aurelia-framework'
var MachineLoader = require('../../../../loader/machine-loader');

export class MachineItem {
  @bindable machine;

  activate(context) {
    //console.log("machine-Item")
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.machine = this.data; 
    this.filterMachine = {
            "unit.division.name" : "FINISHING & PRINTING"
        }
    console.log(context);
  }

  get machineLoader() {
    return MachineLoader;
  }

  machineChanged(newValue, oldValue) {
    // console.log("temp : ");
    // console.log(this.temp);
    console.log("newValue : ");
    console.log(newValue);
    Object.assign(this.context.data, newValue);
  }
}