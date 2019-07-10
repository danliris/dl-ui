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
var ConstructionLoader = require("../../../loader/weaving-constructions-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");
var BeamLoader = require("../../../loader/weaving-beam-loader");
@inject(Service, Router, BindingEngine)
export class Create {
  @bindable readOnly;
  @bindable MachineDocument;
  @bindable WeavingDocument;
  @bindable ConstructionDocument;
  @bindable OperatorDocument;
  @bindable EntryTime;
  @bindable BeamsWarping;

  beamColumns = [{
    value: "BeamNumber",
    header: "Nomor Beam Warping"
  }, {
    value: "EmptyWeight",
    header: "Helai Benang Beam Warping"
  }];

  constructor(service, router, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;

    this.data = {};
    this.data.Details = {};
    this.data.Weight = {};
    this.data.Weight.Netto = "";
    this.BeamsWarping = [];

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

  get constructions() {
    return ConstructionLoader;
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
    this.data.Details.PreparationTime = newValue;
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.Shift = "";
        this.Shift = {};
        this.Shift = result;
        this.data.Details.ShiftId = this.Shift.Id;
      })
      .catch(e => {
        this.Shift = {};
        this.data.Details.ShiftId = this.Shift.Id;
        this.error.Shift = " Shift tidak ditemukan ";
      });
  }

  get addBeamsWarping() {
    return event => {
      this.BeamsWarping.push({});
    };
  }

  beamDetail(data) {
    var beam = {};
    beam.Id = data.Id;
    beam.EmptyWeight = data.EmptyWeight;

    return beam;
  }

  get Netto() {
    let result = 0;

    if (this.BeamsWarping) {
      if (this.BeamsWarping.length > 0) {
        this.data.WarpingBeamsId = [];
        for (let beam of this.BeamsWarping) {
          if (beam.BeamDocument && beam.BeamDocument.EmptyWeight != 0) {
            result += beam.BeamDocument.EmptyWeight;
          }
        }
      }

      this.data.Weight.Netto = result.toString();
    }
    return result;

  }

  saveCallback(event) {
    var PreparationDateContainer = this.data.Details.PreparationDate;
    this.data.Details.PreparationDate = moment(PreparationDateContainer).utcOffset("+07:00").format();

    this.BeamId = this.BeamsWarping.map((beam) => beam.BeamDocument.Id);
    this.BeamId.forEach(id => {
      var BeamId = id;
      this.data.WarpingBeamsId.push(BeamId);
    });

    this.data.NeReal = this.NeReal;
    this.data.SizingBeamId = this.SizingBeamId.Id;
    this.data.MachineDocumentId = this.MachineDocument.Id;
    this.data.WeavingUnitId = this.WeavingUnitDocument.Id;
    this.data.ConstructionDocumentId = this.ConstructionDocument.Id;
    this.data.Details.OperatorDocumentId = this.OperatorDocument.Id;

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
