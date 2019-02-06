import { inject, bindable, BindingEngine } from "aurelia-framework";
import { Service } from "../service";

var YarnLoader = require("../../../../loader/weaving-yarns-loader");

@inject(BindingEngine, Service)
export class ItemsWeft {
  @bindable yarn;

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  get yarnsWeft() {
    return YarnLoader;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    if (this.data.yarn) {
      var newValue = this.data.yarn;
      this.yarn = newValue;
      this.data.name = newValue.name;
      this.data.code = newValue.code;
      this.data.materialCode = newValue.materialTypeDocument.code;
      this.data.ringCode = newValue.ringDocument.code;
    }
    
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // Change on Kode Pakan, affected when Benang Pakan change
  weftTypeChanged(newValue) {
    if (newValue.name) {
      this.data.yarn = newValue;
      this.data.name = newValue.name;
      this.data.code = newValue.code;
      this.data.materialCode = newValue.materialTypeDocument.code;
      this.data.ringCode = newValue.ringDocument.code;

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
