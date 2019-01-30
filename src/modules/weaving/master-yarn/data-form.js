import { inject, bindable, computedFrom } from "aurelia-framework";

var MaterialTypeLoader = require("../../../loader/material-types-loader");
var RingLoader = require("../../../loader/weaving-ring-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable ringDocument;
  @bindable materialTypeDocument;
  @bindable yarnCode;

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

    if (this.data.name != null || this.data.name != undefined) {
      var detectWhitespace = this.data.name.split(" ");
      this.data.name = detectWhitespace[0];
      this.data.optionalName = detectWhitespace[1];
    }
    if (this.data.optionalName == null || this.data.optionalName == undefined) {
      this.data.name = this.data.name;
    }
    //If have materialTypeDocument.code (from Db)
    if (this.data.materialTypeDocument != undefined) {
      //Bind Variable on Form = materialTypeDocument.code from Db
      this.materialTypeDocument = this.data.materialTypeDocument.code;
    }

    if (this.data.ringDocument != undefined) {
      this.ringDocument = this.data.ringDocument.code;
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  // Change on Kode Bahan, affected when materialTypeDocument change
  materialTypeDocumentChanged(newValue) {
    if (newValue.name) {
      this.data.materialTypeDocument = {};

      this.data.materialTypeDocument.name = newValue.name;
      this.data.materialTypeDocument.code = newValue.code;
      if (this.data.ringDocument) {
        this.data.name = "";
        this.data.name =
          newValue.name + this.data.ringDocument.number
            ? this.data.ringDocument.number
            : "";
      } else {
        this.data.name = newValue.name;
      }
    } else {
      this.materialTypeDocument = newValue;
    }
  }

  // Change on Kode Ring, affected when ringDocument change
  ringDocumentChanged(newValue) {
    if (newValue.name) {
      this.ringDocument = {};

      this.data.ringDocument.number = newValue.number;
      this.data.ringDocument.code = newValue.code;
      if (this.data.materialTypeDocument) {
        this.data.name = this.data.materialTypeDocument.name
          ? this.data.materialTypeDocument.name
          : "" + newValue.number;
      } else {
        this.data.name = newValue.number;
      }
    } else {
      this.ringDocument = newValue;
    }
  }

  get materialLoader() {
    return MaterialTypeLoader;
  }

  get ringLoader() {
    return RingLoader;
  }
}
