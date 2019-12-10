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
  @bindable MachineDocument;
  @bindable OrderDocument;
  @bindable PreparationOperator;
  @bindable PreparationTime;
  @bindable BeamsSizing;

  beamsSizingColumns = [{
      value: "BeamNumber",
      header: "Nomor Beam Sizing"
    }, {
      value: "MachineNumber",
      header: "No. Mesin"
    }, {
      value: "OperatorName",
      header: "Operator"
    }, {
      value: "LoomGroupOperator",
      header: "Grup Loom"
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
      value: "Process",
      header: "Proses"
    }, {
      value: "Information",
      header: "Informasi"
    }
    // {
    //   value: "MachineStatus",
    //   header: "Status"
    // }
  ];

  constructor(service, router, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;

    this.showHideBeamsCollection = false;

    this.data = {};
    this.error = {};

    this.BeamsSizing = [];
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamsSizingTableOptions = {

  }

  get orders() {
    return OrderLoader;
  }

  MachineDocumentChanged(newValue) {
    if (newValue.MachineType == "Kawamoto" || newValue.MachineType == "Sucker Muller") {
      this.error.MachineDocumentId = "";
      this.MachineDocument = newValue;
    } else {
      this.error.MachineDocumentId = " Tipe Mesin Bukan Kawamoto atau Sucker Muller ";
    }
  }

  OrderDocumentChanged(newValue) {
    if (newValue) {
      let order = newValue;
      let constructionId = newValue.ConstructionId;
      let weavingUnitId = newValue.WeavingUnit;
      let warpOriginId = newValue.WarpOrigin;
      let weftOriginId = newValue.WeftOrigin;
      this.service.getConstructionNumberById(constructionId)
        .then(resultConstructionNumber => {
          this.error.ConstructionNumber = "";
          this.ConstructionNumber = resultConstructionNumber;
          return this.service.getUnitById(weavingUnitId);
        })
        .then(resultWeavingUnit => {
          this.error.WeavingUnit = "";
          this.WeavingUnit = resultWeavingUnit.Name;
          return this.service.getSupplierById(warpOriginId);
        })
        .then(resultWarpOrigin => {
          this.error.WarpOrigin = "";
          this.WarpOrigin = resultWarpOrigin;
          return this.service.getSupplierById(weftOriginId);
        }).then(resultWeftOrigin => {
          this.error.WeftOrigin = "";
          this.WeftOrigin = resultWeftOrigin;

          this.beamsSizingTableOptions.OrderId = order.Id;

          if (resultWeftOrigin) {
            this.showHideBeamsCollection = true;
          }
        })
        .catch(e => {
          this.ConstructionNumber = "";
          this.WeavingUnit = "";
          this.WarpOrigin = "";
          this.WeftOrigin = "";

          this.error.ConstructionNumber = " Nomor Konstruksi Tidak Ditemukan ";
          this.error.WeavingUnit = " Unit Weaving Tidak Ditemukan ";
          this.error.WarpOrigin = "Asal Lusi Tidak Ditemukan";
          this.error.WeftOrigin = "Asal Pakan Tidak Ditemukan";
        });
    }
  }

  PreparationOperatorChanged(newValue) {
    this.SizingGroup = newValue.Group;
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

  get addBeamsSizing() {
    return event => {
      this.BeamsSizing.push({});
    };
  }

  saveCallback(event) {
    var preparationData = {};
    preparationData.LoomBeamProducts = [];
    preparationData.LoomBeamHistories = [];
    if (this.OrderDocument) {
      preparationData.OrderDocumentId = this.OrderDocument.Id;
    }

    // this.BeamHistoryDocument = this.BeamsSizing.map((beam) => beam);
    this.BeamsSizing.forEach(doc => {
      var BeamHistoryDocument = {};
      var BeamProductDocument = {};
      
      BeamProductDocument.BeamDocumentId = doc.BeamDocument.Id;
      BeamProductDocument.MachineDocumentId = doc.MachineDocument.Id;
      BeamProductDocument.DateBeamProduct = doc.Date;
      BeamProductDocument.TimeBeamProduct = doc.Time;
      BeamProductDocument.LoomProcess = doc.LoomProcess;

      BeamHistoryDocument.BeamNumber = doc.BeamDocument.Number;
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
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
