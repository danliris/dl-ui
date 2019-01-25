import { inject, bindable, computedFrom } from "aurelia-framework";
import { callbackify } from "util";
var MaterialLoader = require('../../../loader/material-loader');

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

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    // if (this.data && this.data.uom)
    //         this.data.uom.toString = function () {
    //             return this.unit;
    //         };
    // this.data = {
    //     id: 1,
    //     code: "01",
    //     name: "PC45",
    //     description: "some detail"
    // };
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  get materialType() {
    return MaterialLoader;
  }

  //   uomChanged(e) {
  //     var selectedUom = e.detail;
  //     if (selectedUom) this.data.uomId = selectedUom._id;
  //   }

  //   currencyChanged(e) {
  //     var selectedCurrency = e.detail || {};
  //     if (selectedCurrency) {
  //       this.data.currency = selectedCurrency._id ? selectedCurrency._id : "";
  //     }
  //   }

  //   get currencyLoader() {
  //     return CurrencyLoader;
  //   }

  //   get uomLoader() {
  //     return UomLoader;
  //   }
}
