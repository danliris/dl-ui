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
var ConstructionLoader = require("../../../loader/weaving-constructions-loader");
var BeamLoader = require("../../../loader/weaving-beam-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable StartTime;
  @bindable PauseTime;
  @bindable ResumeTime;
  @bindable DoffTime;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamColumns = [{
    value: "BeamNumber",
    header: "No. Beam"
  }, {
    value: "Netto",
    header: "Helai Benang Beam"
  }];

  logColumns = [{
      value: "ShiftName",
      header: "Shift"
    },
    {
      value: "BrokenBeamCauses",
      header: "Putus"
    },
    {
      value: "MachineDateHistory",
      header: "Tanggal"
    },
    {
      value: "MachineTimeHistory",
      header: "Jam"
    },
    {
      value: "MachineStatusHistory",
      header: "Status"
    },
    {
      value: "InformationHistory",
      header: "Information"
    }
  ];

  async activate(params) {
    var Id = params.Id;
    var dataResult;
    this.data = await this.service
      .getById(Id)
      .then(result => {
        dataResult = result;
        return this.service.getUnitById(result.WeavingUnitDocumentId);
      })
      .then(unit => {
        dataResult.WeavingDocument = unit;
        return dataResult;
      });
    if (this.data.Id) {
      this.BeamsWarping = this.data.WarpingBeamsDocument;
      this.Log = this.data.Details;
    }
  }

  causes = ["", "Putus Beam", "Mesin Bermasalah"];

  get constructions() {
    return ConstructionLoader;
  }

  get operators() {
    return OperatorLoader;
  }

  get beams() {
    return BeamLoader;
  }

  start() {
    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = false;
      this.showHideDoffMenu = false;
    }
  }

  pause() {
    if (this.showHidePauseMenu === true) {
      this.showHidePauseMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = true;
      this.showHideResumeMenu = false;
      this.showHideDoffMenu = false;
    }
  }

  resume() {
    if (this.showHideResumeMenu === true) {
      this.showHideResumeMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = true;
      this.showHideDoffMenu = false;
    }
  }

  finish() {
    if (this.showHideDoffMenu === true) {
      this.showHideDoffMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = false;
      this.showHideDoffMenu = true;
    }
  }

  hideMenu() {
    if (this.showResumeMenu === true || this.showDoffMenu === true || this.showPauseMenu === true) {
      this.showPauseMenu = false;
      this.showResumeMenu = false;
      this.showDoffMenu = false;
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

  saveStart() {
    var IdContainer = this.data.Id;
    var HistoryDateContainer = moment(this.StartDate).utcOffset("+07:00").format();
    var HistoryTimeContainer = this.StartTime;
    var ShiftContainer = this.StartShift;

    this.data = {};
    this.data.Id = IdContainer;
    this.data.Details = {};
    this.data.Details.StartDate = HistoryDateContainer;
    this.data.Details.StartTime = HistoryTimeContainer;
    this.data.Details.ShiftId = ShiftContainer.Id;

    this.service
      .updateStartEntry(this.data.Id, this.data)
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
    var LastDetails = this.data.Details[this.data.Details.length - 1];
    var LastCausesBrokenBeam = parseInt(LastDetails.BrokenBeamCauses);
    var LastCausesMachineTroubled = parseInt(LastDetails.MachineTroubledCauses);

    switch (this.CauseOfStopping) {
      case "Putus Beam":
        LastCausesBrokenBeam = LastCausesBrokenBeam + 1;
        break;
      case "Mesin Bermasalah":
        LastCausesMachineTroubled = LastCausesMachineTroubled + 1;
        break;
      default:
        this.error.CauseOfStopping = "Penyebab berhenti harus diisi";
    }

    var IdContainer = this.data.Id;
    var HistoryDateContainer = moment(this.PauseDate).utcOffset("+07:00").format();
    var HistoryTimeContainer = this.PauseTime;
    var ShiftContainer = this.PauseShift.Id;
    var InformationContainer = this.Information;

    this.data = {};
    this.data.Id = IdContainer;
    this.data.Details = {};
    this.data.Details.PauseDate = HistoryDateContainer;
    this.data.Details.PauseTime = HistoryTimeContainer;
    this.data.Details.Information = InformationContainer;
    this.data.Details.ShiftId = ShiftContainer;
    this.data.Details.Causes = {};
    this.data.Details.Causes.BrokenBeam = LastCausesBrokenBeam.toString();
    this.data.Details.Causes.MachineTroubled = LastCausesMachineTroubled.toString();

    this.service
      .updatePauseEntry(this.data.Id, this.data)
      .then(result => {
        location.reload();
      })
      .catch(e => {
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
    var HistoryDateContainer = moment(this.ResumeDate).utcOffset("+07:00").format();
    var HistoryTimeContainer = this.ResumeTime;
    var ShiftContainer = this.ResumeShift.Id;
    var OperatorContainer = this.ResumeOperator.Id;

    this.data = {};
    this.data.Id = IdContainer;
    this.data.Details = {};
    this.data.Details.ResumeDate = HistoryDateContainer;
    this.data.Details.ResumeTime = HistoryTimeContainer;
    this.data.Details.ShiftId = ShiftContainer;
    this.data.Details.OperatorDocumentId = OperatorContainer;

    this.service
      .updateResumeEntry(this.data.Id, this.data)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
  }

  DoffTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.DoffShift = "";
        this.DoffShift = {};
        this.DoffShift = result;
      })
      .catch(e => {
        this.DoffShift = {};
        this.error.DoffShift = " Shift tidak ditemukan ";
      });
  }

  saveDoff() {
    var IdContainer = this.data.Id;
    var FinishCounterContainer = this.DoffFinishCounter;
    var BrutoWeightContainer = this.DoffBrutoWeight;
    var MachineSpeedContainer = this.DoffMachineSpeed;
    var TexSQContainer = this.DoffTexSQ;
    var ViscoContainer = this.DoffVisco;
    var PISContainer = this.DoffPIS;
    var SPUContainer = this.DoffSPU;
    var SizingBeamIdContainer = this.SizingBeamDocumentId.Id;
    var HistoryDateContainer = moment(this.DoffDate).utcOffset("+07:00").format();
    var HistoryTimeContainer = this.DoffTime;
    var ShiftContainer = this.DoffShift.Id;

    this.data = {};
    this.data.Id = IdContainer;
    this.data.Counter = {};
    this.data.Counter.Finish = FinishCounterContainer;
    this.data.Weight = {};
    this.data.Weight.Bruto = BrutoWeightContainer;
    this.data.MachineSpeed = MachineSpeedContainer;
    this.data.TexSQ = TexSQContainer;
    this.data.Visco = ViscoContainer;
    this.data.PIS = PISContainer;
    this.data.SPU = SPUContainer;
    this.data.SizingBeamDocumentId = SizingBeamIdContainer;
    this.data.Details = {};
    this.data.Details.FinishDate = HistoryDateContainer;
    this.data.Details.FinishTime = HistoryTimeContainer;
    this.data.Details.ShiftId = ShiftContainer;

    this.service
      .updateDoffEntry(this.data.Id, this.data)
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
