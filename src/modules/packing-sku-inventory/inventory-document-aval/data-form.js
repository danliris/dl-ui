import {
    inject,
    bindable,
    computedFrom
  } from "aurelia-framework";
  var DyeingPrintingUomLoader = require("../../../loader/dyeing-printing-area-movement-loader");
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
  
    get notes() {
      return DyeingPrintingUomLoader;
    }
  
    get uoms() {
      return UomLoader;
    }
  
    shifts = ["", "PAGI", "SIANG"];
  
    constructor() {}
  
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
  