import {
  inject,
  bindable,
  BindingEngine,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";
import moment from 'moment';
var UnitLoader = require("../../../loader/unit-loader");
var MachineLoader = require("../../../loader/weaving-machine-loader");
// var ConstructionLoader = require("../../../loader/weaving-constructions-loader");
var OrderLoader = require("../../../loader/weaving-order-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");
var BeamLoader = require("../../../loader/weaving-beam-loader");
@inject(Service, Router, BindingEngine)
export class Create {
  @bindable readOnly;
  @bindable MachineDocument;
  @bindable WeavingDocument;
  // @bindable ConstructionDocument;
  @bindable OrderDocument;
  @bindable OperatorDocument;
  @bindable EntryTime;
  @bindable BeamsWarping;

  beamColumns = [{
    value: "BeamNumber",
    header: "Nomor Beam Warping"
  }, {
    value: "YarnStrands",
    header: "Helai Benang Beam Warping"
  }];

  constructor(service, router, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;

    this.data = {};
    this.data.SizingDetails = {};
    this.BeamsWarping = [];
    // this.data.Weight = {};
    // this.data.Weight.Netto = "";

    this.error = {};
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  get machines() {
    return MachineLoader;
  }

  get units() {
    return UnitLoader;
  }

  // get constructions() {
  //   return ConstructionLoader;
  // }

  get orders() {
    return OrderLoader;
  }

  get operators() {
    return OperatorLoader;
  }

  get beams() {
    return BeamLoader;
  }

  OperatorDocumentChanged(newValue) {
    this.SizingGroup = newValue.Group;
  }

  EntryTimeChanged(newValue) {
    this.data.SizingDetails.PreparationTime = newValue;
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.Shift = "";
        this.Shift = {};
        this.Shift = result;
        this.data.SizingDetails.ShiftId = this.Shift.Id;
      })
      .catch(e => {
        this.Shift = {};
        this.data.SizingDetails.ShiftId = this.Shift.Id;
        this.error.Shift = " Shift tidak ditemukan ";
      });
  }

  get addBeamsWarping() {
    return event => {
      this.BeamsWarping.push({});
    };
  }

  // beamDetail(data) {
  //   var beam = {};
  //   beam.Id = data.Id;
  //   beam.YarnStrands = data.YarnStrands;

  //   return beam;
  // }

  get YarnStrands() {
    let result = 0;

    if (this.BeamsWarping) {
      if (this.BeamsWarping.length > 0) {
        this.data.BeamsWarping = [];
        for (let beam of this.BeamsWarping) {
          if (beam.BeamDocument && beam.BeamDocument.YarnStrands != 0) {
            result += beam.BeamDocument.YarnStrands;
          }
        }
      }

      this.data.YarnStrands = result;
    }
    return result;

  }

  saveCallback(event) {
    var PreparationDateContainer = this.data.SizingDetails.PreparationDate;
    this.data.SizingDetails.PreparationDate = moment(PreparationDateContainer).utcOffset("+07:00").format();

    this.data.MachineDocumentId = this.MachineDocument.Id;
    this.data.WeavingUnitId = this.WeavingUnitDocument.Id;
    this.data.OrderDocumentId = this.OrderDocument.Id;
    // this.data.ConstructionDocumentId = this.ConstructionDocument.Id;

    this.BeamDocument = this.BeamsWarping.map((beam) => beam.BeamDocument);
    this.BeamDocument.forEach(doc => {
      var BeamId = doc.Id;
      this.data.BeamsWarping.push(BeamId);
    });

    // this.data.YarnStrands = this.YarnStrands;
    this.data.NeReal = this.NeReal;
    this.data.SizingDetails.OperatorDocumentId = this.OperatorDocument.Id;
    
    this.service
      .create(this.data)
      .then(result => {
        this.router.navigateToRoute('list');
      })
      .catch(e => {
        this.error = e;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
