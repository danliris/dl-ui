import { inject, bindable, computedFrom } from 'aurelia-framework';

var UnitLoader = require('../../../loader/unit-loader');
var StepLoader = require('../../..//loader/step-loader');
var MachineTypeLoader = require('../../../loader/machine-type-loader');

export class DataForm {
  @bindable readOnly;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

  @bindable title;

  machineEventColumns = [
    { header: "No", value: "no" },
    { header: "Nama", value: "name" },
  ]

  stepColumns = [
    { header: "Proses", value: "process" },
  ]

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
  }

  get addMachineEvent() {
    return (event) => {
      this.data.machineEvents.push({})
    };
  }
  
  get addStep() {
    return (event) => {
      this.data.steps.push({})
    };
  }

  get removeStep() {
    return (event) => console.log(event);
  }

  unitSelected(e){
    console.log('selected')
  }

  unitChanged(e){
    console.log('unit changed')
  }

  // stepChanged(e){
  //   console.log('step changed')
  // }

  machineTypeChanged(e){
    console.log('machineType changed')
  }

  get unitLoader(){
    return UnitLoader;
  }
  // get stepLoader(){
  //   return StepLoader;
  // }
  get machineTypeLoader(){
    return MachineTypeLoader;
  }
} 
