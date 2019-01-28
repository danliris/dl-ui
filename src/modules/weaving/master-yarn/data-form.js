import { inject, bindable, computedFrom } from "aurelia-framework";

var MaterialTypeLoader = require("../../../loader/material-types-loader");
var RingLoader = require("../../../loader/weaving-ring-loader");
var CurrencyLoader = require("../../../loader/currency-loader");
var UomLoader = require("../../../loader/uom-loader");

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

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    this.uom = this.data.uomSelected;
  }

  @bindable materialTypeDocument;
  @bindable ringDocument;
  @computedFrom("materialTypeDocument && ringDocument")
  get checkMaterialRing() {
    switch (this.materialTypeDocument && this.ringDocument) {
      case this.materialTypeDocument(newValue):
        this.data.materialTypeDocument.name =
          newValue && newValue.materialTypeDocument.name
            ? newValue.materialTypeDocument.name
            : "";
        this.data.ringDocument.name =
          newValue && newValue.ringDocument.name
            ? newValue.ringDocument.name
            : "";
        this.data.name =
          newValue && newValue.name
            ? newValue.name
            : this.data.materialTypeDocument.name + this.data.ringDocument.name;
        break;
      case ringDocument(newValue):
        this.data.materialTypeDocument.name =
          newValue && newValue.materialTypeDocument.name
            ? newValue.materialTypeDocument.name
            : "";
        this.data.ringDocument.name =
          newValue && newValue.ringDocument.name
            ? newValue.ringDocument.name
            : "";
        this.data.name =
          newValue && newValue.name
            ? newValue.name
            : this.data.materialTypeDocument.name + this.data.ringDocument.name;
        break;
    }
  }

  get materialLoader() {
    return MaterialTypeLoader;
  }

  get ringLoader() {
    return RingLoader;
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

  get uomLoader() {
    return UomLoader;
  }

  uomChanged(newValue, oldValue) {
    var dataSelected = newValue;
    if (dataSelected) {
      this.data.uom = dataSelected.unit;
      this.data.uomSelected = dataSelected;
    } else {
      this.data.uom = "";
      this.data.uomSelected = {};
    }
  }

  currencyChanged(e) {
    var selectedCurrency = e.detail || {};
    if (selectedCurrency) {
      this.data.currency = selectedCurrency._id ? selectedCurrency._id : "";
    }
  }
}
