import { inject, bindable, computedFrom } from "aurelia-framework";
import { callbackify } from "util";
var UnitLoader = require("../../../loader/unit-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor() {}

  historyColumns = [
    { header: "No. Beam", value: "beamNumber" },
    { header: "Time Stop", value: "timeStop" },
    { header: "Time Start", value: "timeStart" },
    { header: "Keterangan", value: "description" }
  ];

  // @computedFrom("data.id")
  // get isEdit() {
  //   return (this.data.id || "").toString() != "";
  // }

  get units() {
    return UnitLoader;
  }

  bind(context) {
    this.context = context;
    // this.data = this.context.data;
    this.data = {
      Id: 1,
      runningMachineOrderDate: "02/02/2019",
      weavingUnit: "Weaving1",
      shift: "Shift 1",
      runningMachineNumber: "000001",
      orderProductionNumber: "002/02-2019",
      fabricConstructionNumber: "PC KIW 99 44 55 Tencelc Hd",
      warpOrigin: "A",
      weftOrigin: "C"
    };
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  //Triggered when "+" on Items Collections Clicked
  get addHistory() {
    return event => {
      this.data.Items.push({});
    };
  }
}
