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
  @bindable ReachingTyingProcess;

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

  process = ["", "Cucuk", "Sisir"];

  async activate(params) {
    //   var Id = params.Id;
    //   var dataResult;
    //   this.data = await this.service
    //     .getById(Id)
    //     .then(result => {
    //       dataResult = result;
    //       return this.service.getUnitById(result.WeavingUnitDocumentId);
    //     })
    //     .then(unit => {
    //       dataResult.WeavingDocument = unit;
    //       return dataResult;
    //     });
    //   if (this.data.Id) {
    //     this.BeamsWarping = this.data.WarpingBeamsDocument;
    //     this.ProduceBeams = this.data.SizingBeamDocuments;
    //     this.Log = this.data.SizingDetails;
    //   }
    this.data = {
      Id: 1,
      MachineDateHistory: "31/07/2019	",
      MachineTimeHistory: "7:00 AM",
      MachineNumber: "144",
      WeavingUnitDocumentId: "WEAVING 2",
      ConstructionNumber: "PC20  66 77 88 Da Da",
      BeamNumber: "S43"
    };
  }

  ReachingTyingProcessChanged(newValue) {
    if (newValue == "Cucuk") {
      if (this.showHideReachingMenu === true) {
        this.showHideReachingMenu = false;
        if (this.showHideReachingStartMenu === true || this.showHideTyingStartMenu === true) {
          this.showHideReachingStartMenu = false;
          this.showHideTyingStartMenu = false;
        }
        if (this.showHideReachingDoffMenu === true || this.showHideTyingDoffMenu === true) {
          this.showHideReachingDoffMenu = false;
          this.showHideTyingDoffMenu = false;
        }
      } else {
        this.showHideReachingMenu = true;
        this.showHideTyingMenu = false;
        if (this.showHideReachingStartMenu === true || this.showHideTyingStartMenu === true) {
          this.showHideReachingStartMenu = false;
          this.showHideTyingStartMenu = false;
        }
        if (this.showHideReachingDoffMenu === true || this.showHideTyingDoffMenu === true) {
          this.showHideReachingDoffMenu = false;
          this.showHideTyingDoffMenu = false;
        }
      }
    } else if (newValue == "Sisir") {
      if (this.showHideTyingMenu === true) {
        this.showHideTyingMenu = false;
        if (this.showHideReachingStartMenu === true || this.showHideTyingStartMenu === true) {
          this.showHideReachingStartMenu = false;
          this.showHideTyingStartMenu = false;
        }
        if (this.showHideReachingDoffMenu === true || this.showHideTyingDoffMenu === true) {
          this.showHideReachingDoffMenu = false;
          this.showHideTyingDoffMenu = false;
        }
      } else {
        this.showHideTyingMenu = true;
        this.showHideReachingMenu = false;
        if (this.showHideReachingStartMenu === true || this.showHideTyingStartMenu === true) {
          this.showHideReachingStartMenu = false;
          this.showHideTyingStartMenu = false;
        }
        if (this.showHideReachingDoffMenu === true || this.showHideTyingDoffMenu === true) {
          this.showHideReachingDoffMenu = false;
          this.showHideTyingDoffMenu = false;
        }
      }
    } else {
      this.showHideReachingMenu = false;
      this.showHideTyingMenu = false;
    }
  }

  reachingStart() {
    if (this.showHideReachingStartMenu === true) {
      this.showHideReachingStartMenu = false;
    } else {
      this.showHideReachingStartMenu = true;
      this.showHideReachingDoffMenu = false;
    }
  }

  reachingFinish() {
    if (this.showHideReachingDoffMenu === true) {
      this.showHideReachingDoffMenu = false;
    } else {
      this.showHideReachingStartMenu = false;
      this.showHideReachingDoffMenu = true;
    }
  }

  tyingStart() {
    if (this.showHideTyingStartMenu === true) {
      this.showHideTyingStartMenu = false;
    } else {
      this.showHideTyingStartMenu = true;
      this.showHideTyingDoffMenu = false;
    }
  }

  tyingFinish() {
    if (this.showHideTyingDoffMenu === true) {
      this.showHideTyingDoffMenu = false;
    } else {
      this.showHideTyingStartMenu = false;
      this.showHideTyingDoffMenu = true;
    }
  }

  get operators() {
    return OperatorLoader;
  }

  //   StartTimeChanged(newValue) {
  //     this.service.getShiftByTime(newValue)
  //       .then(result => {
  //         this.error.StartShift = "";
  //         this.StartShift = {};
  //         this.StartShift = result;
  //       })
  //       .catch(e => {
  //         this.StartShift = {};
  //         this.error.StartShift = " Shift tidak ditemukan ";
  //       });
  //   }

  //   saveStart() {
  //     var IdContainer = this.data.Id;
  //     var HistoryDateContainer = moment(this.StartDate).utcOffset("+07:00").format();
  //     var HistoryTimeContainer = this.StartTime;
  //     var ShiftContainer = this.StartShift.Id;
  //     var OperatorContainer = this.StartOperator.Id;
  //     var SizingBeamIdContainer = this.StartSizingBeamDocuments.Id;
  //     var SizingBeamCounterContainer = this.StartSizingBeamCounter;

  //     this.data = {};
  //     this.data.Id = IdContainer;
  //     this.data.SizingDetails = {};
  //     this.data.SizingDetails.StartDate = HistoryDateContainer;
  //     this.data.SizingDetails.StartTime = HistoryTimeContainer;
  //     this.data.SizingDetails.ShiftId = ShiftContainer;
  //     this.data.SizingDetails.OperatorDocumentId = OperatorContainer;
  //     this.data.SizingBeamDocuments = {};
  //     this.data.SizingBeamDocuments.SizingBeamId = SizingBeamIdContainer;
  //     this.data.SizingBeamDocuments.Counter = {};
  //     this.data.SizingBeamDocuments.Counter.Start = SizingBeamCounterContainer;

  //     this.service
  //       .updateStart(this.data.Id, this.data)
  //       .then(result => {
  //         location.reload();
  //       })
  //       .catch(e => {
  //         this.error = e;
  //       });
  //   }

  //   DoffTimeChanged(newValue) {
  //     this.service.getShiftByTime(newValue)
  //       .then(result => {
  //         this.error.DoffShift = "";
  //         this.DoffShift = {};
  //         this.DoffShift = result;
  //       })
  //       .catch(e => {
  //         this.DoffShift = {};
  //         this.error.DoffShift = " Shift tidak ditemukan ";
  //       });
  //   }

  //   saveDoff() {
  //     var IdContainer = this.data.Id;
  //     var MachineSpeedContainer = this.DoffMachineSpeed;
  //     var TexSQContainer = this.DoffTexSQ;
  //     var ViscoContainer = this.DoffVisco;
  //     var HistoryDateContainer = moment(this.DoffDate).utcOffset("+07:00").format();
  //     var HistoryTimeContainer = this.DoffTime;
  //     var ShiftContainer = this.DoffShift.Id;
  //     var OperatorContainer = this.DoffOperator.Id;

  //     this.data = {};
  //     this.data.Id = IdContainer;
  //     this.data.MachineSpeed = MachineSpeedContainer;
  //     this.data.TexSQ = TexSQContainer;
  //     this.data.Visco = ViscoContainer;
  //     this.data.SizingDetails = {};
  //     this.data.SizingDetails.FinishDate = HistoryDateContainer;
  //     this.data.SizingDetails.FinishTime = HistoryTimeContainer;
  //     this.data.SizingDetails.ShiftId = ShiftContainer;
  //     this.data.SizingDetails.OperatorDocumentId = OperatorContainer;

  //     this.service
  //       .updateDoff(this.data.Id, this.data)
  //       .then(result => {
  //         location.reload();
  //       })
  //       .catch(e => {
  //         this.error = e;
  //       });
  //   }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
