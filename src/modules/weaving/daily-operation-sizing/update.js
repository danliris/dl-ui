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
var SizingBeamLoader = require("../../../loader/weaving-sizing-beam-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable StartTime;
  @bindable PauseTime;
  @bindable ResumeTime;
  @bindable DoffTime;
  @bindable ProduceBeamsTime;
  @bindable ProduceBeamsFinishCounter;
  @bindable ProduceBeamsBruto;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};

    this.isStartDisabled = false;
    this.isPauseDisabled = false;
    this.isResumeDisabled = false;
    this.isProduceBeamDisabled = false;
    this.isDoffDisabled = false;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamColumns = [{
    value: "BeamNumber",
    header: "No. Beam Warping"
  }, {
    value: "Netto",
    header: "Helai Benang Beam Warping"
  }];

  produceBeamsColumns = [{
    value: "SizingBeamNumber",
    header: "No. Beam Sizing"
  }, {
    value: "ProduceBeamsDate",
    header: "Tanggal"
  }, {
    value: "ProduceBeamsTime",
    header: "Waktu"
  }, {
    value: "FinishCounter",
    header: "Counter Akhir"
  }, {
    value: "PISMeter",
    header: "PIS(m)"
  }, {
    value: "NettoWeight",
    header: "Netto"
  }, {
    value: "BrutoWeight",
    header: "Bruto"
  }, {
    value: "SPU",
    header: "SPU"
  }, {
    value: "SizingBeamStatus",
    header: "Status Beam Sizing"
  }];

  logColumns = [{
      value: "SizingBeamNumber",
      header: "Nomor Beam Sizing"
    },
    {
      value: "MachineDateHistory",
      header: "Tanggal"
    },
    {
      value: "MachineTimeHistory",
      header: "Jam"
    }, {
      value: "ShiftName",
      header: "Shift"
    },
    {
      value: "OperatorName",
      header: "Operator"
    },
    {
      value: "OperatorGroup",
      header: "Grup"
    },
    {
      value: "BrokenBeamCauses",
      header: "Putus"
    },
    {
      value: "InformationHistory",
      header: "Informasi"
    },
    {
      value: "MachineStatusHistory",
      header: "Status Mesin"
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
      this.ProduceBeams = this.data.SizingBeamDocuments;
      this.Log = this.data.SizingDetails;

      if (this.ProduceBeams == []) {
        this.StartSizingStartCounter = 0;
      } else {
        var lastSizingDetail = this.Log[0];
        if (lastSizingDetail.MachineStatusHistory == "ENTRY") {
          this.StartSizingStartCounter = 0;
        } else {
          var lastSizingBeamProduce = this.ProduceBeams[0];
          this.StartSizingStartCounter = lastSizingBeamProduce.FinishCounter;
        }
      }

      var lastSizingDetail = this.Log[0];
      var lastMachineStatusHistory = lastSizingDetail.MachineStatusHistory;
      switch (lastMachineStatusHistory) {
        case "ENTRY":
          this.isStartDisabled = false;
          this.isPauseDisabled = true;
          this.isResumeDisabled = true;
          this.isProduceBeamDisabled = true;
          this.isDoffDisabled = true;
          break;
        case "START":
          this.isStartDisabled = true;
          this.isPauseDisabled = false;
          this.isResumeDisabled = true;
          this.isProduceBeamDisabled = false;
          this.isDoffDisabled = true;
          break;
        case "STOP":
          this.isStartDisabled = true;
          this.isPauseDisabled = true;
          this.isResumeDisabled = false;
          this.isProduceBeamDisabled = true;
          this.isDoffDisabled = true;
          break;
        case "CONTINUE":
          this.isStartDisabled = true;
          this.isPauseDisabled = false;
          this.isResumeDisabled = true;
          this.isProduceBeamDisabled = false;
          this.isDoffDisabled = true;
          break;
        case "COMPLETED":
          this.isStartDisabled = false;
          this.isPauseDisabled = true;
          this.isResumeDisabled = true;
          this.isProduceBeamDisabled = true;
          this.isDoffDisabled = false;
          break;
        case "FINISH":
          this.isStartDisabled = true;
          this.isPauseDisabled = true;
          this.isResumeDisabled = true;
          this.isProduceBeamDisabled = true;
          this.isDoffDisabled = true;
          break;
        default:
          this.error.CauseOfStopping = "Penyebab berhenti harus diisi";
      }
    }
  }

  causes = ["", "Putus Beam", "Mesin Bermasalah"];

  get operators() {
    return OperatorLoader;
  }

  get beams() {
    return SizingBeamLoader;
  }

  start() {
    this.StartDate = undefined;
    this.StartTime = null;
    this.StartShift = undefined;
    this.StartOperator = undefined;
    this.SizingBeamId = undefined;
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
    this.PauseDate = undefined;
    this.PauseTime = null;
    this.PauseShift = undefined;
    this.PauseOperator = undefined;
    this.Information = undefined;
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
      this.showHideProduceBeamsMenu = false;
      this.showHideDoffMenu = false;
    }
  }

  produceBeams() {
    this.ProduceBeamsFinishCounter = null;
    this.ProduceBeamsPISMeter = null;
    this.ProduceBeamsSPU = null;
    this.ProduceBeamsBruto = null;
    this.ProduceBeamsNetto = null;
    this.ProduceBeamsNettoTheoritical = null;
    this.ProduceBeamsDate = undefined;
    this.ProduceBeamsTime = null;
    this.ProduceBeamsShift = undefined;
    this.ProduceBeamsOperator = undefined;
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
    this.MachineSpeed = 0;
    this.DoffTexSQ = undefined;
    this.DoffVisco = undefined;
    this.DoffDate = undefined;
    this.DoffTime = null;
    this.DoffShift = undefined;
    this.DoffOperator = undefined;
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
    if (this.StartSizingBeamDocuments) {
      var SizingBeamIdContainer = this.StartSizingBeamDocuments.Id;
    }
    if (this.StartSizingStartCounter) {
      var SizingStartCounterContainer = this.StartSizingStartCounter;
    }
    if (this.StartDate) {
      var HistoryDateContainer = moment(this.StartDate).utcOffset("+07:00").format();
    }
    if (this.StartTime) {
      var HistoryTimeContainer = this.StartTime;
    }
    if (this.StartShift) {
      var ShiftContainer = this.StartShift.Id;
    }
    if (this.StartOperator) {
      var OperatorContainer = this.StartOperator.Id;
    }

    this.data = {};
    this.data.Id = IdContainer;
    this.data.SizingBeamId = SizingBeamIdContainer;
    this.data.CounterStart = SizingStartCounterContainer;
    this.data.StartDate = HistoryDateContainer;
    this.data.StartTime = HistoryTimeContainer;
    this.data.StartShift = ShiftContainer;
    this.data.StartOperator = OperatorContainer;

    this.service
      .updateStart(this.data.Id, this.data)
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
    if (this.data.SizingDetails.length > 0) {
      var LastDetails = this.data.SizingDetails[0];
      var LastCausesBrokenBeam = parseInt(LastDetails.BrokenBeamCauses);
      var LastCausesMachineTroubled = parseInt(LastDetails.MachineTroubledCauses);
    }

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

    if (this.Information) {
      var InformationContainer = this.Information;
    }

    this.data = {};
    this.data.Id = IdContainer;
    this.data.PauseDate = HistoryDateContainer;
    this.data.PauseTime = HistoryTimeContainer;
    this.data.PauseShift = ShiftContainer;
    this.data.PauseOperator = OperatorContainer;
    this.data.BrokenBeam = LastCausesBrokenBeam.toString();
    this.data.MachineTroubled = LastCausesMachineTroubled.toString();
    this.data.Information = InformationContainer;

    this.service
      .updatePause(this.data.Id, this.data)
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

    this.data = {};
    this.data.Id = IdContainer;
    this.data.SizingDetails = {};
    this.data.SizingDetails.ResumeDate = HistoryDateContainer;
    this.data.SizingDetails.ResumeTime = HistoryTimeContainer;
    this.data.SizingDetails.ShiftId = ShiftContainer;
    this.data.SizingDetails.OperatorDocumentId = OperatorContainer;

    this.service
      .updateResume(this.data.Id, this.data)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
  }

  ProduceBeamsTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ProduceBeamsShift = "";
        this.ProduceBeamsShift = {};
        this.ProduceBeamsShift = result;
      })
      .catch(e => {
        this.ProduceBeamsShift = {};
        this.error.ProduceBeamsShift = " Shift tidak ditemukan ";
      });
  }

  ProduceBeamsFinishCounterChanged(newValue) {
    if (newValue) {
      let sizingBeamDocumentContainer = this.data.SizingBeamDocuments.find(doc => true);
      let startCounter = sizingBeamDocumentContainer.StartCounter;
      this.service.calculatePISMeter(startCounter, newValue)
        .then(resultPISMeter => {
          this.error.ProduceBeamsPISMeter = "";
          this.ProduceBeamsPISMeter = resultPISMeter;
        })
        .catch(e => {
          this.error.ProduceBeamsPISMeter = " Tidak dapat menghitung PIS(m) ";
          this.data.ProduceBeamsPISMeter = 0;
          this.ProduceBeamsPISMeter = 0;
        });
    }
  }

  ProduceBeamsBrutoChanged(newValue) {
    if (newValue) {
      let dataContainer = this.data;
      let emptyWeight;
      let machineType;
      let yarnStrands;
      let neReal;
      let bruto = newValue;
      if (dataContainer.EmptyWeight) {
        emptyWeight = dataContainer.EmptyWeight;
      }
      if (dataContainer.MachineType) {
        machineType = dataContainer.MachineType;
      }
      if (dataContainer.YarnStrands) {
        yarnStrands = dataContainer.YarnStrands;
      }
      if (dataContainer.NeReal) {
        neReal = dataContainer.NeReal;
      }
      if (machineType == "Kawamoto") {
        this.service.calculateNetto(emptyWeight, bruto)
          .then(resultNetto => {
            this.error.ProduceBeamsNetto = "";
            this.ProduceBeamsNetto = resultNetto;
            return this.service.calculateTheoriticalKawamoto(this.ProduceBeamsPISMeter, yarnStrands, neReal);
          }).then(resultKawamoto => {
            this.error.ProduceBeamsNettoTheoritical = "";
            this.ProduceBeamsNettoTheoritical = resultKawamoto;
            return this.service.calculateSPU(this.ProduceBeamsNetto, this.ProduceBeamsNettoTheoritical);
          }).then(resultSPU => {
            this.error.ProduceBeamsSPU = "";
            this.ProduceBeamsSPU = resultSPU;
          }).catch(e => {
            this.ProduceBeamsNettoTheoritical = 0;
            this.ProduceBeamsSPU = 0;

            this.error.ProduceBeamsNettoTheoritical = " Tidak dapat menghitung Netto Teoritis ";
            this.error.ProduceBeamsSPU = " Tidak dapat menghitung SPU ";
          });
      } else if (machineType == "Sucker Muller") {
        this.service.calculateNetto(emptyWeight, bruto)
          .then(resultNetto => {
            this.error.ProduceBeamsNetto = "";
            this.ProduceBeamsNetto = resultNetto;
            return this.service.calculateTheoriticalSuckerMuller(this.ProduceBeamsPISMeter, yarnStrands, neReal);
          }).then(resultSuckerMuller => {
            this.error.ProduceBeamsNettoTheoritical = "";
            this.ProduceBeamsNettoTheoritical = resultSuckerMuller;
            return this.service.calculateSPU(this.ProduceBeamsNetto, this.ProduceBeamsNettoTheoritical);
          }).then(resultSPU => {
            this.error.ProduceBeamsSPU = "";
            this.ProduceBeamsSPU = resultSPU;
          }).catch(e => {
            this.ProduceBeamsNettoTheoritical = 0;
            this.ProduceBeamsSPU = 0;

            this.error.ProduceBeamsNettoTheoritical = " Tidak dapat menghitung Netto Teoritis ";
            this.error.ProduceBeamsSPU = " Tidak dapat menghitung SPU ";
          });
      }
    }
  }

  saveProduceBeam() {
    var IdContainer = this.data.Id;
    if (this.ProduceBeamsFinishCounter) {
      var FinishCounterContainer = this.ProduceBeamsFinishCounter;
    }
    if (this.ProduceBeamsPISMeter) {
      var PISMeterContainer = this.ProduceBeamsPISMeter;
    }
    if (this.ProduceBeamsSPU) {
      var SPUContainer = this.ProduceBeamsSPU;
    }
    if (this.ProduceBeamsBruto) {
      var BrutoWeightContainer = this.ProduceBeamsBruto;
    }
    if (this.ProduceBeamsNetto) {
      var NettoWeightContainer = this.ProduceBeamsNetto;
    }
    if (this.ProduceBeamsNettoTheoritical) {
      var NettoTheoriticalWeightContainer = this.ProduceBeamsNettoTheoritical;
    }
    if (this.ProduceBeamsDate) {
      var HistoryDateContainer = moment(this.ProduceBeamsDate).utcOffset("+07:00").format();
    }
    if (this.ProduceBeamsTime) {
      var HistoryTimeContainer = this.ProduceBeamsTime;
    }
    if (this.ProduceBeamsShift) {
      var ShiftContainer = this.ProduceBeamsShift.Id;
    }
    if (this.ProduceBeamsOperator) {
      var OperatorContainer = this.ProduceBeamsOperator.Id;
    }

    this.data = {};
    this.data.Id = IdContainer;
    this.data.SizingBeamDocuments = {};
    this.data.SizingBeamDocuments.Counter = {};
    this.data.SizingBeamDocuments.FinishCounter = FinishCounterContainer;
    this.data.SizingBeamDocuments.PISMeter = PISMeterContainer;
    this.data.SizingBeamDocuments.SPU = SPUContainer;
    this.data.SizingBeamDocuments.Weight = {};
    this.data.SizingBeamDocuments.Weight.Netto = NettoWeightContainer;
    this.data.SizingBeamDocuments.Weight.Bruto = BrutoWeightContainer;
    this.data.SizingBeamDocuments.Weight.Theoritical = NettoTheoriticalWeightContainer;
    this.data.SizingDetails = {};
    this.data.SizingDetails.ProduceBeamDate = HistoryDateContainer;
    this.data.SizingDetails.ProduceBeamTime = HistoryTimeContainer;
    this.data.SizingDetails.ShiftId = ShiftContainer;
    this.data.SizingDetails.OperatorDocumentId = OperatorContainer;

    this.service
      .updateProduceBeams(this.data.Id, this.data)
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
    if (this.DoffMachineSpeed) {
      var MachineSpeedContainer = this.DoffMachineSpeed;
    }
    if (this.DoffTexSQ) {
      var TexSQContainer = this.DoffTexSQ;
    }
    if (this.DoffVisco) {
      var ViscoContainer = this.DoffVisco;
    }
    if (this.DoffDate) {
      var HistoryDateContainer = moment(this.DoffDate).utcOffset("+07:00").format();
    }
    if (this.DoffTime) {
      var HistoryTimeContainer = this.DoffTime;
    }
    if (this.DoffShift) {
      var ShiftContainer = this.DoffShift.Id;
    }
    if (this.DoffOperator) {
      var OperatorContainer = this.DoffOperator.Id;
    }

    this.data = {};
    this.data.Id = IdContainer;
    this.data.MachineSpeed = MachineSpeedContainer;
    this.data.TexSQ = TexSQContainer;
    this.data.Visco = ViscoContainer;
    this.data.SizingDetails = {};
    this.data.SizingDetails.FinishDate = HistoryDateContainer;
    this.data.SizingDetails.FinishTime = HistoryTimeContainer;
    this.data.SizingDetails.ShiftId = ShiftContainer;
    this.data.SizingDetails.OperatorDocumentId = OperatorContainer;

    this.service
      .updateDoff(this.data.Id, this.data)
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
