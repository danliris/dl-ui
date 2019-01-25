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

  unit = ["", "Weaving1", "Weaving2", "Weaving3", "Weaving4", "Weaving5", "Weaving6"];
  machineType = ["", "000001", "000002", "000003", "000004", "000005", "000006"];
  location = ["", "Place A", "Place B", "Place C", "Place D", "Place E", "Place F"];
  block = ["", "A", "B", "C", "D", "E", "F"];
  maintenance = ["", "Maintenance"];
  operator = ["", "Operator"];

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
