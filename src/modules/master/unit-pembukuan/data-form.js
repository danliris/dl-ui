import { inject, bindable, computedFrom } from "aurelia-framework";
var DivisionLoader = require("../../../loader/division-loader-new");

export class DataForm {
  @bindable title;
  @bindable readOnly = false;
  @bindable data = { import: true };
  @bindable error = {};
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  constructor() {}
  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() != "";
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  get divisionLoader() {
    return DivisionLoader;
  }

  divisionChanged(e) {
    console.log("this", this);
  }

  activate() {}

  attached() {}
}
