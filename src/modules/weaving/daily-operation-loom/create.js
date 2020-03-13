import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";
import moment from 'moment';
var OrderLoader = require("../../../loader/weaving-order-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");
var MachineLoader = require("../../../loader/weaving-machine-loader");

@inject(Service, Router, BindingEngine)
export class Create {
  @bindable readOnly;
  @bindable OrderDocument;
  @bindable BeamOrigin;
  @bindable TyingMachineNumber;
  @bindable LoomMachineNumber;
  @bindable TyingOperator;
  @bindable LoomOperator;
  @bindable BeamDocument;
  @bindable PreparationTime;
  @bindable LoomBeamsUsed;

  columns = [{
    value: "BeamNumber",
    header: "No. Beam"
  }, {
    value: "TyingMachineNumber",
    header: "No. Mesin Tying"
  }, {
    value: "TyingOperator",
    header: "Operator Tying"
  }, {
    value: "TyingOperatorGroup",
    header: "Grup Tying"
  }, {
    value: "LoomMachineNumber",
    header: "No. Mesin Loom"
  }, {
    value: "LoomOperator",
    header: "Operator Tying"
  }, {
    value: "LoomOperatorGroup",
    header: "Grup Loom"
  }, {
    value: "OperationDate",
    header: "Tanggal"
  }, {
    value: "OperationTime",
    header: "Jam"
  }, {
    value: "Shift",
    header: "Shift"
  }, {
    value: "Process",
    header: "Proses"
  }, {
    header: "Action"
  }];

  beamOrigins = ["REACHING", "TYING"];

  constructor(service, router, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;

    this.data = {};
    this.error = {};

    this.showHideAddBeam = false;
    this.LoomBeamsUsed = [];
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  loomBeamsUsedTableOptions = {

  }

  get orders() {
    return OrderLoader;
  }

  get operators() {
    return OperatorLoader;
  }

  get machines() {
    return MachineLoader;
  }

  OrderDocumentChanged(newValue) {
    if (newValue) {
      let order = newValue;

      this.LoomBeamsUsed.splice(0, this.LoomBeamsUsed.length);
      this.loomBeamsUsedTableOptions.OrderId = order.Id;

      if (newValue.ConstructionNumber) {
        this.error.ConstructionNumber = "";
        this.ConstructionNumber = newValue.ConstructionNumber;
      } else {
        this.ConstructionNumber = "";
        this.error.ConstructionNumber = " Nomor Konstruksi Tidak Ditemukan ";
      }

      if (newValue.Unit) {
        this.error.WeavingUnit = "";
        this.WeavingUnit = newValue.Unit;
      } else {
        this.WeavingUnit = "";
        this.error.WeavingUnitDocument = " Unit Weaving Tidak Ditemukan ";
      }

      if (newValue.WarpOrigin) {
        this.error.WarpOrigin = "";
        this.WarpOrigin = newValue.WarpOrigin;
      } else {
        this.WarpOrigin = "";
        this.error.WarpOrigin = " Asal Lusi Tidak Ditemukan "
      }

      if (newValue.WeftOrigin) {
        this.error.WeftOrigin = "";
        this.WeftOrigin = newValue.WeftOrigin;
      } else {
        this.WeftOrigin = "";
        this.error.WeftOrigin = " Asal Pakan Tidak Ditemukan "
      }
    }
  }

  showBeamMenu() {
    this.TyingMachineNumber = undefined;
    this.TyingOperator = undefined;
    this.LoomMachineNumber = undefined;
    this.LoomOperator = undefined;
    this.PreparationDate = undefined;
    this.PreparationTime = null;
    this.PreparationShift = undefined;
    if (this.showHideAddBeam === true) {
      this.showHideAddBeam = false;
    } else {
      this.showHideAddBeam = true;
    }
  }

  BeamOriginChanged(newValue) {
    if (newValue === "REACHING") {
      this.isTying = true;
    } else {
      this.isTying = false;
    }
  }

  PreparationTimeChanged(newValue) {
    this.PreparationTime = newValue;
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.PreparationShift = "";
        this.PreparationShift = {};
        this.PreparationShift = result;
        this.data.PreparationShift = this.PreparationShift.Id;
      })
      .catch(e => {
        this.PreparationShift = {};
        this.error.PreparationShift = " Shift tidak ditemukan ";
      });
  }

  addBeam() {
    let beamUsed = {};
    // if(this.)
  }

  saveCallback(event) {
    var preparationData = {};
    preparationData.LoomBeamProducts = [];
    preparationData.LoomBeamHistories = [];
    if (this.OrderDocument) {
      preparationData.OrderDocumentId = this.OrderDocument.Id;
    }

    this.LoomBeamsUsed.forEach(doc => {
      debugger
      var BeamHistoryDocument = {};
      var BeamProductDocument = {};

      BeamProductDocument.BeamOrigin = doc.BeamOrigin;
      BeamProductDocument.BeamDocumentId = doc.BeamDocument.ReachingBeamId;
      BeamProductDocument.CombNumber = doc.CombNumber;
      BeamProductDocument.MachineDocumentId = doc.MachineDocument.Id;
      BeamProductDocument.DateBeamProduct = doc.Date;
      BeamProductDocument.TimeBeamProduct = doc.Time;
      BeamProductDocument.LoomProcess = doc.LoomProcess;

      BeamHistoryDocument.BeamNumber = doc.BeamDocument.ReachingBeamNumber;
      BeamHistoryDocument.MachineNumber = doc.MachineDocument.MachineNumber;
      BeamHistoryDocument.OperatorDocumentId = doc.OperatorDocument.Id;
      BeamHistoryDocument.DateMachine = doc.Date;
      BeamHistoryDocument.TimeMachine = doc.Time;
      BeamHistoryDocument.ShiftDocumentId = doc.Shift.Id;
      BeamHistoryDocument.Information = doc.Information;

      preparationData.LoomBeamProducts.push(BeamProductDocument);
      preparationData.LoomBeamHistories.push(BeamHistoryDocument);
    });

    this.service
      .create(preparationData)
      .then(result => {
        this.router.navigateToRoute('list');
      })
      .catch(e => {
        this.error = e;
        if (this.error.LoomBeamProducts || this.error.LoomBeamHistories) {
          this.showHideCollectionError = true;
        }
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
