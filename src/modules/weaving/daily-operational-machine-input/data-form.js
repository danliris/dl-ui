import { inject, bindable, computedFrom } from "aurelia-framework";
// import { Dialog } from '../../../../../components/dialog/dialog';
import { callbackify } from "util";
import { Router } from "aurelia-router";
var UnitLoader = require("../../../loader/unit-loader");
var MachineLoader = require("../../../loader/weaving-machine-loader");

// @inject(Service, Router)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable MachineDocument;
  @bindable WeavingDocument;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor() {
  }

  // OperationalMachineOptions = {

  // };

  columns = [
    {
      value: "OrderProductionNumber",
      header: "No. SPP"
    },
    {
      value: "ConstructionNumber",
      header: "No. Konstruksi"
    },
    {
      value: "Shift",
      header: "Shift"
    },
    { value: "BeamNumber", header: "No. Beam" },
    { value: "WarpOrigin", header: "Asal Lusi" },
    { value: "WeftOrigin", header: "Asal Pakan" },
    {
      value: "Time.Pause",
      header: "Waktu Penggantian"
    },
    {
      value: "Time.Resume",
      header: "Waktu Lanjutkan"
    },
    {
      value: "Time.Difference",
      header: "Selisih Waktu"
    },
    {
      value: "BeamOperator",
      header: "Operator Beam"
    },
    { value: "LoomGroup", header: "Grup Loom" },
    {
      value: "SizingNumber",
      header: "No. Sizing"
    },
    {
      value: "SizingOperator",
      header: "Operator Sizing"
    },
    {
      value: "SizingGroup",
      header: "Grup Sizing"
    },
    { value: "Information", header: "Keterangan" }
  ];

  get units() {
    return UnitLoader;
  }

  get machines() {
    return MachineLoader;
  }

  MachineDocumentChanged(newValue) {
    console.log(newValue);
    if(newValue){
      this.data.MachineId = newValue.Id;
    }
  }

  WeavingDocumentChanged(newValue){
    console.log(newValue)
    if(newValue){
      this.data.UnitId = newValue.Id;
    }
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.showHideStartMenu=false;
    this.showHideResumeMenu=false;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  //Triggered when "+" on Items Collections Clicked
  // get start() {
  //   return event => {
  //     this.data.DailyOperationMachineDetails.push({});
  //   };
  // }

  start(){
    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHideResumeMenu = false;
    }
  }

  resume(){
    if (this.showHideResumeMenu === true) {
      this.showHideResumeMenu = false;
    } else {
      this.showHideResumeMenu = true;
      this.showHideStartMenu = false;
    }
  }
}
