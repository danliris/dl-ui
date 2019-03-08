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

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    // console.log(this.data);
    // this.Quantity = this.data.Quantity;
    // this.Information = this.data.Information;
    if (this.data.Yarn) {
      this.data.Select = true;
      var retrieveValue = this.data.Yarn;
      this.data.YarnId = retrieveValue.Id;
      this.Yarn = retrieveValue;
      this.data.Code = retrieveValue.Code;
      this.data.MaterialTypeId = retrieveValue.MaterialCode;
      this.data.YarnNumberId = retrieveValue.RingCode;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // Change on Kode Lusi, affected when Benang Lusi change
  async YarnChanged(newValue) {
    this.Yarn = newValue;
    if (newValue) {
      this.data.Code = newValue.Code ? newValue.Code : "";
      this.data.YarnId = newValue.Id ? newValue.Id : "";
      this.data.MaterialTypeId = newValue.MaterialTypeId.Code
        ? newValue.MaterialTypeId.Code
        : "";
      this.data.YarnNumberId = newValue.YarnNumberId.Code
        ? newValue.YarnNumberId.Code
        : "";
      this.data.Quantity = 0;
      // var quantity = this.Quantity;
      // this.data.Quantity = quantity;
      this.data.Information = "";
      // var information = this.Information;
      // this.data.Information = information;
    }
  }

  // QuantityChanged(newValue) {
  //   if (newValue) {
  //     this.data.Quantity = 0;
  //     var quantity = this.Quantity;
  //     this.data.Quantity = quantity;
  //   }
  // }

  // InformationChanged(newValue) {
  //   if (newValue) {
  //     this.data.Information = "";
  //     var information = this.Information;
  //     this.data.Information = information;
  //   }
  // }
}
