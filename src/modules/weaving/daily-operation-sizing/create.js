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
  }, {
    value: "EmptyWeight",
    header: "Berat Kosong Beam Warping"
  }];

  constructor(service, router, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;

    this.data = {};
    this.data.SizingDetails = {};
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

  get orders() {
    return OrderLoader;
  }

  get operators() {
    return OperatorLoader;
  }

  get beams() {
    return BeamLoader;
  }

  MachineDocumentChanged(newValue) {
      if (newValue.MachineType == "Kawamoto" || newValue.MachineType == "Sucker Muller") {
        this.error.MachineDocument = "";
        this.MachineDocument = newValue;
      } else {
        this.error.MachineDocument = " Tipe Mesin Bukan Kawamoto atau Sucker Muller ";
      }
  }

  OrderDocumentChanged(newValue) {
    if (newValue) {
      let constructionId = newValue.ConstructionId;
      let weavingUnitId = newValue.WeavingUnit;
      this.service.getConstructionNumberById(constructionId)
        .then(resultConstructionNumber => {
          this.error.ConstructionNumber = "";
          this.ConstructionNumber = resultConstructionNumber;
          return this.service.getUnitById(weavingUnitId);
        })
        .then(resultWeavingUnit => {
          this.error.WeavingUnitDocument = "";
          this.WeavingUnitDocument = resultWeavingUnit.Name;
        })
        .catch(e => {
          this.ConstructionNumber = "";
          this.WeavingUnitDocument = "";

          this.error.ConstructionNumber = " Nomor Konstruksi Tidak Ditemukan ";
          this.error.WeavingUnitDocument = " Unit Weaving Tidak Ditemukan ";
        });
    }
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

  get EmptyWeight() {
    let result = 0;

    if (this.BeamsWarping) {
      if (this.BeamsWarping.length > 0) {
        for (let beam of this.BeamsWarping) {
          if (beam.BeamDocument && beam.BeamDocument.EmptyWeight != 0) {
            result += beam.BeamDocument.EmptyWeight;
          }
        }
      }

      this.data.EmptyWeight = result;
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
