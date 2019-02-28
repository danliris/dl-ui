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

  //   historyColumns = [
  //     { header: "No. Beam", value: "beamNumber" },
  //     { header: "Time Stop", value: "timeStop" },
  //     { header: "Time Start", value: "timeStart" },
  //     { header: "Keterangan", value: "description" }
  //   ];

  // @computedFrom("data.id")
  // get isEdit() {
  //   return (this.data.id || "").toString() != "";
  // }

  //   get units() {
  //     return UnitLoader;
  //   }

  bind(context) {
    this.context = context;
    // this.data = this.context.data;
    this.data = {
      Id: 1,
      weavingUnit: "Weaving1",
      location: "Selatan",
      runningMachineNumber: "1/2",
      area: "Area 1",
      block: "Blok 2",
      kaizenBlock: "Blok 4",
      maintenance: "ABC",
      operator: "DEF"
    };
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  //   //Triggered when "+" on Items Collections Clicked
  //   get addHistory() {
  //     return event => {
  //       this.data.Items.push({});
  //     };
  //   }
}
