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
var OrderLoader = require("../../../loader/weaving-order-loader");

@inject(Service, Router, BindingEngine)
export class Create {
  @bindable readOnly;
  @bindable BeamOrigin;
  @bindable MachineDocument;
  @bindable OrderDocument;
  @bindable PreparationOperator;
  @bindable PreparationTime;
  @bindable BeamsUsed;

  columns = [{
    value: "BeamOrigin",
    header: "Asal Beam"
  }, {
    value: "LoomMachineNumber",
    header: "No. Mesin Loom"
  }, {
    value: "TyingMachineNumber",
    header: "No. Mesin Tying"
  }, {
    value: "BeamNumber",
    header: "No. Beam (Sizing)"
  }, {
    value: "MachineDate",
    header: "Tanggal"
  }, {
    value: "MachineTime",
    header: "Jam"
  }, {
    value: "Shift",
    header: "Shift"
  }, {
    value: "OperatorTying",
    header: "Operator Tying"
  }, {
    value: "OperatorName",
    header: "Operator"
  }, {
    value: "GroupOperator",
    header: "Grup Loom"
  }, {
    value: "Process",
    header: "Proses"
  }, {
    value: "Information",
    header: "Informasi"
  }];

  constructor(service, router, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;

    this.data = {};
    this.error = {};

    this.showHideBeamsCollection = false;
    this.BeamsUsed = [];
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamsUsedTableOptions = {

  }

  get orders() {
    return OrderLoader;
  }

  MachineDocumentChanged(newValue) {
    if (newValue.MachineType == "Kawa Moto" || newValue.MachineType == "Sucker Muller") {
      this.error.MachineDocumentId = "";
      this.MachineDocument = newValue;
    } else {
      this.error.MachineDocumentId = " Tipe Mesin Bukan Kawa Moto atau Sucker Muller ";
    }
  }

  OrderDocumentChanged(newValue) {
    if (newValue) {
      let order = newValue;

      this.BeamsUsed.splice(0, this.BeamsUsed.length);
      this.beamsUsedTableOptions.OrderId = order.Id;

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

      if (this.ConstructionNumber && this.WeavingUnit && this.WarpOrigin && this.WeftOrigin) {
        this.showHideBeamsCollection = true;
      }
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

  PreparationOperatorChanged(newValue) {
    this.SizingGroup = newValue.Group;
  }

  get addBeamsUsed() {
    return event => {
      this.BeamsUsed.push({});
    };
  }

  saveCallback(event) {
    var preparationData = {};
    preparationData.LoomBeamProducts = [];
    preparationData.LoomBeamHistories = [];
    if (this.OrderDocument) {
      preparationData.OrderDocumentId = this.OrderDocument.Id;
    }

    // this.BeamHistoryDocument = this.BeamsUsed.map((beam) => beam);
    this.BeamsUsed.forEach(doc => {
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
