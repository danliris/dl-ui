import { inject, bindable, computedFrom } from "aurelia-framework";
var UnitLoader = require("../../../loader/unit-loader");
var MachineTypeLoader = require('../../../loader/weaving-machine-type-loader');
// var UomLoader = require('../../../loader/uom-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable WeavingMachineType;
  @bindable WeavingUnit;
  @bindable readOnlyValue;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  location = ["", "Utara", "Timur", "Selatan", "Barat"];

  constructor() { }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.WeavingMachineType) {
      this.WeavingMachineType = this.data.WeavingMachineType;
      this.data.Speed = this.WeavingMachineType.Speed;
      this.data.MachineUnit = this.WeavingMachineType.MachineUnit;
    }

    if (this.data.WeavingUnit) {
      this.WeavingUnit = this.data.WeavingUnit;
    }

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

  WeavingMachineTypeChanged(newValue) {

    if (newValue) {
      this.data.WeavingMachineType = newValue
      this.data.Speed = newValue.Speed;
      this.data.MachineUnit = newValue.MachineUnit;
    } else {
      this.data.WeavingMachineType = newValue
      this.data.Speed = 0;
      this.data.MachineUnit = '';
    }
  }

  WeavingUnitChanged(newValue) {

    this.data.WeavingUnit = newValue;
  }
}
