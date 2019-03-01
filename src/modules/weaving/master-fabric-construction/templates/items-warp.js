import { inject, bindable, BindingEngine } from "aurelia-framework";
import { Service } from "../service";

var YarnLoader = require("../../../../loader/weaving-yarns-loader");

@inject(BindingEngine, Service)
export class ItemsWarp {
  @bindable Yarn;

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  get yarnsWarp() {
    return YarnLoader;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    // console.log(this.data);
    // if (this.data.yarn) {
    //   console.log(this.data.yarn);
    //   var newValue = this.data.yarn;
    //   this.yarn = newValue;
    //   this.data.name = newValue.name;
    //   this.data.code = newValue.code;
    //   this.data.materialCode = newValue.materialCode;
    //   this.data.ringCode = newValue.ringCode;
    // }

    if (this.data.Id) {
      this.data.Select = true;
    }
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // Change on Kode Lusi, affected when Benang Lusi change
  YarnChanged(newValue) {
    console.log(newValue);
    if (newValue.Id) {
      this.data.Yarn = newValue ? newValue : "";
      this.data.Name = newValue.Name ? newValue.Name : "";
      this.data.Code = newValue.Code ? newValue.Code : "";
      this.data.materialCode = newValue.MaterialTypeDocument.Code
        ? newValue.MaterialTypeDocument.Code
        : "";
      this.data.ringCode = newValue.RingDocument.Code
        ? newValue.RingDocument.Code
        : "";
      this.data.Quantity = "";
      this.data.Information = "";
    }
  }
}
