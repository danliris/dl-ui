import { inject, bindable, computedFrom } from "aurelia-framework";

// var CurrencyLoader = require('../../../loader/currency-loader');
// var UomLoader = require('../../../loader/uom-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  //   customShortOptions={
  //       control:{
  //           length:6
  //       }
  //   };

  weavingUnit = ["", "Weaving1", "Weaving2", "Weaving3"];
  machineType = ["", "Jacquard", "Rappier Dobby", "Tsudakoma", "Toyota"];
  unit = ["", "cmpx", "m"];
  location = ["", "Utara", "Timur", "Selatan", "Barat"];

  constructor() {}

  // @computedFrom("data.id")
  // get isEdit() {
  //   return (this.data.id || "").toString() != "";
  // }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }
}
