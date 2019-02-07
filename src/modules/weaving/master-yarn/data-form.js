import { inject, bindable, computedFrom } from "aurelia-framework";

var MaterialTypeLoader = require("../../../loader/material-types-loader");
var RingLoader = require("../../../loader/weaving-ring-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable ringDocument;
  @bindable materialTypeDocument;
  @bindable yarnCode;
  @bindable optionalName;

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

    if (this.data.id) {
      var detectWhitespace = this.data.name.split(" ");
      this.materialTypeDocument = this.data.materialTypeDocument.code;
      this.ringDocument = this.data.ringDocument.code;
      this.data.name = detectWhitespace[0] ? detectWhitespace[0] : " ";
      console.log(this.data);
      this.optionalName = detectWhitespace[1] ? detectWhitespace[1] : " ";
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  optionalNameChanged(newValue) {
    var whitespaceRegex = new RegExp("\\s");
    if (this.data.materialTypeDocument && this.data.ringDocument) {
      if (whitespaceRegex.test(newValue)) {
        this.error.optionalName = "Kode Tambahan Tidak Boleh Mengandung Spasi";
      } else {
        this.data.name =
          this.data.materialTypeDocument.name + this.data.ringDocument.number;
        this.data.name = this.data.name + " " + newValue;
      }
    } else {
      this.data.name = "";
      this.data.name = newValue;
    }
  }

  // Change on Kode Bahan, affected when materialTypeDocument change
  materialTypeDocumentChanged(newValue) {
    if (newValue.name) {
      this.data.name = "";
      this.data.materialTypeDocument = {};
      this.data.materialTypeDocument.name = newValue.name;
      this.data.materialTypeDocument.code = newValue.code;

      if (this.data.ringDocument) {
        this.data.name =
          newValue.name + this.data.ringDocument.number
            ? newValue.name + this.data.ringDocument.number
            : "";
      } else {
        this.data.name = newValue.name;
      }
    }
  }

  // Change on Kode Ring, affected when ringDocument change
  ringDocumentChanged(newValue) {
    if (newValue.number) {
      this.data.name = "";
      this.data.ringDocument = {};
      this.data.ringDocument.number = newValue.number;
      this.data.ringDocument.code = newValue.code;

      if (this.data.materialTypeDocument) {
        this.data.name = this.data.materialTypeDocument.name
          ? this.data.materialTypeDocument.name + newValue.number
          : newValue.number;
      } else {
        this.data.name = newValue.number;
      }
    }
  }

  get materialLoader() {
    return MaterialTypeLoader;
  }

  get ringLoader() {
    return RingLoader;
  }
}
