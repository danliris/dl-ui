import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";

var ConstructionLoader = require("../../../../loader/weaving-constructions-loader");

@inject(BindingEngine, Service)
export class LogItems {
  // @bindable Code;
  // @bindable OrderDocument;

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    // if (this.data) {
      // if (this.data.BrokenBeamCauses == "" || this.data.BrokenBeamCauses == 0) {
      //   this.data.BrokenBeamCauses = 0;
      // }
      // if (this.data.MachineTroubledCauses == "" || this.data.MachineTroubledCauses == 0) {
      //   this.data.MachineTroubledCauses = 0;
      // }
      // if (this.data.InformationHistory === "" || this.data.InformationHistory === null || this.data.InformationHistory === undefined) {
      //   this.data.InformationHistory = "-";
      // }
    // }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  //   get orders() {
  //     return ConstructionLoader;
  //   }

  //   OrderDocumentChanged(newValue) {
  //     console.log(newValue);
  //     this.data.ConstructionNumber = newValue.ConstructionNumber;
  //   }
}
