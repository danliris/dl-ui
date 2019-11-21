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
  @bindable BeamPreparationTime

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

  async BeamPreparationTimeChanged(newValue) {
    this.Shift = {};
    this.BeamPreparationTime = newValue;
    var resultShift = await this.service.getShiftByTime(newValue)
      .then(result => {
        return result;
        // this.error.Shift = "";
        // this.Shift = {};
        // this.Shift = result;
      })
      .catch(e => {
        this.Shift = {};
        this.error.Shift = " Shift tidak ditemukan ";
      });
    this.Shift = resultShift;
  }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    this.BeamHistoryDocument = this.data.BeamHistoryDocument;

    this.options = context.context.options;
    this.OrderIdFilter = {
      "OrderId": context.context.options.OrderId
    };

    this.readOnly = context.options.readOnly;
  }
}
