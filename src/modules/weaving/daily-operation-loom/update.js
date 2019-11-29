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

      var lastLoomHistory = this.Histories[0];
      var lastMachineStatusHistory = lastLoomHistory.MachineStatus;
      switch (lastMachineStatusHistory) {
        case "ENTRY":
          this.isStartDisabled = false;
          this.isPauseDisabled = true;
          this.isResumeDisabled = true;
          this.isFinishDisabled = true;
          break;
        case "START":
          this.isStartDisabled = true;
          this.isPauseDisabled = false;
          this.isResumeDisabled = true;
          this.isFinishDisabled = false;
          break;
        case "STOP":
          this.isStartDisabled = true;
          this.isPauseDisabled = true;
          this.isResumeDisabled = false;
          this.isFinishDisabled = true;
          break;
        case "CONTINUE":
          this.isStartDisabled = true;
          this.isPauseDisabled = true;
          this.isResumeDisabled = true;
          this.isFinishDisabled = false;
          break;
        case "COMPLETED":
          var isAllBeamProcessed = 0;
          this.BeamProducts.forEach(beamProduct => {
            if (beamProduct.BeamProductStatus == "ON-PROCESS") {
              isAllBeamProcessed++;
            }
          });
          if (isAllBeamProcessed == 0) {
            this.isStartDisabled = true;
            this.isPauseDisabled = true;
            this.isResumeDisabled = true;
            this.isFinishDisabled = true;
          } else {
            this.isStartDisabled = false;
            this.isPauseDisabled = true;
            this.isResumeDisabled = true;
            this.isFinishDisabled = true;
          }
          break;
        default:
          this.isStartDisabled = true;
          this.isPauseDisabled = true;
          this.isResumeDisabled = true;
          this.isFinishDisabled = true;
          break;
      }

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
    // document.getElementById("warpBrokenThreads").checked = false;
    // document.getElementById("weftBrokenThreads").checked = false;
    // document.getElementById("lenoBrokenThreads").checked = false;
    this.WarpBrokenThreads = false;
    this.WeftBrokenThreads = false;
    this.LenoBrokenThreads = false;
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
      var StartBeamIdContainer = this.StartLoomBeamDocuments.Id;
    }
    if (this.StartMachineNumber) {
      var StartMachineNumberContainer = this.StartMachineNumber;
    }

    var startData = {};
    startData.Id = IdContainer;
    startData.StartBeamProductId = StartBeamIdContainer;
    startData.StartBeamNumber = StartBeamNumberContainer;
    startData.StartMachineNumber = StartMachineNumberContainer;
    startData.StartDateMachine = StartDateContainer;
    startData.StartTimeMachine = StartTimeContainer;
    startData.StartShiftDocumentId = StartShiftIdContainer;
    startData.StartOperatorDocumentId = StartOperatorIdContainer;

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

    //Cek Validasi Untuk Putus Lusi, Pakan dan Leno
    if (this.data.DailyOperationLoomBeamHistories.length > 0) {
      var LastHistory = this.data.DailyOperationLoomBeamHistories[0];
      var LastWarpBrokenThreads = LastHistory.WarpBrokenThreads;
      var LastWeftBrokenThreads = LastHistory.WeftBrokenThreads;
      var LastLenoBrokenThreads = LastHistory.LenoBrokenThreads;
    }

    var beamProductBeamId = ""
    this.BeamProducts.forEach(beamProduct => {
      if (beamProduct.BeamNumber == LastHistory.BeamNumber) {
        beamProductBeamId = beamProduct.BeamDocumentId;
      }
    });

    if (this.WarpBrokenThreads === true) {
      LastWarpBrokenThreads = LastWarpBrokenThreads + 1;
    }

    if (this.WeftBrokenThreads === true) {
      LastWeftBrokenThreads = LastWeftBrokenThreads + 1;
    }

    if (this.LenoBrokenThreads === true) {
      LastLenoBrokenThreads = LastLenoBrokenThreads + 1;
    }

    if (this.Reprocess) {
      var ReprocessContainer = this.Reprocess;
    }

    if (this.PauseInformation) {
      var InformationContainer = this.PauseInformation;
    }

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

    var pauseData = {};
    pauseData.Id = IdContainer;
    pauseData.PauseBeamProductBeamId = beamProductBeamId;
    pauseData.PauseBeamNumber = LastHistory.BeamNumber;
    pauseData.PauseMachineNumber = LastHistory.MachineNumber;
    pauseData.WarpBrokenThreads = LastWarpBrokenThreads;
    pauseData.WeftBrokenThreads = LastWeftBrokenThreads;
    pauseData.LenoBrokenThreads = LastLenoBrokenThreads;
    pauseData.ReprocessTo = ReprocessContainer;
    pauseData.Information = InformationContainer;
    pauseData.PauseDateMachine = HistoryDateContainer;
    pauseData.PauseTimeMachine = HistoryTimeContainer;
    pauseData.PauseShiftDocumentId = ShiftContainer;
    pauseData.PauseOperatorDocumentId = OperatorContainer;

    this.service
      .updatePause(pauseData.Id, pauseData)
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

    if (this.data.DailyOperationLoomBeamHistories.length > 0) {
      var LastHistory = this.data.DailyOperationLoomBeamHistories[0];
    }

    var beamProductBeamId = ""
    this.BeamProducts.forEach(beamProduct => {
      if (beamProduct.BeamNumber == LastHistory.BeamNumber) {
        beamProductBeamId = beamProduct.BeamDocumentId;
      }
    });
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

    var resumeData = {};
    resumeData.Id = IdContainer;
    resumeData.ResumeBeamProductBeamId = beamProductBeamId;
    resumeData.ResumeBeamNumber = LastHistory.BeamNumber;
    resumeData.ResumeMachineNumber = LastHistory.MachineNumber;
    resumeData.ResumeDateMachine = HistoryDateContainer;
    resumeData.ResumeTimeMachine = HistoryTimeContainer;
    resumeData.ResumeShiftDocumentId = ShiftContainer;
    resumeData.ResumeOperatorDocumentId = OperatorContainer;

    this.service
      .updateResume(resumeData.Id, resumeData)
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

    if (this.data.DailyOperationLoomBeamHistories.length > 0) {
      var LastHistory = this.data.DailyOperationLoomBeamHistories[0];
    }

    var beamProductBeamId = ""
    this.BeamProducts.forEach(beamProduct => {
      if (beamProduct.BeamNumber == LastHistory.BeamNumber) {
        beamProductBeamId = beamProduct.BeamDocumentId;
      }
    });
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
    updateData.FinishBeamProductBeamId = beamProductBeamId;
    updateData.FinishBeamNumber = LastHistory.BeamNumber;;
    updateData.FinishMachineNumber = LastHistory.MachineNumber;;
    updateData.FinishDateMachine = HistoryDateContainer;
    updateData.FinishTimeMachine = HistoryTimeContainer;
    updateData.FinishShiftDocumentId = ShiftContainer;
    updateData.FinishOperatorDocumentId = OperatorContainer;

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
