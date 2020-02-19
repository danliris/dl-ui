import {
  bindable
} from "aurelia-framework";
var UnitLoader = require("../../../loader/unit-loader");
var MachineTypeLoader = require('../../../loader/weaving-machine-type-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable WeavingUnit;
  @bindable MachineType;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  uoms = ["", "Meter", "Yard"];
  locations = ["", "Utara", "Timur", "Selatan", "Barat"];
  process = ["", "Warping", "Sizing", "Reaching", "Tying", "Loom"];
  blocks = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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

  WeavingUnitChanged(newValue) {
    this.data.WeavingUnit = newValue;
  }

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
    }
  }
}
