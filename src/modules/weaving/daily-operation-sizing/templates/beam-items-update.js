import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";
var BeamLoader = require("../../../../loader/weaving-beam-loader");

@inject(BindingEngine, Service)
export class BeamItemsUpdate {
  // @bindable BeamDocument;

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  get beams() {
    return BeamLoader;
  }

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
}
