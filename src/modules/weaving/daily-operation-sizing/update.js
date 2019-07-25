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
  @bindable ProduceBeamsTime;
  @bindable ProduceBeamsFinishCounter;
  @bindable ProduceBeamsNetto;

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
    value: "SizingBeamNumber",
    header: "Nomor Beam Sizing"
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
    }, {
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
      this.ProduceBeams = this.data.SizingBeamDocuments;
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

  // get produceBeamsConstructions() {
  //   return event => {
  //     this.ProduceBeams.push({});
  //   };
  // }

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
    var SizingBeamIdContainer = this.StartSizingBeamDocuments.Id;
    var SizingBeamCounterContainer = this.StartSizingBeamCounter;

    this.data = {};
    this.data.Id = IdContainer;
    this.data.SizingDetails = {};
    this.data.SizingDetails.StartDate = HistoryDateContainer;
    this.data.SizingDetails.StartTime = HistoryTimeContainer;
    this.data.SizingDetails.ShiftId = ShiftContainer;
    this.data.SizingDetails.OperatorDocumentId = OperatorContainer;
    this.data.SizingBeamDocuments = {};
    this.data.SizingBeamDocuments.SizingBeamId = SizingBeamIdContainer;
    this.data.SizingBeamDocuments.Counter = {};
    this.data.SizingBeamDocuments.Counter.Start = SizingBeamCounterContainer;

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

          this.data.ProduceBeamsPISMeter = resultPISMeter;
          this.ProduceBeamsPISMeter = resultPISMeter;
          this.ProduceBeamsNetto = 0;
          this.ProduceBeamsNettoTheoritical = 0;
          this.ProduceBeamsSPU = 0;
          return this.service.calculatePISPieces(startCounter, newValue);
        }).then(resultPISPieces => {
          this.error.ProduceBeamsPISPieces = "";

          this.data.ProduceBeamsPISPieces = resultPISPieces;
          this.ProduceBeamsPISPieces = resultPISPieces;
        })
        .catch(e => {
          this.error.ProduceBeamsPISMeter = " Tidak dapat menghitung PIS(m) ";
          this.error.ProduceBeamsPISPieces = " Tidak dapat menghitung PIS(pieces) ";

          this.data.ProduceBeamsPISMeter = 0;
          this.data.ProduceBeamsPISPieces = 0;

          this.ProduceBeamsPISMeter = 0;
          this.ProduceBeamsPISPieces = 0;
        });
    }
  }

  ProduceBeamsNettoChanged(newValue) {
    if (newValue) {
      let dataContainer = this.data;
      let machineType = dataContainer.MachineType;
      let pisMeter;
      let yarnStrands;
      let neReal;
      if (dataContainer.ProduceBeamsPISMeter) {
        pisMeter = dataContainer.ProduceBeamsPISMeter;
      }
      if (dataContainer.YarnStrands) {
        yarnStrands = dataContainer.YarnStrands;
      }
      if (dataContainer.NeReal) {
        neReal = dataContainer.NeReal;
      }
      if (machineType == "Kawamoto") {
        this.service.calculateTheoriticalKawamoto(pisMeter, yarnStrands, neReal)
          .then(resultKawamoto => {
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
        this.service.calculateTheoriticalSuckerMuller(pisMeter, yarnStrands, neReal)
          .then(resultSuckerMuller => {
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
    var FinishCounterContainer = this.ProduceBeamsFinishCounter;
    var PISMeterContainer = this.ProduceBeamsPISMeter;
    var SPUContainer = this.ProduceBeamsSPU;
    var BrutoWeightContainer = this.ProduceBeamsBruto;
    var NettoWeightContainer = this.ProduceBeamsNetto;
    var NettoTheoriticalWeightContainer = this.ProduceBeamsNettoTheoritical;
    var HistoryDateContainer = moment(this.ProduceBeamsDate).utcOffset("+07:00").format();
    var HistoryTimeContainer = this.ProduceBeamsTime;
    var ShiftContainer = this.ProduceBeamsShift.Id;
    var OperatorContainer = this.ProduceBeamsOperator.Id;

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
    var MachineSpeedContainer = this.DoffMachineSpeed;
    var TexSQContainer = this.DoffTexSQ;
    var ViscoContainer = this.DoffVisco;
    var HistoryDateContainer = moment(this.DoffDate).utcOffset("+07:00").format();
    var HistoryTimeContainer = this.DoffTime;
    var ShiftContainer = this.DoffShift.Id;
    var OperatorContainer = this.DoffOperator.Id;

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
