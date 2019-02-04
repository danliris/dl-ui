import { inject, bindable, BindingEngine } from "aurelia-framework";

var YarnLoader = require("../../../../loader/weaving-yarns-loader");

@inject(BindingEngine)
export class ItemsWarp {
  @bindable warpType;

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }

  get yarnsWarp() {
    return YarnLoader;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    console.log(this.data);

    if (this.data.warpType) {
      var newValue = this.data.warpType;
      this.warpType = newValue;
      this.data.name = newValue.name;
      this.data.code = newValue.code;
      this.data.materialCode = newValue.materialTypeDocument.code;
      this.data.ringCode = newValue.ringDocument.code;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // Change on Kode Lusi, affected when Benang Lusi change
  warpTypeChanged(newValue) {
    if (newValue.name) {
      this.data.warpType = newValue;
      this.data.name = newValue.name;
      this.data.code = newValue.code;
      this.data.materialCode = newValue.materialTypeDocument.code;
      this.data.ringCode = newValue.ringDocument.code;
    }
  }
}
