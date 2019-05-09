import { inject, bindable, BindingEngine } from "aurelia-framework";
import { Service } from "../service";
var BeamLoader = require("../../../../loader/weaving-beam-loader");

@inject(BindingEngine, Service)
export class BeamItems {
//   @bindable Yarn;

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  get beams() {
    return BeamLoader;
  }

//   get yarnsWarp() {
//     return YarnLoader;
//   }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    // if (this.data.Yarn) {

    //   var retrieveValue = this.data.Yarn;
    //   this.data.YarnId = retrieveValue.Id;
    //   this.Yarn = retrieveValue;
    //   this.data.Code = retrieveValue.Code;
    // }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // Change on Kode Lusi, affected when Benang Lusi change
//   async YarnChanged(newValue) {
    
//     if (newValue) {
//       this.data.Yarn = newValue;

//       this.data.YarnId = newValue.Id ? newValue.Id : "";
//       this.data.Code = newValue.Code ? newValue.Code : "";
//       this.data.Quantity = 0;
//       this.data.Information = "";
//     }
//   }
}
