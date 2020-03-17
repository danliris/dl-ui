import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Service
} from "../service";
import moment from 'moment';
// var BeamByOrderLoader = require("../../../../loader/weaving-reaching-beam-by-order-loader");
// var MachineLoader = require("../../../../loader/weaving-machine-loader");
// var OperatorLoader = require("../../../../loader/weaving-operator-loader");

@inject(BindingEngine, Service)
export class BeamsUsedPost {
  // @bindable BeamOrigin
  // @bindable BeamDocument
  // @bindable MachineDocument
  // @bindable OperatorDocument
  // @bindable Time

  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
    // this.combReadOnly = true;
  }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;

    if(this.data.PreparationDate){
      var OperationDate = moment(this.data.PreparationDate).format('DD/MM/YYYY');
      this.data.OperationDate = OperationDate;
    }

    // this.BeamDocument = this.data.BeamDocument;
    // this.MachineDocument = this.data.MachineDocument;
    // this.OperatorDocument = this.data.OperatorDocument;
    // this.Time = this.data.Time;

    this.options = context.context.options;
    // this.OrderIdFilter = {
    //   "OrderId": context.context.options.OrderId
    // };

    this.readOnly = context.options.readOnly;
  }

  // onremove(){
  //   console.log(this.data);
  // }

  // beamOrigins = ["", "Reaching", "Tying"];

  // process = ["", "Normal", "Reproses"];

  // get beams() {
  //   return BeamByOrderLoader;
  // }

  // get machines() {
  //   return MachineLoader;
  // }

  // get operators() {
  //   return OperatorLoader;
  // }

  // BeamOriginChanged(newValue){
  //   if(newValue == "")
  // }

  // BeamDocumentChanged(newValue) {
  //   this.data.BeamDocument = newValue;
    
  //   if (newValue.CombNumber || newValue.CombNumber != null || newValue.CombNumber != undefined || newValue.CombNumber != 0) {
  //     this.data.CombNumber = newValue.CombNumber;
  //     this.combReadOnly = true;
  //   } else {
  //     this.combReadOnly = false;
  //   }
  // }

  // MachineDocumentChanged(newValue) {
  //   this.data.MachineDocument = newValue;
  // }

  // OperatorDocumentChanged(newValue) {
  //   this.data.OperatorDocument = newValue;
  // }

  // async TimeChanged(newValue) {
  //   this.data.Shift = {};
  //   this.data.Time = newValue;
  //   var resultShift = await this.service.getShiftByTime(newValue)
  //     .then(result => {
  //       return result;
  //     })
  //     .catch(e => {
  //       this.Shift = {};
  //       this.error.Shift = " Shift tidak ditemukan ";
  //     });
  //   this.data.Shift = resultShift;
  // }
}
