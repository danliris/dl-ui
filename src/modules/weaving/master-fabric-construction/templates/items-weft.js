import { inject, bindable, BindingEngine } from "aurelia-framework";

var YarnLoader = require("../../../../loader/weaving-yarns-loader");

@inject(BindingEngine)
export class ItemsWeft {
@bindable weftType;

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }
  
  get yarnsWeft() {
    return YarnLoader;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // Change on Kode Pakan, affected when Benang Pakan change
  weftTypeChanged(newValue) {
    if (newValue.name) {
      // this.data.name = "";
      this.data.weftType = {};
      this.data.weftType.name = newValue.name;
      this.data.weftType.code = newValue.code;



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
