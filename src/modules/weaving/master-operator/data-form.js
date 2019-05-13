import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";
var UnitLoader = require("../../../loader/unit-loader");
var AccountLoader = require("../../../loader/account-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable Assignment;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  groups = ["", "A", "B", "C", "D", "E", "F", "G"];

  assignments = ["", "Preparation", "AJL"];

  types = [];

  preparationTypes = ["", "Warping", "Sizing"];

  ajlTypes = ["", "Operator"];

  constructor() {}

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    // if (this.data.WeavingMachineType) {
    //   this.WeavingMachineType = this.data.WeavingMachineType;
    //   this.data.Speed = this.WeavingMachineType.Speed;
    //   this.data.MachineUnit = this.WeavingMachineType.MachineUnit;
    // }

    // if (this.data.WeavingUnit) {
    //   this.WeavingUnit = this.data.WeavingUnit;
    // }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  get accounts() {
    return AccountLoader;
  }

  get units() {
    return UnitLoader;
  }

  AssignmentChanged(newValue) {
    if (this.Assignment === "Preparation") {
      this.data.Assignment = "Preparation";
      this.types = this.preparationTypes;
    } else {
      this.data.Assignment = "AJL";
      this.types = this.ajlTypes;
    }
  }

  //   WeavingUnitChanged(newValue) {
  //     console.log(newValue);
  //     var unit = newValue.Id;
  //     this.data.UnitId.Id = unit;
  //   }
}
