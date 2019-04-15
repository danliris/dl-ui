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
    this.data = context.data;
    // this.data = {
    //   Id: 1,
    //   OrderProductionNumber: "PC AB 99 44 55",
    //   ConstructionNumber: "0002/02-2019",
    //   Shift: "Rahayu",
    //   BeamNumber: "TS 108",
    //   WarpOrigin: "B",
    //   WeftOrigin: "A",
    //   Time: { Pause: "02.30", Resume: "04.30", Difference: "2" },
    //   BeamOperator: "Rahayu",
    //   LoomGroup: "D",
    //   SizingNumber: 2,
    //   SizingOperator: "Ahmad",
    //   SizingGroup: "B",
    //   Information: "Some Info"
    // };
    this.error = context.error;

    // if(this.data.Code){
    // console.log("onItemsCollections Context : ", this.data);
    // var newValue = this.data;
    // this.Code = this.data;
    // }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  get orders() {
    return ConstructionLoader;
  }

  OrderDocumentChanged(newValue) {
    console.log(newValue);
    this.data.ConstructionNumber = newValue.ConstructionNumber;
  }
}
