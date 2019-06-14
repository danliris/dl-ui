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
export class BeamItemsPost {

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

    this.BeamDocument = this.data.BeamDocument;

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }
}
