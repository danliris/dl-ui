import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";
var UnitLoader = require("../../../loader/unit-loader");
var MachineTypeLoader = require('../../../loader/weaving-machine-type-loader');
// var UOMLoader = require("../../../loader/uom-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable WeavingUnit;
  @bindable MachineType;
  // @bindable CutmarkUom;
  // @bindable Speed;
  // @bindable MachineUnit;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  uoms = ["", "Meter", "Yard"];
  locations = ["", "Utara", "Timur", "Selatan", "Barat"];
  process = ["", "Warping", "Sizing", "Reaching", "Tying", "Loom"];
  blocks = ["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  // blocks = ["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  areas = ["", "Weaving 1A", "Weaving 1B"];

  constructor() {}

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.WeavingUnit) {
      this.WeavingUnit = this.data.WeavingUnit;
    }
    if(this.data.MachineType){
      this.MachineType = this.data.MachineType;
    }

    // if (this.data.CutmarkUom) {
    //   this.CutmarkUom = this.data.CutmarkUom;
    // }
    
    if (this.data.MachineNumber) {
      let splittedMachineNumber = this.data.MachineNumber.split("/");
      if(splittedMachineNumber.length > 1){
        this.data.MachineNumberOne = splittedMachineNumber[0];
        this.data.MachineNumberTwo = splittedMachineNumber[1];
        this.longMachineNumber = true;
      }else{
        this.data.MachineNumberOne = splittedMachineNumber[0];
        this.longMachineNumber = false;
      }
    }

    // if(this.data.Speed){
    //   this.Speed = this.data.Speed;
    // }

    // if(this.data.MachineUnit){
    //   this.MachineUnit = this.data.MachineUnit;
    // }

    // if(this.data.Block){
    //   var block = this.data.Block;
    //   this.data.Block = block.toString();
    // }

    this.showHideKawaMotoSuckerMuller = false;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  get units() {
    return UnitLoader;
  }

  get machineTypes() {
    return MachineTypeLoader;
  }

  // get uoms() {
  //   return UOMLoader;
  // }

  WeavingUnitChanged(newValue) {
    this.data.WeavingUnit = newValue;
  }

  // SpeedChanged(newValue){
  //   this.data.Speed = newValue;
  // }

  // MachineUnitChanged(newValue){
  //   this.data.MachineUnit = newValue;
  // }

  MachineTypeChanged(newValue) {
    if (newValue.Id) {
      this.data.MachineType = newValue
      this.data.Speed = newValue.Speed;
      this.data.MachineUnit = newValue.MachineUnit;
      if (newValue.TypeName == "Kawa Moto" || newValue.TypeName == "Sucker Muller") {
        this.showHideKawaMotoSuckerMuller = true;
      } else {
        this.showHideKawaMotoSuckerMuller = false;
        this.data.Cutmark = 0;
        this.data.CutmarkUom = "";
      }
    // } else {
    //   this.data.MachineType = newValue
    //   this.data.Speed = 0;
    //   this.data.MachineUnit = '';
    }
  }

  // CutmarkUomChanged(newValue) {
  //   this.data.CutmarkUom = newValue;
  // }
}
