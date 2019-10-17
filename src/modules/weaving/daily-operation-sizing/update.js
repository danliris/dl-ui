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
  @bindable FinishDoffTime;
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

    this.showHideCalculationField = false;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamsWarpingColumns = [{
    value: "WarpingBeamNumber",
    header: "No. Beam Warping"
  }, {
    value: "WarpingBeamConeAmount",
    header: "Helai Benang Beam Warping"
  }];

  beamProductsColumns = [{
    value: "SizingBeamNumber",
    header: "No. Beam Sizing"
  }, {
    value: "BeamProductDate",
    header: "Tanggal"
  }, {
    value: "BeamProductTime",
    header: "Waktu"
  }, {
    value: "CounterFinish",
    header: "Counter Akhir"
  }, {
    value: "PISMeter",
    header: "PIS(m)"
  }, {
    value: "WeightNetto",
    header: "Netto"
  }, {
    value: "WeightBruto",
    header: "Bruto"
  }, {
    value: "SPU",
    header: "SPU"
  }, {
    value: "SizingBeamStatus",
    header: "Status Beam Sizing"
  }];

  historiesColumns = [{
      value: "SizingBeamNumber",
      header: "Nomor Beam Sizing"
    },
    {
      value: "MachineDate",
      header: "Tanggal"
    },
    {
      value: "MachineTime",
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
      value: "CausesBrokenBeam",
      header: "Putus"
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
        return dataResult;
      });

    if (this.data.Id) {
      this.BeamsWarping = this.data.BeamsWarping;
      this.BeamProducts = this.data.DailyOperationSizingBeamProducts;
      this.Histories = this.data.DailyOperationSizingHistories;

      if (this.BeamProducts.length == 0) {
        this.StartSizingStartCounter = 0;
      } else {
        var lastSizingHistory = this.Histories[0];
        if (lastSizingHistory.MachineStatus == "ENTRY") {
          this.StartSizingStartCounter = 0;
        } else {
          var lastSizingBeamProduce = this.BeamProducts[0];
          this.StartSizingStartCounter = lastSizingBeamProduce.FinishCounter;
        }
      }

      var lastSizingHistory = this.Histories[0];
      var lastMachineStatusHistory = lastSizingHistory.MachineStatus;
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
    this.ProduceBeamsTheoritical = null;
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
    this.FinishDoffMachineSpeed = 0;
    this.FinishDoffTexSQ = undefined;
    this.FinishDoffVisco = undefined;
    this.FinishDoffDate = undefined;
    this.FinishDoffTime = null;
    this.FinishDoffShift = undefined;
    this.FinishDoffOperator = undefined;
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
    this.error = {};
    var IdContainer = this.data.Id;
    if (this.StartSizingBeamDocuments) {
      var SizingBeamIdContainer = this.StartSizingBeamDocuments.Id;
    }
    if (this.StartSizingStartCounter) {
      var SizingStartCounterContainer = this.StartSizingStartCounter;
    } else {
      var SizingStartCounterContainer = 0;
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

    var updateData = {};
    updateData.Id = IdContainer;
    updateData.SizingBeamId = SizingBeamIdContainer;
    updateData.CounterStart = SizingStartCounterContainer;
    updateData.StartDate = HistoryDateContainer;
    updateData.StartTime = HistoryTimeContainer;
    updateData.StartShift = ShiftContainer;
    updateData.StartOperator = OperatorContainer;

    this.service
      .updateStart(updateData.Id, updateData)
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
    if (this.data.DailyOperationSizingHistories.length > 0) {
      var LastDetails = this.data.DailyOperationSizingHistories[0];
      var LastCausesBrokenBeam = LastDetails.CausesBrokenBeam;
      var LastCausesMachineTroubled = LastDetails.CausesMachineTroubled;
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
      let sizingBeamProductsContainer = this.data.DailyOperationSizingBeamProducts.find(doc => true);
      let counterStart = sizingBeamProductsContainer.CounterStart;
      this.service.calculatePISMeter(counterStart, newValue)
        .then(resultPISMeter => {
          this.error.ProduceBeamsPISMeter = "";
          this.ProduceBeamsPISMeter = resultPISMeter;
          if (this.ProduceBeamsPISMeter) {
            this.showHideCalculationField = true;
          }
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
            this.error.ProduceBeamsTheoritical = "";
            this.ProduceBeamsTheoritical = resultKawamoto;
            return this.service.calculateSPU(this.ProduceBeamsNetto, this.ProduceBeamsTheoritical);
          }).then(resultSPU => {
            this.error.ProduceBeamsSPU = "";
            this.ProduceBeamsSPU = resultSPU;
          }).catch(e => {
            this.ProduceBeamsTheoritical = 0;
            this.ProduceBeamsSPU = 0;

            this.error.ProduceBeamsTheoritical = " Tidak dapat menghitung Netto Teoritis ";
            this.error.ProduceBeamsSPU = " Tidak dapat menghitung SPU ";
          });
      } else if (machineType == "Sucker Muller") {
        this.service.calculateNetto(emptyWeight, bruto)
          .then(resultNetto => {
            this.error.ProduceBeamsNetto = "";
            this.ProduceBeamsNetto = resultNetto;
            return this.service.calculateTheoriticalSuckerMuller(this.ProduceBeamsPISMeter, yarnStrands, neReal);
          }).then(resultSuckerMuller => {
            this.error.ProduceBeamsTheoritical = "";
            this.ProduceBeamsTheoritical = resultSuckerMuller;
            return this.service.calculateSPU(this.ProduceBeamsNetto, this.ProduceBeamsTheoritical);
          }).then(resultSPU => {
            this.error.ProduceBeamsSPU = "";
            this.ProduceBeamsSPU = resultSPU;
          }).catch(e => {
            this.ProduceBeamsTheoritical = 0;
            this.ProduceBeamsSPU = 0;

            this.error.ProduceBeamsTheoritical = " Tidak dapat menghitung Netto Teoritis ";
            this.error.ProduceBeamsSPU = " Tidak dapat menghitung SPU ";
          });
      }
    }
  }

  saveProduceBeam() {
    var IdContainer = this.data.Id;
    if (this.ProduceBeamsFinishCounter) {
      var CounterFinishContainer = this.ProduceBeamsFinishCounter;
    }

    if (this.ProduceBeamsNetto) {
      var NettoWeightContainer = this.ProduceBeamsNetto;
    }

    if (this.ProduceBeamsBruto) {
      var BrutoWeightContainer = this.ProduceBeamsBruto;
    }

    if (this.ProduceBeamsTheoritical) {
      var NettoTheoriticalWeightContainer = this.ProduceBeamsTheoritical;
    }

    if (this.ProduceBeamsPISMeter) {
      var PISMeterContainer = this.ProduceBeamsPISMeter;
    }

    if (this.ProduceBeamsSPU) {
      var SPUContainer = this.ProduceBeamsSPU;
    }

    if (this.ProduceBeamsOperator) {
      var OperatorContainer = this.ProduceBeamsOperator.Id;
    }

    if (this.ProduceBeamsShift) {
      var ShiftContainer = this.ProduceBeamsShift.Id;
    }

    if (this.ProduceBeamsDate) {
      var HistoryDateContainer = moment(this.ProduceBeamsDate).utcOffset("+07:00").format();
    }

    if (this.ProduceBeamsTime) {
      var HistoryTimeContainer = this.ProduceBeamsTime;
    }

    var updateData = {};
    updateData.Id = IdContainer;
    updateData.CounterFinish = CounterFinishContainer;
    updateData.PISMeter = PISMeterContainer;
    updateData.SPU = SPUContainer;
    updateData.WeightBruto = BrutoWeightContainer;
    updateData.WeightNetto = NettoWeightContainer;
    updateData.WeightTheoritical = NettoTheoriticalWeightContainer;
    updateData.ProduceBeamDate = HistoryDateContainer;
    updateData.ProduceBeamTime = HistoryTimeContainer;
    updateData.ProduceBeamShift = ShiftContainer;
    updateData.ProduceBeamOperator = OperatorContainer;

    this.service
      .updateProduceBeams(updateData.Id, updateData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
  }

  FinishDoffTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.FinishDoffShift = "";
        this.FinishDoffShift = {};
        this.FinishDoffShift = result;
      })
      .catch(e => {
        this.FinishDoffShift = {};
        this.error.FinishDoffShift = " Shift tidak ditemukan ";
      });
  }

  saveDoff() {
    var IdContainer = this.data.Id;
    if (this.FinishDoffMachineSpeed) {
      var MachineSpeedContainer = this.FinishDoffMachineSpeed;
    }
    if (this.FinishDoffTexSQ) {
      var TexSQContainer = this.FinishDoffTexSQ;
    }
    if (this.FinishDoffVisco) {
      var ViscoContainer = this.FinishDoffVisco;
    }
    if (this.FinishDoffDate) {
      var HistoryDateContainer = moment(this.FinishDoffDate).utcOffset("+07:00").format();
    }
    if (this.FinishDoffTime) {
      var HistoryTimeContainer = this.FinishDoffTime;
    }
    if (this.FinishDoffShift) {
      var ShiftContainer = this.FinishDoffShift.Id;
    }
    if (this.FinishDoffOperator) {
      var OperatorContainer = this.FinishDoffOperator.Id;
    }

    var updateData = {};
    updateData.Id = IdContainer;
    updateData.MachineSpeed = MachineSpeedContainer;
    updateData.TexSQ = TexSQContainer;
    updateData.Visco = ViscoContainer;
    updateData.FinishDoffDate = HistoryDateContainer;
    updateData.FinishDoffTime = HistoryTimeContainer;
    updateData.FinishDoffShift = ShiftContainer;
    updateData.FinishDoffOperator = OperatorContainer;
    
    this.service
      .updateFinishDoff(updateData.Id, updateData)
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
