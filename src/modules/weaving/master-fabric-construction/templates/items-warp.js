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
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // Change on Kode Lusi, affected when Benang Lusi change
  warpTypeChanged(newValue) {
    if (newValue.name) {
      // this.data.name = "";
      this.data.warpType = {};
      this.data.warpType.name = newValue.name;
      this.data.warpType.code = newValue.code;



      // if (this.data.ringDocument) {
      //   this.data.name =
      //     newValue.name + this.data.ringDocument.number
      //       ? newValue.name + this.data.ringDocument.number
      //       : "";
      // } else {
      //   this.data.name = newValue.name;
      // }
    }
  }
}
