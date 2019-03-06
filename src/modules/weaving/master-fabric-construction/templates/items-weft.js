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

  // Change on Kode Pakan, affected when Benang Pakan change
  async YarnChanged(newValue) {
    var yarnDetail = await this.service.getYarnById(newValue.Id);
    newValue = yarnDetail;
    if (newValue.Id) {
      this.data.Name = newValue.Name ? newValue.Name : "";
      this.data.Code = newValue.Code ? newValue.Code : "";
      this.data.MaterialTypeId = newValue.MaterialTypeId.Code
        ? newValue.MaterialTypeId.Code
        : "";
      this.data.YarnNumberId = newValue.YarnNumberId.Code
        ? newValue.YarnNumberId.Code
        : "";
      this.data.Quantity = "";
      this.data.Information = "";
    }
  }
}
