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
      console.log("onItemsCollections Context : ", this.data);
      // var newValue = this.data;
      this.Code = this.data;
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  get rings() {
    return RingLoader;
  }

  CodeChanged(newValue) {
    if (newValue) {
      console.log("onItemsCollections CodeChanged : ", newValue);
      this.data = newValue;
    }
  }
  // Change on Kode Pakan, affected when Benang Pakan change
  //   yarnChanged(newValue) {
  //     if (newValue.name) {
  //       this.data.yarn = newValue ? newValue : "";
  //       this.data.name = newValue.name ? newValue.name : "";
  //       this.data.code = newValue.code ? newValue.code : "";
  //       this.data.materialCode = newValue.materialTypeDocument.code
  //         ? newValue.materialTypeDocument.code
  //         : "";
  //       this.data.ringCode = newValue.ringDocument.code
  //         ? newValue.ringDocument.code
  //         : "";
  //       this.data.quantity = "";
  //       this.data.information = "";
  //     }
  //   }
}
