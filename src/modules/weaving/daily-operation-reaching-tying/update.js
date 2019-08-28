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
    }
  }

  ReachingTyingProcessChanged(newValue) {
    if (newValue == "Cucuk") {
      this.showHideReachingMenu = true;
      this.showHideTyingMenu = false;
      if(this.showHideReachingMenu === true){
        if(this.showHideReachingStartMenu === true){
          this.showHideReachingChangeOperatorMenu = false;
          this.showHideReachingFinishMenu = false;

          this.StartReachingDate = "";
          this.StartReachingTime = "";
          this.StartReachingShift = "";
          this.StartReachingOperator = "";
          this.StartReachingTypeInput = "";
          this.StartReachingTypeOutput = "";
          this.StartReachingYarnStrandsProcessed = "";
        }
        if(this.showHideReachingChangeOperatorMenu === true){
          this.showHideReachingStartMenu = false;
          this.showHideReachingFinishMenu = false;
  
          this.ChangeOperatorReachingDate = "";
          this.ChangeOperatorReachingTime = "";
          this.ChangeOperatorReachingShift = "";
          this.ChangeOperatorReachingOperator = "";
          this.ChangeOperatorReachingYarnStrandsProcessed = "";
        }
        if(this.showHideReachingFinishMenu === true){
          this.showHideReachingStartMenu = false;
          this.showHideReachingChangeOperatorMenu = false;
  
          this.FinishReachingDate = "";
          this.FinishReachingTime = "";
          this.FinishReachingShift = "";
          this.FinishReachingOperator = "";
          this.FinishReachingYarnStrandsProcessed = "";
          this.FinishReachingWidth = "";
        } else {
          this.showHideReachingStartMenu = false;
          this.showHideReachingChangeOperatorMenu = false;
          this.showHideReachingFinishMenu = false;
        }
      }
    } else if (newValue == "Sisir") {
      this.showHideReachingMenu = false;
      this.showHideTyingMenu = true;
      if(this.showHideTyingMenu === true){
        if(this.showHideTyingStartMenu === true){
          // this.showHideTyingChangeOperatorMenu = false;
          this.showHideTyingFinishMenu = false;
        
          this.StartTyingDate = "";
          this.StartTyingTime = "";
          this.StartTyingShift = "";
          this.StartTyingOperator = "";
          this.StartTyingEdgeStitching = "";
          this.StartTyingNumber = "";
          this.StartTyingYarnStrandsProcessed = "";
        }
        // if(this.showHideTyingChangeOperatorMenu === true){
        //   this.showHideTyingStartMenu = false;
        //   this.showHideTyingFinishMenu = false;
  
        //   this.ChangeOperatorTyingDate = "";
        //   this.ChangeOperatorTyingTime = "";
        //   this.ChangeOperatorTyingShift = "";
        //   this.ChangeOperatorTyingOperator = "";
        //   this.ChangeOperatorTyingYarnStrandsProcessed = "";
        // }
        if(this.showHideTyingFinishMenu === true){
          this.showHideTyingStartMenu = false;
          // this.showHideTyingChangeOperatorMenu = false;
  
          this.FinishTyingDate = "";
          this.FinishTyingTime = "";
          this.FinishTyingShift = "";
          this.FinishTyingOperator = "";
          this.FinishTyingYarnStrandsProcessed = "";
          this.FinishTyingWidth = "";
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
    if (this.showHideReachingStartMenu === true) {
      this.showHideReachingStartMenu = false;
    } else {
      this.showHideReachingStartMenu = true;
      this.showHideReachingChangeOperatorMenu = false;
      this.showHideReachingFinishMenu = false;
    }
  }

  reachingChangeOperator() {
    if (this.showHideReachingChangeOperatorMenu === true) {
      this.showHideReachingChangeOperatorMenu = false;
    } else {
      this.showHideReachingStartMenu = false;
      this.showHideReachingChangeOperatorMenu = true;
      this.showHideReachingFinishMenu = false;
    }
  }

  reachingFinish() {
    if (this.showHideReachingFinishMenu === true) {
      this.showHideReachingFinishMenu = false;
    } else {
      this.showHideReachingStartMenu = false;
      this.showHideReachingChangeOperatorMenu = false;
      this.showHideReachingFinishMenu = true;
    }
  }

  tyingStart() {
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
    var IdContainer = this.data.Id;
    var DateContainer = moment(this.StartReachingDate).utcOffset("+07:00").format();
    var TimeContainer = this.StartReachingTime;
    var ShiftContainer = this.StartReachingShift.Id;
    var OperatorContainer = this.StartReachingOperator.Id;
    var YarnStrandsProcessedContainer = this.StartReachingYarnStrandsProcessed;
    var ReachingTypeInputContainer = this.StartReachingTypeInput;
    var ReachingTypeOutputContainer = this.StartReachingTypeOutput;

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
  }

  saveReachingChangeOperator() {
    var IdContainer = this.data.Id;
    var DateContainer = moment(this.ChangeOperatorReachingDate).utcOffset("+07:00").format();
    var TimeContainer = this.ChangeOperatorReachingTime;
    var ShiftContainer = this.ChangeOperatorReachingShift.Id;
    var OperatorContainer = this.ChangeOperatorReachingOperator.Id;
    var YarnStrandsProcessedContainer = this.ChangeOperatorReachingYarnStrandsProcessed;

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
  }

  saveReachingFinish() {
    var IdContainer = this.data.Id;
    var DateContainer = moment(this.FinishReachingDate).utcOffset("+07:00").format();
    var TimeContainer = this.FinishReachingTime;
    var ShiftContainer = this.FinishReachingShift.Id;
    var OperatorContainer = this.FinishReachingOperator.Id;
    var YarnStrandsProcessedContainer = this.FinishReachingYarnStrandsProcessed;
    var ReachingWidthContainer = this.FinishReachingWidth;

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
  }

  saveTyingStart() {
    var IdContainer = this.data.Id;
    var DateContainer = moment(this.StartTyingDate).utcOffset("+07:00").format();
    var TimeContainer = this.StartTyingTime;
    var ShiftContainer = this.StartTyingShift.Id;
    var OperatorContainer = this.StartTyingOperator.Id;
    var YarnStrandsProcessedContainer = this.StartTyingYarnStrandsProcessed;
    var TyingEdgeStitchingContainer = this.StartTyingEdgeStitching;
    var TyingNumberContainer = this.StartTyingNumber;

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
  }

  saveTyingFinish() {
    var IdContainer = this.data.Id;
    var DateContainer = moment(this.FinishTyingDate).utcOffset("+07:00").format();
    var TimeContainer = this.FinishTyingTime;
    var ShiftContainer = this.FinishTyingShift.Id;
    var OperatorContainer = this.FinishTyingOperator.Id;
    var YarnStrandsProcessedContainer = this.FinishTyingYarnStrandsProcessed;
    var TyingWidthContainer = this.FinishTyingWidth;

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
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
