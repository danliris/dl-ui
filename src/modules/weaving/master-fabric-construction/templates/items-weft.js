import { inject, bindable, BindingEngine } from "aurelia-framework";
import { Service } from "../service";

var YarnLoader = require("../../../../loader/weaving-yarns-loader");

@inject(BindingEngine, Service)
export class ItemsWeft {
  @bindable Yarn;

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  get yarnsWeft() {
    return YarnLoader;
  }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    // console.log(this.data);
    this.Quantity = this.data.Quantity;
    this.Information = this.data.Information;
    console.log(this.data.Yarn);
    if (this.data.Yarn) {

      var retrieveValue = this.data.Yarn;
      this.data.YarnId = retrieveValue.Id;
      this.Yarn = retrieveValue;
      this.data.Code = retrieveValue.Code;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // Change on Kode Pakan, affected when Benang Pakan change
  async YarnChanged(newValue) {
    console.log(newValue);
    if (newValue) {
      this.data.Yarn = newValue;

      this.data.YarnId = newValue.Id ? newValue.Id : "";
      this.data.Code = newValue.Code ? newValue.Code : "";
      this.data.Quantity = 0;
      this.data.Information = "";
    }
  }
}
