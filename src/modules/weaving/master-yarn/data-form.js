import { inject, bindable, computedFrom } from "aurelia-framework";

var MaterialTypeLoader = require("../../../loader/material-types-loader");
var RingLoader = require("../../../loader/weaving-ring-loader");
var CurrencyLoader = require("../../../loader/currency-loader");
var UomLoader = require("../../../loader/uom-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable ringDocument;
  @bindable materialTypeDocument;
  @bindable uomData;
  @bindable currencyData;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

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

  // Change on Kode Bahan
  materialTypeDocumentChanged(newValue) {
    if (!this.data.name) {
      if (this.data.ringDocument) {
        this.data.name = newValue.name + this.data.ringDocument.number;
      }
    }

    if (!this.data.materialTypeDocument) {
      this.data.materialTypeDocument = {};
    }

    this.data.materialTypeDocument.code = newValue.code;
    this.data.materialTypeDocument.name = newValue.name;
  }

  // Change on Kode Ring
  ringDocumentChanged(newValue) {
    if (!this.data.ringDocument) {
      this.data.ringDocument = {};
    }

    this.data.ringDocument.code = newValue.code;
    this.data.ringDocument.number = newValue.number;

    if (this.data.materialTypeDocument) {
      this.data.name = this.data.materialTypeDocument.name + newValue.number;
    }
  }

  uomDataChanged(newValue) {
    if (!this.data.coreUom) {
      this.data.coreUom = {};
    }
    console.log(newValue);
    this.data.coreUom.code = newValue.unit;
    this.data.coreUom.unit = newValue.unit;
  }

  currencyDataChanged(newValue) {
    if (!this.data.coreCurrency) {
      this.data.coreCurrency = {};
    }

    this.data.coreCurrency.code = newValue.code;
    this.data.coreCurrency.name = newValue.description;
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
}
