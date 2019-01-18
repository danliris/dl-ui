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

  constructor() {}

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }
  material = ["", "Cotton", "Poly"];
  ringsize = [, 1, 2, 3, 4];

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    // if (this.data && this.data.uom)
    //         this.data.uom.toString = function () {
    //             return this.unit;
    //         };
    this.data = {
        id: 1,
        yarnCode: "01",
        yarnMaterialType: "Cotton",
        yarnRingSize: "2",
        yarnName: "PC45",
        yarnUnit: "Bale",
        yarnCurrencyCode: "IDR",
        yarnPrice: 70000,
        tags: "Weaving",
        yarnDescription: "some detail"
    };
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
