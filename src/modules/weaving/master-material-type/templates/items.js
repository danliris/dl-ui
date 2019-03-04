import { inject, bindable, BindingEngine } from "aurelia-framework";
import { Service } from "../service";

var RingLoader = require("../../../../loader/weaving-ring-loader");

@inject(BindingEngine, Service)
export class Items {
  @bindable Code;

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    if(this.data.Code){
      this.Code = this.data;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  get rings() {
    return RingLoader;
  }

  CodeChanged(newValue) {
    console.log(newValue);
    if (newValue) {
      this.data.Code = newValue.Code;
      this.data.Number = newValue.Number;
    }
  }
}
