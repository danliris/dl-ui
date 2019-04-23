import { inject, bindable, BindingEngine } from "aurelia-framework";
import { Service } from "../service";

var ConstructionLoader = require("../../../../loader/weaving-constructions-loader");

@inject(BindingEngine, Service)
export class Items {
  @bindable Code;
  @bindable OrderDocument;

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    // this.data = context.data;
    this.data = {
      Id: 1,
      BeamNumber: "TS 108",
      ConstructionNumber: "C D 133 68 63 A B",
      PIS: 16,
      Visco: "12/12",
      Time: { Start: "02.30",Finish: "04.30" },
      Broke: 2,
      Counter: "Rahayu",
      Shift: "Rahayu",
    };
    this.error = context.error;

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
