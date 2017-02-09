import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DataForm {
  @bindable readOnly = false;
  @bindable data;
  @bindable error;

  @bindable title;

  @bindable cancel;
  @bindable delete;
  @bindable save;
  @bindable edit;

  machineEventColumns = [
    { header: "No", value: "no" },
    { header: "Name", value: "name" },
  ]

  bind(){
    this.data = {};
    this.data.machineEvents = [];
  }

  addMachineEvent() {
    this.data.machineEvents.push({})
  }

  unitSelected(e){
    console.log('selected : ' + e)
  }

  unitChanged(e){
    console.log('changed : ' + e)
  }
} 
