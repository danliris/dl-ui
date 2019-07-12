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
  @bindable PIS;

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
    header: "Nomor Beam Warping"
  }, {
    value: "Netto",
    header: "Helai Benang Beam Warping"
  }];

  produceBeamsColumns = [{
    value: "ProduceBeamsDate",
    header: "Tanggal Pasang"
  }, {
    value: "ProduceBeamsTime",
    header: "Waktu Pasang"
  }, {
    value: "ProduceBeamsShift",
    header: "Shift"
  }, {
    value: "ProduceBeamsOperator",
    header: "Operator"
  }, {
  //   value: "ProduceBeamsSizingGroup",
  //   header: "Sizing Grup"
  // }, {
    value: "ProduceBeamsSizingBeamId",
    header: "Beam Sizing"
  }, {
    value: "ProduceBeamsDoffStartCounter",
    header: "Counter Awal"
  }, {
    value: "ProduceBeamsDoffFinishCounter",
    header: "Counter Akhir"
  }, {
    value: "ProduceBeamsNettoWeight",
    header: "Netto"
  }, {
    value: "ProduceBeamsBrutoWeight",
    header: "Bruto"
  }, {
    value: "ProduceBeamsSPU",
    header: "SPU"
  }, {
    value: "ProduceBeamsAction",
    header: "Aksi"
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
      this.Log = this.data.SizingDetails;
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
      this.showHideProduceBeamsMenu = false;
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
      this.showHideProduceBeamsMenu = false;
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
      this.showHideProduceBeamsMenu = false;
      this.showHideDoffMenu = false;
    }
  }

  produceBeams() {
    if (this.showHideProduceBeamsMenu === true) {
      this.showHideProduceBeamsMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = false;
      this.showHideProduceBeamsMenu = true;
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
      this.showHideProduceBeamsMenu = false;
      this.showHideDoffMenu = true;
    }
  }

  get produceBeamsConstructions() {
    return event => {
      this.ProduceBeams.push({});
    };
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
    var ShiftContainer = this.StartShift.Id;
    var OperatorContainer = this.StartOperator.Id;

    this.data = {};
    this.data.Id = IdContainer;
    this.data.SizingDetails = {};
    this.data.SizingDetails.StartDate = HistoryDateContainer;
    this.data.SizingDetails.StartTime = HistoryTimeContainer;
    this.data.SizingDetails.ShiftId = ShiftContainer;
    this.data.SizingDetails.OperatorDocumentId = OperatorContainer;

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
    var LastDetails = this.data.SizingDetails[this.data.SizingDetails.length - 1];
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
    var OperatorContainer = this.PauseOperator.Id;
    var InformationContainer = this.Information;

    this.data = {};
    this.data.Id = IdContainer;
    this.data.SizingDetails = {};
    this.data.SizingDetails.PauseDate = HistoryDateContainer;
    this.data.SizingDetails.PauseTime = HistoryTimeContainer;
    this.data.SizingDetails.Information = InformationContainer;
    this.data.SizingDetails.ShiftId = ShiftContainer;
    this.data.SizingDetails.OperatorDocumentId = OperatorContainer;
    this.data.SizingDetails.Causes = {};
    this.data.SizingDetails.Causes.BrokenBeam = LastCausesBrokenBeam.toString();
    this.data.SizingDetails.Causes.MachineTroubled = LastCausesMachineTroubled.toString();

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
    this.data.SizingDetails = {};
    this.data.SizingDetails.ResumeDate = HistoryDateContainer;
    this.data.SizingDetails.ResumeTime = HistoryTimeContainer;
    this.data.SizingDetails.ShiftId = ShiftContainer;
    this.data.SizingDetails.OperatorDocumentId = OperatorContainer;

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

  PISChanged(newValue) {
    this.service.calculatePIS(newValue).then(result => {
      this.error.PIS = "";
      this.PIS = result;
      this.data.PIS = this.PIS;
    }).catch(e => {
      this.PIS = 0;
      this.error.PIS = " PIS tidak dapat dihitung ";
    })
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
    var SizingBeamIdContainer = this.DoffSizingBeamId.Id;
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
    this.data.SizingBeamDocuments.SizingBeamId = SizingBeamIdContainer;
    this.data.SizingDetails = {};
    this.data.SizingDetails.FinishDate = HistoryDateContainer;
    this.data.SizingDetails.FinishTime = HistoryTimeContainer;
    this.data.SizingDetails.ShiftId = ShiftContainer;

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
