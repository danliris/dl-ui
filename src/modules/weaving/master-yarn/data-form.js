import { inject, bindable, computedFrom } from "aurelia-framework";

var MaterialTypeLoader = require("../../../loader/material-types-loader");
var RingLoader = require("../../../loader/weaving-ring-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable RingDocument;
  @bindable MaterialTypeDocument;
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

    if (this.data.Id) {
      var detectWhitespace = this.data.Name.split(" ");
      this.MaterialTypeDocument = this.data.MaterialTypeDocument.Code;
      this.RingDocument = this.data.RingDocument.Code;
      this.data.Name = detectWhitespace[0] ? detectWhitespace[0] : " ";
      this.optionalName = detectWhitespace[1] ? detectWhitespace[1] : " ";
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  optionalNameChanged(newValue) {
    var whitespaceRegex = new RegExp("\\s");
    if (this.data.MaterialTypeDocument && this.data.RingDocument) {
      if (whitespaceRegex.test(newValue)) {
        this.error.optionalName = "Kode Tambahan Tidak Boleh Mengandung Spasi";
      } else {
        // this.data.Name =
        //   this.data.MaterialTypeDocument.Name + this.data.RingDocument.Number;
        this.data.Name = this.data.Name + " " + newValue;
      }
    } else {
      this.data.Name = "";
      this.data.Name = newValue;
    }
  }

  // Change on Kode Bahan, affected when materialTypeDocument change
  MaterialTypeDocumentChanged(newValue) {
    if (newValue.Name) {
      this.data.Name = "";
      this.data.MaterialTypeDocument = {};
      this.data.MaterialTypeDocument.Id = newValue.Id;
      this.data.MaterialTypeDocument.Name = newValue.Name;
      this.data.MaterialTypeDocument.Code = newValue.Code;

      if (this.data.RingDocument) {
        this.data.Name =
          newValue.Name + this.data.RingDocument.Number
            ? newValue.Name + this.data.RingDocument.Number
            : "";
      } else {
        this.data.Name = newValue.Name;
      }
    }
  }

  // Change on Kode Ring, affected when ringDocument change
  RingDocumentChanged(newValue) {
    if (newValue.Number) {
      this.data.Name = "";
      this.data.RingDocument = {};
      this.data.RingDocument.Number = newValue.Number;
      this.data.RingDocument.Code = newValue.Code;

      if (this.data.MaterialTypeDocument) {
        this.data.Name = this.data.MaterialTypeDocument.Name
          ? this.data.MaterialTypeDocument.Name + newValue.Number
          : newValue.Number;
      } else {
        this.data.Name = newValue.Number;
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
