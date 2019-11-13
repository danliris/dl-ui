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
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable ReachingInCombProcess;
  @bindable ReachingInStartTime;
  @bindable ChangeOperatorReachingInTime;
  @bindable ReachingInFinishTime;
  @bindable CombStartTime;
  @bindable CombFinishTime;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};
    this.error = {};

    this.isReachingInStartDisabled = false;
    this.isReachingInChangeOperatorDisabled = false;
    this.isReachingInFinishDisabled = false;
    this.isCombStartDisabled = false;
    this.isCombFinishDisabled = false;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  logColumns = [{
      value: "MachineDate",
      header: "Tanggal"
    }, {
      value: "MachineTime",
      header: "Jam"
    },
    {
      value: "ShiftName",
      header: "Shift"
    },
    {
      value: "OperatorName",
      header: "Operator"
    },
    {
      value: "YarnStrandsProcessed",
      header: "Helai Dikerjakan"
    },
    {
      value: "MachineStatus",
      header: "Status"
    }
  ];

  process = ["", "Cucuk", "Sisir"];

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
      this.Log = this.data.ReachingHistories;

      var lastReachingHistory = this.Log[0];
      var lastReachingHistoryMachineStatus = lastReachingHistory.MachineStatus;
      switch (lastReachingHistoryMachineStatus) {
        case "ENTRY":
          this.isReachingInStartDisabled = false;
          this.isReachingInChangeOperatorDisabled = true;
          this.isReachingInFinishDisabled = true;
          this.isCombStartDisabled = true;
          this.isCombFinishDisabled = true;
          break;
        case "REACHING-IN-START":
          this.isReachingInStartDisabled = true;
          this.isReachingInChangeOperatorDisabled = false;
          this.isReachingInFinishDisabled = false;
          this.isCombStartDisabled = true;
          this.isCombFinishDisabled = true;
          break;
        case "REACHING-IN-CHANGE-OPERATOR":
          this.isReachingInStartDisabled = true;
          this.isReachingInChangeOperatorDisabled = false;
          this.isReachingInFinishDisabled = false;
          this.isCombStartDisabled = true;
          this.isCombFinishDisabled = true;
          break;
        case "REACHING-IN-FINISH":
          this.isReachingInStartDisabled = true;
          this.isReachingInChangeOperatorDisabled = true;
          this.isReachingInFinishDisabled = true;
          this.isCombStartDisabled = false;
          this.isCombFinishDisabled = true;
          break;
        case "COMB-START":
          this.isReachingInStartDisabled = true;
          this.isReachingInChangeOperatorDisabled = true;
          this.isReachingInFinishDisabled = true;
          this.isCombStartDisabled = true;
          this.isCombFinishDisabled = false;
          break;
        case "COMB-FINISH":
          this.isReachingInStartDisabled = true;
          this.isReachingInChangeOperatorDisabled = true;
          this.isReachingInFinishDisabled = true;
          this.isCombStartDisabled = true;
          this.isCombFinishDisabled = true;
          break;
        default:
          this.isReachingInStartDisabled = false;
          this.isReachingInChangeOperatorDisabled = false;
          this.isReachingInFinishDisabled = false;
          this.isCombStartDisabled = false;
          this.isCombFinishDisabled = false;
          break;
      }
    }
  }

  ReachingInCombProcessChanged(newValue) {
    if (newValue == "Cucuk") {
      this.showHideReachingInMenu = true;
      this.showHideCombMenu = false;
      if (this.showHideReachingInMenu === true) {
        if (this.showHideReachingInStartMenu === true) {
          this.showHideReachingInChangeOperatorMenu = false;
          this.showHideReachingInFinishMenu = false;

          this.ReachingInStartDate = undefined;
          this.ReachingInStartTime = null;
          this.ReachingInStartShift = undefined;
          this.ReachingInStartOperator = undefined;
          this.ReachingInStartYarnStrandsProcessed = undefined;
          this.ReachingInStartTypeInput = undefined;
          this.ReachingInStartTypeOutput = undefined;
        }
        if (this.showHideReachingInChangeOperatorMenu === true) {
          this.showHideReachingInStartMenu = false;
          this.showHideReachingInFinishMenu = false;

          this.ChangeOperatorReachingInDate = undefined;
          this.ChangeOperatorReachingInTime = null;
          this.ChangeOperatorReachingInShift = undefined;
          this.ChangeOperatorReachingInOperator = undefined;
          this.ChangeOperatorReachingInYarnStrandsProcessed = undefined;
        }
        if (this.showHideReachingInFinishMenu === true) {
          this.showHideReachingInStartMenu = false;
          this.showHideReachingInChangeOperatorMenu = false;

          this.ReachingInFinishDate = undefined;
          this.ReachingInFinishTime = null;
          this.ReachingInFinishShift = undefined;
          this.ReachingInFinishOperator = undefined;
          this.ReachingInFinishYarnStrandsProcessed = undefined;
          this.ReachingInFinishWidth = undefined;
        } else {
          this.showHideReachingInStartMenu = false;
          this.showHideReachingInChangeOperatorMenu = false;
          this.showHideReachingInFinishMenu = false;
        }
      }
    } else if (newValue == "Sisir") {
      this.showHideReachingInMenu = false;
      this.showHideCombMenu = true;
      if (this.showHideCombMenu === true) {
        if (this.showHideCombStartMenu === true) {
          this.showHideCombFinishMenu = false;

          this.CombStartDate = undefined;
          this.CombStartTime = null;
          this.CombStartShift = undefined;
          this.CombStartOperator = undefined;
          this.CombStartYarnStrandsProcessed = undefined;
          this.CombStartEdgeStitching = undefined;
          this.CombStartNumber = undefined;
        }
        if (this.showHideCombFinishMenu === true) {
          this.showHideCombStartMenu = false;

          this.CombFinishDate = undefined;
          this.CombFinishTime = null;
          this.CombFinishShift = undefined;
          this.CombFinishOperator = undefined;
          this.CombFinishYarnStrandsProcessed = undefined;
          this.CombFinishWidth = undefined;
        } else {
          this.showHideCombStartMenu = false;
          this.showHideCombFinishMenu = false;
        }
      }
    } else {
      this.showHideReachingInMenu = false;
      this.showHideCombMenu = false;
    }
  }

  reachingInStart() {
    this.error = {};
    this.ReachingInStartDate = undefined;
    this.ReachingInStartTime = null;
    this.ReachingInStartShift = undefined;
    this.ReachingInStartOperator = undefined;
    this.ReachingInStartYarnStrandsProcessed = undefined;
    this.ReachingInStartTypeInput = undefined;
    this.ReachingInStartTypeOutput = undefined;
    if (this.showHideReachingInStartMenu === true) {
      this.showHideReachingInStartMenu = false;
    } else {
      this.showHideReachingInStartMenu = true;
      this.showHideReachingInChangeOperatorMenu = false;
      this.showHideReachingInFinishMenu = false;
    }
  }

  reachingInChangeOperator() {
    this.error = {};
    this.ChangeOperatorReachingInDate = undefined;
    this.ChangeOperatorReachingInTime = null;
    this.ChangeOperatorReachingInShift = undefined;
    this.ChangeOperatorReachingInOperator = undefined;
    this.ChangeOperatorReachingInYarnStrandsProcessed = undefined;
    if (this.showHideReachingInChangeOperatorMenu === true) {
      this.showHideReachingInChangeOperatorMenu = false;
    } else {
      this.showHideReachingInStartMenu = false;
      this.showHideReachingInChangeOperatorMenu = true;
      this.showHideReachingInFinishMenu = false;
    }
  }

  reachingInFinish() {
    this.error = {};
    this.ReachingInFinishDate = undefined;
    this.ReachingInFinishTime = null;
    this.ReachingInFinishShift = undefined;
    this.ReachingInFinishOperator = undefined;
    this.ReachingInFinishYarnStrandsProcessed = undefined;
    this.ReachingInFinishWidth = undefined;
    if (this.showHideReachingInFinishMenu === true) {
      this.showHideReachingInFinishMenu = false;
    } else {
      this.showHideReachingInStartMenu = false;
      this.showHideReachingInChangeOperatorMenu = false;
      this.showHideReachingInFinishMenu = true;
    }
  }

  combStart() {
    this.error = {};
    this.CombStartDate = undefined;
    this.CombStartTime = null;
    this.CombStartShift = undefined;
    this.CombStartOperator = undefined;
    this.CombStartYarnStrandsProcessed = undefined;
    this.CombStartEdgeStitching = undefined;
    this.CombStartNumber = undefined;
    if (this.showHideCombStartMenu === true) {
      this.showHideCombStartMenu = false;
    } else {
      this.showHideCombStartMenu = true;
      this.showHideCombFinishMenu = false;
    }
  }

  combFinish() {
    this.error = {};
    this.ReachingInFinishDate = undefined;
    this.ReachingInFinishTime = null;
    this.ReachingInFinishShift = undefined;
    this.ReachingInFinishOperator = undefined;
    this.ReachingInFinishYarnStrandsProcessed = undefined;
    this.ReachingInFinishWidth = undefined;
    if (this.showHideCombFinishMenu === true) {
      this.showHideCombFinishMenu = false;
    } else {
      this.showHideCombStartMenu = false;
      this.showHideCombFinishMenu = true;
    }
  }

  get operators() {
    return OperatorLoader;
  }

  ReachingInStartTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ReachingInStartShift = "";
        this.ReachingInStartShift = {};
        this.ReachingInStartShift = result;
      })
      .catch(e => {
        this.ReachingInStartShift = {};
        this.error.ReachingInStartShift = " Shift tidak ditemukan ";
      });
  }

  ChangeOperatorReachingInTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ChangeOperatorReachingInShift = "";
        this.ChangeOperatorReachingInShift = {};
        this.ChangeOperatorReachingInShift = result;
      })
      .catch(e => {
        this.ChangeOperatorReachingInShift = {};
        this.error.ChangeOperatorReachingInShift = " Shift tidak ditemukan ";
      });
  }

  ReachingInFinishTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ReachingInFinishShift = "";
        this.ReachingInFinishShift = {};
        this.ReachingInFinishShift = result;
      })
      .catch(e => {
        this.ReachingInFinishShift = {};
        this.error.ReachingInFinishShift = " Shift tidak ditemukan ";
      });
  }

  CombStartTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.CombStartShift = "";
        this.CombStartShift = {};
        this.CombStartShift = result;
      })
      .catch(e => {
        this.CombStartShift = {};
        this.error.CombStartShift = " Shift tidak ditemukan ";
      });
  }

  CombFinishTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.CombFinishShift = "";
        this.CombFinishShift = {};
        this.CombFinishShift = result;
      })
      .catch(e => {
        this.CombFinishShift = {};
        this.error.CombFinishShift = " Shift tidak ditemukan ";
      });
  }

  saveReachingInStart() {
    var reachingInYarnStrandsProcessedProcessed = 0;
    var combYarnStrandsProcessedProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessedProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessedProcessed += history.YarnStrandsProcessed;
      }
    });
    // var sumOfYarnStrandsProcessedHistory = this.Log.reduce((previousObject, currentObject) => previousObject + currentObject.YarnStrandsProcessed, 0);
    // var sumOfYarnStrandsProcessed = sumOfYarnStrandsProcessedHistory + this.ReachingInStartYarnStrandsProcessed;

    if (reachingInYarnStrandsProcessedProcessed <= this.data.SizingYarnStrands) {
      var IdContainer = this.data.Id;
      if (this.ReachingInStartTypeInput) {
        var ReachingInTypeInputContainer = this.ReachingInStartTypeInput;
      }
      if (this.ReachingInStartTypeOutput) {
        var ReachingInTypeOutputContainer = this.ReachingInStartTypeOutput;
      }
      if (this.ReachingInStartOperator) {
        var OperatorContainer = this.ReachingInStartOperator.Id;
      }
      if (this.ReachingInStartYarnStrandsProcessed) {
        var YarnStrandsProcessedContainer = this.ReachingInStartYarnStrandsProcessed;
      }
      if (this.ReachingInStartDate) {
        var DateContainer = moment(this.ReachingInStartDate).utcOffset("+07:00").format();
      }
      if (this.ReachingInStartTime) {
        var TimeContainer = this.ReachingInStartTime;
      }
      if (this.ReachingInStartShift) {
        var ShiftContainer = this.ReachingInStartShift.Id;
      }

      var reachingInStartData = {};
      reachingInStartData.Id = IdContainer;
      reachingInStartData.ReachingInTypeInput = ReachingInTypeInputContainer;
      reachingInStartData.ReachingInTypeOutput = ReachingInTypeOutputContainer;
      reachingInStartData.OperatorDocumentId = OperatorContainer;
      reachingInStartData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
      reachingInStartData.ReachingInStartDate = DateContainer;
      reachingInStartData.ReachingInStartTime = TimeContainer;
      reachingInStartData.ShiftDocumentId = ShiftContainer;

      this.service
        .updateReachingInStart(reachingInStartData.Id, reachingInStartData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else {
      this.error.ReachingInStartYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  saveReachingInChangeOperator() {
    var reachingInYarnStrandsProcessedProcessed = 0;
    var combYarnStrandsProcessedProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessedProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessedProcessed += history.YarnStrandsProcessed;
      }
    });
    // var sumOfYarnStrandsProcessedHistory = this.Log.reduce((previousObject, currentObject) => previousObject + currentObject.YarnStrandsProcessed, 0);
    // var sumOfYarnStrandsProcessed = sumOfYarnStrandsProcessedHistory + this.ChangeOperatorReachingInYarnStrandsProcessed;

    if (reachingInYarnStrandsProcessedProcessed <= this.data.SizingYarnStrands) {
      var IdContainer = this.data.Id;
      if (this.ChangeOperatorReachingInOperator) {
        var OperatorContainer = this.ChangeOperatorReachingInOperator.Id;
      }
      if (this.ChangeOperatorReachingInYarnStrandsProcessed) {
        var YarnStrandsProcessedContainer = this.ChangeOperatorReachingInYarnStrandsProcessed;
      }
      if (this.ChangeOperatorReachingInDate) {
        var DateContainer = moment(this.ChangeOperatorReachingInDate).utcOffset("+07:00").format();
      }
      if (this.ChangeOperatorReachingInTime) {
        var TimeContainer = this.ChangeOperatorReachingInTime;
      }
      if (this.ChangeOperatorReachingInShift) {
        var ShiftContainer = this.ChangeOperatorReachingInShift.Id;
      }

      var ChangeOperatorReachingInData = {};
      ChangeOperatorReachingInData.Id = IdContainer;
      ChangeOperatorReachingInData.OperatorDocumentId = OperatorContainer;
      ChangeOperatorReachingInData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
      ChangeOperatorReachingInData.ChangeOperatorReachingInDate = DateContainer;
      ChangeOperatorReachingInData.ChangeOperatorReachingInTime = TimeContainer;
      ChangeOperatorReachingInData.ShiftDocumentId = ShiftContainer;

      this.service
        .updateReachingInChangeOperator(ChangeOperatorReachingInData.Id, ChangeOperatorReachingInData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else {
      this.error.ChangeOperatorReachingInYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  saveReachingInFinish() {
    var reachingInYarnStrandsProcessedProcessed = 0;
    var combYarnStrandsProcessedProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessedProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessedProcessed += history.YarnStrandsProcessed;
      }
    });
    // var sumOfYarnStrandsProcessedHistory = this.Log.reduce((previousObject, currentObject) => previousObject + currentObject.YarnStrandsProcessed, 0);
    // var sumOfYarnStrandsProcessed = sumOfYarnStrandsProcessedHistory + this.ReachingInFinishYarnStrandsProcessed;

    if (reachingInYarnStrandsProcessedProcessed <= this.data.SizingYarnStrands) {
      var IdContainer = this.data.Id;
      if (this.ReachingInFinishWidth) {
        var ReachingWidthContainer = this.ReachingInFinishWidth;
      }
      if (this.ReachingInFinishOperator) {
        var OperatorContainer = this.ReachingInFinishOperator.Id;
      }
      if (this.ReachingInFinishYarnStrandsProcessed) {
        var YarnStrandsProcessedContainer = this.ReachingInFinishYarnStrandsProcessed;
      }
      if (this.ReachingInFinishDate) {
        var DateContainer = moment(this.ReachingInFinishDate).utcOffset("+07:00").format();
      }
      if (this.ReachingInFinishTime) {
        var TimeContainer = this.ReachingInFinishTime;
      }
      if (this.ReachingInFinishShift) {
        var ShiftContainer = this.ReachingInFinishShift.Id;
      }

      var reachingInFinishData = {};
      reachingInFinishData.Id = IdContainer;
      reachingInFinishData.ReachingInWidth = ReachingWidthContainer;
      reachingInFinishData.OperatorDocumentId = OperatorContainer;
      reachingInFinishData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
      reachingInFinishData.ReachingInFinishDate = DateContainer;
      reachingInFinishData.ReachingInFinishTime = TimeContainer;
      reachingInFinishData.ShiftDocumentId = ShiftContainer;

      this.service
        .updateReachingInFinish(reachingInFinishData.Id, reachingInFinishData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else {
      this.error.ReachingInFinishYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  saveCombStart() {
    var reachingInYarnStrandsProcessedProcessed = 0;
    var combYarnStrandsProcessedProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessedProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessedProcessed += history.YarnStrandsProcessed;
      }
    });
    // var sumOfYarnStrandsProcessedHistory = this.Log.reduce((previousObject, currentObject) => previousObject + currentObject.YarnStrandsProcessed, 0);
    // var sumOfYarnStrandsProcessed = sumOfYarnStrandsProcessedHistory + this.CombStartYarnStrandsProcessed;
    
    if (combYarnStrandsProcessedProcessed <= reachingInYarnStrandsProcessedProcessed) {
      var IdContainer = this.data.Id;
      if (this.CombStartEdgeStitching) {
        var CombEdgeStitchingContainer = this.CombStartEdgeStitching;
      }
      if (this.CombStartNumber) {
        var CombNumberContainer = this.CombStartNumber;
      }
      if (this.CombStartOperator) {
        var OperatorContainer = this.CombStartOperator.Id;
      }
      if (this.CombStartYarnStrandsProcessed) {
        var YarnStrandsProcessedContainer = this.CombStartYarnStrandsProcessed;
      }
      if (this.CombStartDate) {
        var DateContainer = moment(this.CombStartDate).utcOffset("+07:00").format();
      }
      if (this.CombStartTime) {
        var TimeContainer = this.CombStartTime;
      }
      if (this.CombStartShift) {
        var ShiftContainer = this.CombStartShift.Id;
      }

      var combStartData = {};
      combStartData.Id = IdContainer;
      combStartData.CombEdgeStitching = CombEdgeStitchingContainer;
      combStartData.CombNumber = CombNumberContainer;
      combStartData.OperatorDocumentId = OperatorContainer;
      combStartData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
      combStartData.CombStartDate = DateContainer;
      combStartData.CombStartTime = TimeContainer;
      combStartData.ShiftDocumentId = ShiftContainer;

      this.service
        .updateCombStart(combStartData.Id, combStartData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else {
      this.error.CombStartYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  saveCombFinish() {
    var reachingInYarnStrandsProcessedProcessed = 0;
    var combYarnStrandsProcessedProcessed = 0;
    this.Log.forEach(history => {
      if (history.MachineStatus == "REACHING-IN-START" || history.MachineStatus == "REACHING-IN-FINISH" || history.MachineStatus == "REACHING-IN-CHANGE-OPERATOR") {
        reachingInYarnStrandsProcessedProcessed += history.YarnStrandsProcessed;
      } else if (history.MachineStatus == "COMB-START" || history.MachineStatus == "COMB-FINISH") {
        combYarnStrandsProcessedProcessed += history.YarnStrandsProcessed;
      }
    });
    // var sumOfYarnStrandsProcessedHistory = this.Log.reduce((previousObject, currentObject) => previousObject + currentObject.YarnStrandsProcessed, 0);
    // var sumOfYarnStrandsProcessed = sumOfYarnStrandsProcessedHistory + this.CombFinishYarnStrandsProcessed;

    if (combYarnStrandsProcessedProcessed <= reachingInYarnStrandsProcessedProcessed) {
      var IdContainer = this.data.Id;
      if (this.CombFinishWidth) {
        var CombFinishWidthContainer = this.CombFinishWidth;
      }
      if (this.CombFinishOperator) {
        var OperatorContainer = this.CombFinishOperator.Id;
      }
      if (this.CombFinishYarnStrandsProcessed) {
        var YarnStrandsProcessedContainer = this.CombFinishYarnStrandsProcessed;
      }
      if (this.CombFinishDate) {
        var DateContainer = moment(this.CombFinishDate).utcOffset("+07:00").format();
      }
      if (this.CombFinishTime) {
        var TimeContainer = this.CombFinishTime;
      }
      if (this.CombFinishShift) {
        var ShiftContainer = this.CombFinishShift.Id;
      }

      var combFinishData = {};
      combFinishData.Id = IdContainer;
      combFinishData.CombWidth = CombFinishWidthContainer;
      combFinishData.OperatorDocumentId = OperatorContainer;
      combFinishData.YarnStrandsProcessed = YarnStrandsProcessedContainer;
      combFinishData.CombFinishDate = DateContainer;
      combFinishData.CombFinishTime = TimeContainer;
      combFinishData.ShiftDocumentId = ShiftContainer;

      this.service
        .updateCombFinish(combFinishData.Id, combFinishData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else {
      this.error.CombFinishYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
