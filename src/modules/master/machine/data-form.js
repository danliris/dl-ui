import { inject, bindable, computedFrom } from 'aurelia-framework';

var UnitLoader = require('../../../loader/unit-loader');
var StepLoader = require('../../..//loader/step-loader');
var MachineTypeLoader = require('../../../loader/machine-type-loader');

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

  get addMachineEvent() {
    return (event) => {
      this.data.machineEvents.push({})
    };
  }

  unitSelected(e){
    console.log('selected')
  }

  unitChanged(e){
    console.log('unit changed')
  }

  stepChanged(e){
    console.log('step changed')
  }

  machineTypeChanged(e){
    console.log('machineType changed')
  }

  get unitLoader(){
    return UnitLoader;
  }
  get stepLoader(){
    return StepLoader;
  }
  get machineTypeLoader(){
    return MachineTypeLoader;
  }

} 
