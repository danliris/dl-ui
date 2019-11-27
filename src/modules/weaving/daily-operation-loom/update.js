import {
  inject,
  Lazy,
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
var LoomBeamProductsLoader = require("../../../loader/weaving-loom-beam-products-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable StartTime;
  @bindable StartLoomBeamDocuments;
  @bindable PauseTime;
  @bindable ResumeTime;
  @bindable FinishTime;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};

    this.isStartDisabled = false;
    this.isPauseDisabled = false;
    this.isResumeDisabled = false;
    this.isFinishDisabled = false;

    this.showHideCalculationField = false;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamProductsColumns = [{
    value: "BeamNumber",
    header: "No. Beam"
  }, {
    value: "MachineNumber",
    header: "No. Mesin"
  }, {
    value: "LatestBeamProductDate",
    header: "Tanggal"
  }, {
    value: "LatestBeamProductTime",
    header: "Waktu"
  }, {
    value: "LoomProcess",
    header: "Proses"
  }, {
    value: "BeamProductStatus",
    header: "Status Beam"
  }];

  historiesColumns = [{
      value: "BeamNumber",
      header: "No. Beam"
    },
    {
      value: "OperatorName",
      header: "Operator"
    },
    {
      value: "LoomOperatorGroup",
      header: "Grup"
    },
    {
      value: "DateMachine",
      header: "Tanggal"
    },
    {
      value: "TimeMachine",
      header: "Waktu"
    }, {
      value: "Shift",
      header: "Shift"
    },
    {
      value: "WarpBrokenThreads",
      header: "Putus Lusi"
    },
    {
      value: "WeftBrokenThreads",
      header: "Putus Pakan"
    },
    {
      value: "LenoBrokenThreads",
      header: "Putus Leno"
    },
    {
      value: "Reprocess",
      header: "Reproses Ke"
    },
    {
      value: "Information",
      header: "Informasi"
    },
    {
      value: "MachineStatus",
      header: "Status Mesin"
    }
  ];

  reprocessItems = ["", "Sizing", "Reaching"];

  async activate(params) {
    var Id = params.Id;
    var dataResult;
    // this.data = [{
    //   Id: 1,
    //   OrderProductionNumber: "PCA ORDER 133",
    //   OperationStatus: "ON-PROCESS",
    //   FabricConstructionNumber: "CXK 44RT",
    //   WarpOrigin: "KDKI",
    //   WeavingUnit: "WEAVING 2",
    //   WeftOrigin: "UAE"
    // }];
    // return this.data;
    this.data = await this.service
      .getById(Id)
      .then(result => {
        dataResult = result;
        return this.service.getUnitById(result.WeavingUnitId);
      })
      .then(unit => {
        dataResult.WeavingDocument = unit;
        dataResult.WeavingUnitName = unit.Name;
        return dataResult;
      });

    if (this.data.Id) {
      this.OperationIdFilter = {
        "LoomOperationId": this.data.Id
      };

      this.BeamProducts = this.data.DailyOperationLoomBeamProducts;
      this.Histories = this.data.DailyOperationLoomBeamHistories;

      // if (this.BeamProducts.length === 0) {
      //   this.StartSizingStartCounter = 0;
      // } else {
      //   var lastSizingHistory = this.Histories[0];
      //   if (lastSizingHistory.MachineStatus == "ENTRY") {
      //     this.StartSizingStartCounter = 0;
      //   } else {
      //     var lastSizingBeamProduct = this.BeamProducts[0];
      //     this.StartSizingStartCounter = lastSizingBeamProduct.CounterFinish;
      //   }
      // }

      var lastLoomHistory = this.Histories[0];
      var lastMachineStatusHistory = lastLoomHistory.MachineStatus;
      // switch (lastMachineStatusHistory) {
      //   case "ENTRY":
      //     this.isStartDisabled = false;
      //     this.isPauseDisabled = true;
      //     this.isResumeDisabled = true;
      //     this.isFinishDisabled = true;
      //     break;
      //   case "START":
      //     this.isStartDisabled = true;
      //     this.isPauseDisabled = false;
      //     this.isResumeDisabled = true;
      //     this.isFinishDisabled = true;
      //     break;
      //   case "STOP":
      //     this.isStartDisabled = true;
      //     this.isPauseDisabled = true;
      //     this.isResumeDisabled = false;
      //     this.isFinishDisabled = true;
      //     break;
      //   case "CONTINUE":
      //     this.isStartDisabled = true;
      //     this.isPauseDisabled = false;
      //     this.isResumeDisabled = true;
      //     this.isFinishDisabled = true;
      //     break;
      //   case "COMPLETED":
      //     this.isStartDisabled = false;
      //     this.isPauseDisabled = true;
      //     this.isResumeDisabled = true;
      //     this.isFinishDisabled = false;
      //     break;
      //   case "FINISH":
      //     this.isStartDisabled = true;
      //     this.isPauseDisabled = true;
      //     this.isResumeDisabled = true;
      //     this.isFinishDisabled = true;
      //     break;
      //   default:
      //     this.error.CauseOfStopping = "Penyebab berhenti harus diisi";
      //     break;
      // }

      // this.dataOptions = this.data;
    }
  }

  causes = ["", "Putus Beam", "Mesin Bermasalah"];

  get operators() {
    return OperatorLoader;
  }

  get loomBeamProducts() {
    return LoomBeamProductsLoader;
  }

  start() {
    this.StartDate = undefined;
    this.StartTime = null;
    this.StartShift = undefined;
    this.StartOperator = undefined;
    // this.StartLoomBeamDocuments = undefined;
    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = false;
      this.showHideFinishMenu = false;
    }
  }

  pause() {
    this.PauseDate = undefined;
    this.PauseTime = null;
    this.PauseShift = undefined;
    this.PauseOperator = undefined;
    document.getElementById("warpBrokenThreads").checked = false;
    document.getElementById("weftBrokenThreads").checked = false;
    document.getElementById("lenoBrokenThreads").checked = false;
    this.PauseInformation = undefined;
    if (this.showHidePauseMenu === true) {
      this.showHidePauseMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = true;
      this.showHideResumeMenu = false;
      this.showHideFinishMenu = false;
    }
  }

  resume() {
    this.ResumeDate = undefined;
    this.ResumeTime = null;
    this.ResumeShift = undefined;
    this.ResumeOperator = undefined;
    if (this.showHideResumeMenu === true) {
      this.showHideResumeMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = true;
      this.showHideFinishMenu = false;
    }
  }

  finish() {
    this.FinishFinishDate = undefined;
    this.FinishFinishTime = null;
    this.FinishFinishShift = undefined;
    this.FinishFinishOperator = undefined;
    if (this.showHideFinishMenu === true) {
      this.showHideFinishMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = false;
      this.showHideFinishMenu = true;
    }
  }

  StartTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.StartShift = "";
        this.StartShift = {};
        this.StartShift = result;
      })
      .catch(e => {
        this.StartShift = {};
        this.error.StartShift = " Shift tidak ditemukan ";
      });
  }

  StartLoomBeamDocumentsChanged(newValue) {
    if (newValue.MachineNumber) {
      this.StartMachineNumber = newValue.MachineNumber;
    }
  }

  saveStart() {
    this.error = {};
    var IdContainer = this.data.Id;
    if (this.StartDate) {
      var StartDateContainer = moment(this.StartDate).utcOffset("+07:00").format();
    }
    if (this.StartTime) {
      var StartTimeContainer = this.StartTime;
    }
    if (this.StartShift) {
      var StartShiftIdContainer = this.StartShift.Id;
    }
    if (this.StartOperator) {
      var StartOperatorIdContainer = this.StartOperator.Id;
    }
    if (this.StartLoomBeamDocuments) {
      var StartBeamNumberContainer = this.StartLoomBeamDocuments.BeamNumber;
    }
    if (this.StartMachineNumber) {
      var StartMachineNumberContainer = this.StartMachineNumber;
    }

    var startData = {};
    startData.Id = IdContainer;
    startData.StartBeamNumber = StartBeamNumberContainer;
    startData.StartMachineNumber = StartMachineNumberContainer;
    startData.StartDateMachine = StartDateContainer;
    startData.StartTimeMachine = StartTimeContainer;
    startData.StartShiftDocumentId = StartShiftIdContainer;
    startData.StartOperatorDocumentId = StartOperatorIdContainer;
debugger
    this.service
      .updateStart(startData.Id, startData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
  }

  PauseTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.PauseShift = "";
        this.PauseShift = {};
        this.PauseShift = result;
      })
      .catch(e => {
        this.PauseShift = {};
        this.error.PauseShift = " Shift tidak ditemukan ";
      });
  }

  savePause() {
    this.error = {};
    var IdContainer = this.data.Id;
    if (this.PauseDate) {
      var HistoryDateContainer = moment(this.PauseDate).utcOffset("+07:00").format();
    }

    if (this.PauseTime) {
      var HistoryTimeContainer = this.PauseTime;
    }

    if (this.PauseShift) {
      var ShiftContainer = this.PauseShift.Id;
    }

    if (this.PauseOperator) {
      var OperatorContainer = this.PauseOperator.Id;
    }

    //Cek Validasi Untuk Putus Lusi, Pakan dan Leno

    if (this.data.DailyOperationSizingHistories.length > 0) {
      var LastDetails = this.data.DailyOperationSizingHistories[0];
      var LastCausesBrokenBeam = LastDetails.CausesBrokenBeam;
      var LastCausesMachineTroubled = LastDetails.CausesMachineTroubled;
    }

    //Cek Validasi Untuk Reproses
    if (this.CauseOfStopping) {
      switch (this.CauseOfStopping) {
        case "Putus Beam":
          LastCausesBrokenBeam = LastCausesBrokenBeam + 1;
          break;
        case "Mesin Bermasalah":
          LastCausesMachineTroubled = LastCausesMachineTroubled + 1;
          break;
        default:
          LastCausesBrokenBeam = LastCausesBrokenBeam;
          LastCausesMachineTroubled = LastCausesMachineTroubled;
          break;
      }
    } else {
      this.error.CauseOfStopping = "Penyebab Berhenti Harus Diisi";
    }

    if (this.Information) {
      var InformationContainer = this.Information;
    }

    var updateData = {};
    updateData.Id = IdContainer;
    updateData.PauseDate = HistoryDateContainer;
    updateData.PauseTime = HistoryTimeContainer;
    updateData.PauseShift = ShiftContainer;
    updateData.PauseOperator = OperatorContainer;
    updateData.BrokenBeam = LastCausesBrokenBeam;
    updateData.MachineTroubled = LastCausesMachineTroubled;
    updateData.Information = InformationContainer;

    this.service
      .updatePause(updateData.Id, updateData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        if (this.error.CauseOfStopping) {
          e.CauseOfStopping = this.error.CauseOfStopping;
        }
        this.error = e;
      });
  }

  ResumeTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ResumeShift = "";
        this.ResumeShift = {};
        this.ResumeShift = result;
      })
      .catch(e => {
        this.ResumeShift = {};
        this.error.ResumeShift = " Shift tidak ditemukan ";
      });
  }

  saveResume() {
    var IdContainer = this.data.Id;
    if (this.ResumeDate) {
      var HistoryDateContainer = moment(this.ResumeDate).utcOffset("+07:00").format();
    }
    if (this.ResumeTime) {
      var HistoryTimeContainer = this.ResumeTime;
    }
    if (this.ResumeShift) {
      var ShiftContainer = this.ResumeShift.Id;
    }
    if (this.ResumeOperator) {
      var OperatorContainer = this.ResumeOperator.Id;
    }

    var updateData = {};
    updateData.Id = IdContainer;
    updateData.ResumeDate = HistoryDateContainer;
    updateData.ResumeTime = HistoryTimeContainer;
    updateData.ResumeShift = ShiftContainer;
    updateData.ResumeOperator = OperatorContainer;

    this.service
      .updateResume(updateData.Id, updateData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
  }

  FinishTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.FinishShift = "";
        this.FinishShift = {};
        this.FinishShift = result;
      })
      .catch(e => {
        this.FinishShift = {};
        this.error.FinishShift = " Shift tidak ditemukan ";
      });
  }

  saveFinish() {
    var IdContainer = this.data.Id;
    if (this.FinishDate) {
      var HistoryDateContainer = moment(this.FinishDate).utcOffset("+07:00").format();
    }
    if (this.FinishTime) {
      var HistoryTimeContainer = this.FinishTime;
    }
    if (this.FinishShift) {
      var ShiftContainer = this.FinishShift.Id;
    }
    if (this.FinishOperator) {
      var OperatorContainer = this.FinishOperator.Id;
    }

    var updateData = {};
    updateData.Id = IdContainer;
    updateData.FinishDate = HistoryDateContainer;
    updateData.FinishTime = HistoryTimeContainer;
    updateData.FinishShift = ShiftContainer;
    updateData.FinishOperator = OperatorContainer;

    this.service
      .updateFinish(updateData.Id, updateData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
