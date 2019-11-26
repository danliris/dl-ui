import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";
var SizingBeamByOrderLoader = require("../../../../loader/weaving-sizing-beam-by-order-loader");
var MachineLoader = require("../../../../loader/weaving-machine-loader");
var OperatorLoader = require("../../../../loader/weaving-operator-loader");

@inject(BindingEngine, Service)
export class BeamsSizingPost {
  @bindable BeamDocument
  @bindable MachineDocument
  @bindable OperatorDocument
  @bindable Time

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  process = ["", "Normal", "Reproses"];

  get beams() {
    return SizingBeamByOrderLoader;
  }

  get machines() {
    return MachineLoader;
  }

  get operators() {
    return OperatorLoader;
  }

  BeamDocumentChanged(newValue) {
    this.data.BeamDocument = newValue;
  }

  MachineDocumentChanged(newValue){
    this.data.MachineDocument = newValue;
  }

  OperatorDocumentChanged(newValue){
    this.data.OperatorDocument = newValue;
  }

  async TimeChanged(newValue) {
    this.data.Shift = {};
    this.data.Time = newValue;
    var resultShift = await this.service.getShiftByTime(newValue)
      .then(result => {
        return result;
      })
      .catch(e => {
        this.Shift = {};
        this.error.Shift = " Shift tidak ditemukan ";
      });
    this.data.Shift = resultShift;
  }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    this.BeamDocument = this.data.BeamDocument;
    this.MachineDocument = this.data.MachineDocument;
    this.OperatorDocument = this.data.OperatorDocument;
    this.Time = this.data.Time;

    this.options = context.context.options;
    this.OrderIdFilter = {
      "OrderId": context.context.options.OrderId
    };

    this.readOnly = context.options.readOnly;
  }
}
