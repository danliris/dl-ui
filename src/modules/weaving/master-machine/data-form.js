import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";
var UnitLoader = require("../../../loader/unit-loader");
var MachineTypeLoader = require('../../../loader/weaving-machine-type-loader');
var UOMLoader = require("../../../loader/uom-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable WeavingUnit;
  @bindable WeavingMachineType;
  @bindable CutmarkUom;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  locations = ["", "Utara", "Timur", "Selatan", "Barat"];
  process = ["", "Warping", "Sizing", "Reaching", "Tying", "Loom"];
  blocks = ["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  areas = ["", "Weaving 1A", "Weaving 1B"];

  constructor() {}

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

    if (this.data.CutmarkUom) {
      this.CutmarkUom = this.data.CutmarkUom;
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

  get uoms() {
    return UOMLoader;
  }

  WeavingUnitChanged(newValue) {
    this.data.WeavingUnit = newValue;
  }

  WeavingMachineTypeChanged(newValue) {
    if (newValue) {
      this.data.WeavingMachineType = newValue
      this.data.Speed = newValue.Speed;
      this.data.MachineUnit = newValue.MachineUnit;
      if (newValue.TypeName == "Kawa Moto" || newValue.TypeName == "Sucker Muller") {
        this.showHideKawaMotoSuckerMuller = true;
      } else {
        this.showHideKawaMotoSuckerMuller = false;
        this.data.Cutmark = 0;
        this.CutmarkUom = null;
      }
    } else {
      this.data.WeavingMachineType = newValue
      this.data.Speed = 0;
      this.data.MachineUnit = '';
    }
  }

  CutmarkUomChanged(newValue) {
    this.data.CutmarkUom = newValue;
  }
}
