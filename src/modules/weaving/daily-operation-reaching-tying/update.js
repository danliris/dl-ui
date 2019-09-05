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
  @bindable ReachingTyingProcess;
  @bindable StartReachingTime;
  @bindable ChangeOperatorReachingTime;
  @bindable FinishReachingTime;
  @bindable StartTyingTime;
  @bindable FinishTyingTime;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};
    this.error = {};

    this.isReachingStartDisabled = false;
    this.isReachingChangeOperatorDisabled = false;
    this.isReachingFinishDisabled = false;
    this.isTyingStartDisabled = false;
    this.isTyingFinishDisabled = false;
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

      var lastReachingTyingDetail = this.Log[0];
      var lastReachingHistory = lastReachingTyingDetail.MachineStatus;
      switch (lastReachingHistory) {
        case "ENTRY":
          this.isReachingStartDisabled = false;
          this.isReachingChangeOperatorDisabled = true;
          this.isReachingFinishDisabled = true;
          this.isTyingStartDisabled = true;
          this.isTyingFinishDisabled = true;
          break;
        case "REACHING-START":
          this.isReachingStartDisabled = true;
          this.isReachingChangeOperatorDisabled = false;
          this.isReachingFinishDisabled = false;
          this.isTyingStartDisabled = true;
          this.isTyingFinishDisabled = true;
          break;
        case "REACHING-CHANGE-OPERATOR":
          this.isReachingStartDisabled = true;
          this.isReachingChangeOperatorDisabled = false;
          this.isReachingFinishDisabled = false;
          this.isTyingStartDisabled = true;
          this.isTyingFinishDisabled = true;
          break;
        case "REACHING-FINISH":
          this.isReachingStartDisabled = true;
          this.isReachingChangeOperatorDisabled = true;
          this.isReachingFinishDisabled = true;
          this.isTyingStartDisabled = false;
          this.isTyingFinishDisabled = true;
          break;
        case "TYING-START":
          this.isReachingStartDisabled = true;
          this.isReachingChangeOperatorDisabled = true;
          this.isReachingFinishDisabled = true;
          this.isTyingStartDisabled = true;
          this.isTyingFinishDisabled = false;
          break;
        case "TYING-FINISH":
          this.isReachingStartDisabled = true;
          this.isReachingChangeOperatorDisabled = true;
          this.isReachingFinishDisabled = true;
          this.isTyingStartDisabled = true;
          this.isTyingFinishDisabled = true;
          break;
        default:
          this.isReachingStartDisabled = false;
          this.isReachingChangeOperatorDisabled = false;
          this.isReachingFinishDisabled = false;
          this.isTyingStartDisabled = false;
          this.isTyingFinishDisabled = false;
          break;
      }
    }
  }

  ReachingTyingProcessChanged(newValue) {
    if (newValue == "Cucuk") {
      this.showHideReachingMenu = true;
      this.showHideTyingMenu = false;
      if (this.showHideReachingMenu === true) {
        if (this.showHideReachingStartMenu === true) {
          this.showHideReachingChangeOperatorMenu = false;
          this.showHideReachingFinishMenu = false;

          this.StartReachingDate = undefined;
          this.StartReachingTime = null;
          this.StartReachingShift = undefined;
          this.StartReachingOperator = undefined;
          this.StartReachingYarnStrandsProcessed = undefined;
          this.StartReachingTypeInput = undefined;
          this.StartReachingTypeOutput = undefined;
        }
        if (this.showHideReachingChangeOperatorMenu === true) {
          this.showHideReachingStartMenu = false;
          this.showHideReachingFinishMenu = false;

          this.ChangeOperatorReachingDate = undefined;
          this.ChangeOperatorReachingTime = null;
          this.ChangeOperatorReachingShift = undefined;
          this.ChangeOperatorReachingOperator = undefined;
          this.ChangeOperatorReachingYarnStrandsProcessed = undefined;
        }
        if (this.showHideReachingFinishMenu === true) {
          this.showHideReachingStartMenu = false;
          this.showHideReachingChangeOperatorMenu = false;

          this.FinishReachingDate = undefined;
          this.FinishReachingTime = null;
          this.FinishReachingShift = undefined;
          this.FinishReachingOperator = undefined;
          this.FinishReachingYarnStrandsProcessed = undefined;
          this.FinishReachingWidth = undefined;
        } else {
          this.showHideReachingStartMenu = false;
          this.showHideReachingChangeOperatorMenu = false;
          this.showHideReachingFinishMenu = false;
        }
      }
    } else if (newValue == "Sisir") {
      this.showHideReachingMenu = false;
      this.showHideTyingMenu = true;
      if (this.showHideTyingMenu === true) {
        if (this.showHideTyingStartMenu === true) {
          this.showHideTyingFinishMenu = false;

          this.StartTyingDate = undefined;
          this.StartTyingTime = null;
          this.StartTyingShift = undefined;
          this.StartTyingOperator = undefined;
          this.StartTyingYarnStrandsProcessed = undefined;
          this.StartTyingEdgeStitching = undefined;
          this.StartTyingNumber = undefined;
        }
        if (this.showHideTyingFinishMenu === true) {
          this.showHideTyingStartMenu = false;

          this.FinishTyingDate = undefined;
          this.FinishTyingTime = null;
          this.FinishTyingShift = undefined;
          this.FinishTyingOperator = undefined;
          this.FinishTyingYarnStrandsProcessed = undefined;
          this.FinishTyingWidth = undefined;
        } else {
          this.showHideTyingStartMenu = false;
          this.showHideTyingChangeOperatorMenu = false;
          this.showHideTyingFinishMenu = false;
        }
      }
    } else {
      this.showHideReachingMenu = false;
      this.showHideTyingMenu = false;
    }
  }

  reachingStart() {
    this.error = {};
    this.StartReachingDate = undefined;
    this.StartReachingTime = null;
    this.StartReachingShift = undefined;
    this.StartReachingOperator = undefined;
    this.StartReachingYarnStrandsProcessed = undefined;
    this.StartReachingTypeInput = undefined;
    this.StartReachingTypeOutput = undefined;
    if (this.showHideReachingStartMenu === true) {
      this.showHideReachingStartMenu = false;
    } else {
      this.showHideReachingStartMenu = true;
      this.showHideReachingChangeOperatorMenu = false;
      this.showHideReachingFinishMenu = false;
    }
  }

  reachingChangeOperator() {
    this.error = {};
    this.ChangeOperatorReachingDate = undefined;
    this.ChangeOperatorReachingTime = null;
    this.ChangeOperatorReachingShift = undefined;
    this.ChangeOperatorReachingOperator = undefined;
    this.ChangeOperatorReachingYarnStrandsProcessed = undefined;
    if (this.showHideReachingChangeOperatorMenu === true) {
      this.showHideReachingChangeOperatorMenu = false;
    } else {
      this.showHideReachingStartMenu = false;
      this.showHideReachingChangeOperatorMenu = true;
      this.showHideReachingFinishMenu = false;
    }
  }

  reachingFinish() {
    this.error = {};
    this.FinishReachingDate = undefined;
    this.FinishReachingTime = null;
    this.FinishReachingShift = undefined;
    this.FinishReachingOperator = undefined;
    this.FinishReachingYarnStrandsProcessed = undefined;
    this.FinishReachingWidth = undefined;
    if (this.showHideReachingFinishMenu === true) {
      this.showHideReachingFinishMenu = false;
    } else {
      this.showHideReachingStartMenu = false;
      this.showHideReachingChangeOperatorMenu = false;
      this.showHideReachingFinishMenu = true;
    }
  }

  tyingStart() {
    this.error = {};
    this.StartTyingDate = undefined;
    this.StartTyingTime = null;
    this.StartTyingShift = undefined;
    this.StartTyingOperator = undefined;
    this.StartTyingYarnStrandsProcessed = undefined;
    this.StartTyingEdgeStitching = undefined;
    this.StartTyingNumber = undefined;
    if (this.showHideTyingStartMenu === true) {
      this.showHideTyingStartMenu = false;
    } else {
      this.showHideTyingStartMenu = true;
      // this.showHideTyingChangeOperatorMenu = false;
      this.showHideTyingFinishMenu = false;
    }
  }

  // tyingChangeOperator() {
  //   if (this.showHideTyingChangeOperatorMenu === true) {
  //     this.showHideTyingChangeOperatorMenu = false;
  //   } else {
  //     this.showHideTyingStartMenu = false;
  //     this.showHideTyingChangeOperatorMenu = true;
  //     this.showHideTyingFinishMenu = false;
  //   }
  // }

  tyingFinish() {
    this.error = {};
    this.FinishReachingDate = undefined;
    this.FinishReachingTime = null;
    this.FinishReachingShift = undefined;
    this.FinishReachingOperator = undefined;
    this.FinishReachingYarnStrandsProcessed = undefined;
    this.FinishReachingWidth = undefined;
    if (this.showHideTyingFinishMenu === true) {
      this.showHideTyingFinishMenu = false;
    } else {
      this.showHideTyingStartMenu = false;
      // this.showHideTyingChangeOperatorMenu = false;
      this.showHideTyingFinishMenu = true;
    }
  }

  get operators() {
    return OperatorLoader;
  }

  StartReachingTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.StartReachingShift = "";
        this.StartReachingShift = {};
        this.StartReachingShift = result;
      })
      .catch(e => {
        this.StartReachingShift = {};
        this.error.StartReachingShift = " Shift tidak ditemukan ";
      });
  }

  ChangeOperatorReachingTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.ChangeOperatorReachingShift = "";
        this.ChangeOperatorReachingShift = {};
        this.ChangeOperatorReachingShift = result;
      })
      .catch(e => {
        this.ChangeOperatorReachingShift = {};
        this.error.ChangeOperatorReachingShift = " Shift tidak ditemukan ";
      });
  }

  FinishReachingTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.FinishReachingShift = "";
        this.FinishReachingShift = {};
        this.FinishReachingShift = result;
      })
      .catch(e => {
        this.FinishReachingShift = {};
        this.error.FinishReachingShift = " Shift tidak ditemukan ";
      });
  }

  StartTyingTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.StartTyingShift = "";
        this.StartTyingShift = {};
        this.StartTyingShift = result;
      })
      .catch(e => {
        this.StartTyingShift = {};
        this.error.StartTyingShift = " Shift tidak ditemukan ";
      });
  }

  FinishTyingTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.FinishTyingShift = "";
        this.FinishTyingShift = {};
        this.FinishTyingShift = result;
      })
      .catch(e => {
        this.FinishTyingShift = {};
        this.error.FinishTyingShift = " Shift tidak ditemukan ";
      });
  }

  saveReachingStart() {
    var sumOfYarnStrandsProcessedDetail = this.Log.reduce((previousObject, currentObject) => previousObject + currentObject.YarnStrandsProcessed, 0);
    var sumOfYarnStrandsProcessed = sumOfYarnStrandsProcessedDetail + this.StartReachingYarnStrandsProcessed;

    if (sumOfYarnStrandsProcessed <= this.data.SizingYarnStrands) {
      var IdContainer = this.data.Id;
      if (this.StartReachingDate) {
        var DateContainer = moment(this.StartReachingDate).utcOffset("+07:00").format();
      }
      if (this.StartReachingTime) {
        var TimeContainer = this.StartReachingTime;
      }
      if (this.StartReachingShift) {
        var ShiftContainer = this.StartReachingShift.Id;
      }
      if (this.StartReachingOperator) {
        var OperatorContainer = this.StartReachingOperator.Id;
      }
      if (this.StartReachingYarnStrandsProcessed) {
        var YarnStrandsProcessedContainer = this.StartReachingYarnStrandsProcessed;
      }
      if (this.StartReachingTypeInput) {
        var ReachingTypeInputContainer = this.StartReachingTypeInput;
      }
      if (this.StartReachingTypeOutput) {
        var ReachingTypeOutputContainer = this.StartReachingTypeOutput;
      }

      this.data = {};
      this.data.Id = IdContainer;
      this.data.ReachingStartDate = DateContainer;
      this.data.ReachingStartTime = TimeContainer;
      this.data.ShiftDocumentId = ShiftContainer;
      this.data.OperatorDocumentId = OperatorContainer;
      this.data.YarnStrandsProcessed = YarnStrandsProcessedContainer;
      this.data.ReachingTypeInput = ReachingTypeInputContainer;
      this.data.ReachingTypeOutput = ReachingTypeOutputContainer;

      this.service
        .updateReachingStart(this.data.Id, this.data)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else {
      this.error.StartReachingYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  saveReachingChangeOperator() {
    var sumOfYarnStrandsProcessedDetail = this.Log.reduce((previousObject, currentObject) => previousObject + currentObject.YarnStrandsProcessed, 0);
    var sumOfYarnStrandsProcessed = sumOfYarnStrandsProcessedDetail + this.ChangeOperatorReachingYarnStrandsProcessed;

    if (sumOfYarnStrandsProcessed <= this.data.SizingYarnStrands) {
      var IdContainer = this.data.Id;
      if (this.ChangeOperatorReachingDate) {
        var DateContainer = moment(this.ChangeOperatorReachingDate).utcOffset("+07:00").format();
      }
      if (this.ChangeOperatorReachingTime) {
        var TimeContainer = this.ChangeOperatorReachingTime;
      }
      if (this.ChangeOperatorReachingShift) {
        var ShiftContainer = this.ChangeOperatorReachingShift.Id;
      }
      if (this.ChangeOperatorReachingOperator) {
        var OperatorContainer = this.ChangeOperatorReachingOperator.Id;
      }
      if (this.ChangeOperatorReachingYarnStrandsProcessed) {
        var YarnStrandsProcessedContainer = this.ChangeOperatorReachingYarnStrandsProcessed;
      }

      this.data = {};
      this.data.Id = IdContainer;
      this.data.ChangeOperatorReachingDate = DateContainer;
      this.data.ChangeOperatorReachingTime = TimeContainer;
      this.data.ShiftDocumentId = ShiftContainer;
      this.data.OperatorDocumentId = OperatorContainer;
      this.data.YarnStrandsProcessed = YarnStrandsProcessedContainer;

      this.service
        .updateReachingChangeOperator(this.data.Id, this.data)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else {
      this.error.ChangeOperatorReachingYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  saveReachingFinish() {
    var sumOfYarnStrandsProcessedDetail = this.Log.reduce((previousObject, currentObject) => previousObject + currentObject.YarnStrandsProcessed, 0);
    var sumOfYarnStrandsProcessed = sumOfYarnStrandsProcessedDetail + this.FinishReachingYarnStrandsProcessed;

    if (sumOfYarnStrandsProcessed <= this.data.SizingYarnStrands) {
      var IdContainer = this.data.Id;
      if (this.FinishReachingDate) {
        var DateContainer = moment(this.FinishReachingDate).utcOffset("+07:00").format();
      }
      if (this.FinishReachingTime) {
        var TimeContainer = this.FinishReachingTime;
      }
      if (this.FinishReachingShift) {
        var ShiftContainer = this.FinishReachingShift.Id;
      }
      if (this.FinishReachingOperator) {
        var OperatorContainer = this.FinishReachingOperator.Id;
      }
      if (this.FinishReachingYarnStrandsProcessed) {
        var YarnStrandsProcessedContainer = this.FinishReachingYarnStrandsProcessed;
      }
      if (this.FinishReachingWidth) {
        var ReachingWidthContainer = this.FinishReachingWidth;
      }

      this.data = {};
      this.data.Id = IdContainer;
      this.data.ReachingFinishDate = DateContainer;
      this.data.ReachingFinishTime = TimeContainer;
      this.data.ShiftDocumentId = ShiftContainer;
      this.data.OperatorDocumentId = OperatorContainer;
      this.data.YarnStrandsProcessed = YarnStrandsProcessedContainer;
      this.data.ReachingWidth = ReachingWidthContainer;

      this.service
        .updateReachingFinish(this.data.Id, this.data)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else {
      this.error.FinishReachingYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  saveTyingStart() {
    var sumOfYarnStrandsProcessedDetail = this.Log.reduce((previousObject, currentObject) => previousObject + currentObject.YarnStrandsProcessed, 0);
    var sumOfYarnStrandsProcessed = sumOfYarnStrandsProcessedDetail + this.StartTyingYarnStrandsProcessed;

    if (sumOfYarnStrandsProcessed <= this.data.SizingYarnStrands) {
    var IdContainer = this.data.Id;
    if (this.StartTyingDate) {
      var DateContainer = moment(this.StartTyingDate).utcOffset("+07:00").format();
    }
    if (this.StartTyingTime) {
      var TimeContainer = this.StartTyingTime;
    }
    if (this.StartTyingShift) {
      var ShiftContainer = this.StartTyingShift.Id;
    }
    if (this.StartTyingOperator) {
      var OperatorContainer = this.StartTyingOperator.Id;
    }
    if (this.StartTyingYarnStrandsProcessed) {
      var YarnStrandsProcessedContainer = this.StartTyingYarnStrandsProcessed;
    }
    if (this.StartTyingEdgeStitching) {
      var TyingEdgeStitchingContainer = this.StartTyingEdgeStitching;
    }
    if (this.StartTyingNumber) {
      var TyingNumberContainer = this.StartTyingNumber;
    }

    this.data = {};
    this.data.Id = IdContainer;
    this.data.TyingStartDate = DateContainer;
    this.data.TyingStartTime = TimeContainer;
    this.data.ShiftDocumentId = ShiftContainer;
    this.data.OperatorDocumentId = OperatorContainer;
    this.data.YarnStrandsProcessed = YarnStrandsProcessedContainer;
    this.data.TyingEdgeStitching = TyingEdgeStitchingContainer;
    this.data.TyingNumber = TyingNumberContainer;

    this.service
      .updateTyingStart(this.data.Id, this.data)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
    } else {
      this.error.StartTyingYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  saveTyingFinish() {
    var sumOfYarnStrandsProcessedDetail = this.Log.reduce((previousObject, currentObject) => previousObject + currentObject.YarnStrandsProcessed, 0);
    var sumOfYarnStrandsProcessed = sumOfYarnStrandsProcessedDetail + this.FinishTyingYarnStrandsProcessed;

    if (sumOfYarnStrandsProcessed <= this.data.SizingYarnStrands) {
    var IdContainer = this.data.Id;
    if (this.FinishTyingDate) {
      var DateContainer = moment(this.FinishTyingDate).utcOffset("+07:00").format();
    }
    if (this.FinishTyingTime) {
      var TimeContainer = this.FinishTyingTime;
    }
    if (this.FinishTyingShift) {
      var ShiftContainer = this.FinishTyingShift.Id;
    }
    if (this.FinishTyingOperator) {
      var OperatorContainer = this.FinishTyingOperator.Id;
    }
    if (this.FinishTyingYarnStrandsProcessed) {
      var YarnStrandsProcessedContainer = this.FinishTyingYarnStrandsProcessed;
    }
    if (this.FinishTyingWidth) {
      var TyingWidthContainer = this.FinishTyingWidth;
    }

    this.data = {};
    this.data.Id = IdContainer;
    this.data.TyingFinishDate = DateContainer;
    this.data.TyingFinishTime = TimeContainer;
    this.data.ShiftDocumentId = ShiftContainer;
    this.data.OperatorDocumentId = OperatorContainer;
    this.data.YarnStrandsProcessed = YarnStrandsProcessedContainer;
    this.data.TyingWidth = TyingWidthContainer;

    this.service
      .updateTyingFinish(this.data.Id, this.data)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
    } else {
      this.error.FinishTyingYarnStrandsProcessed = " Helai Cucuk yang Dikerjakan Melebihi Jumlah Helai pada Beam Sizing ";
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
