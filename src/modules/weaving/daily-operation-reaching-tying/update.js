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
  @bindable StartReachingTime;
  @bindable FinishReachingTime;
  @bindable StartTyingTime;
  @bindable FinishTyingTime;
  @bindable ReachingTyingProcess;

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
      this.showHideReachingStartMenu = false;
      this.showHideReachingFinishMenu = false;
      if (this.showHideReachingMenu === true) {
        this.showHideReachingMenu = false;
        if (this.showHideReachingStartMenu === true || this.showHideTyingStartMenu === true) {
          this.showHideReachingStartMenu = false;
          this.showHideTyingStartMenu = false;

          this.StartReachingDate = "";
          this.StartReachingTime = "";
          this.StartReachingShift = "";
          this.StartReachingOperator = "";
          this.StartReachingTypeInput = "";
          this.StartReachingTypeOutput = "";
          this.FinishReachingDate = "";
          this.FinishReachingTime = "";
          this.FinishReachingShift = "";
          this.FinishReachingOperator = "";
          this.FinishReachingWidth = "";
        }
        if (this.showHideReachingFinishMenu === true || this.showHideTyingFinishMenu === true) {
          this.showHideReachingFinishMenu = false;
          this.showHideTyingFinishMenu = false;

          this.StartReachingDate = "";
          this.StartReachingTime = "";
          this.StartReachingShift = "";
          this.StartReachingOperator = "";
          this.StartReachingTypeInput = "";
          this.StartReachingTypeOutput = "";
          this.FinishReachingDate = "";
          this.FinishReachingTime = "";
          this.FinishReachingShift = "";
          this.FinishReachingOperator = "";
          this.FinishReachingWidth = "";
        }
      } else {
        this.showHideReachingMenu = true;
        this.showHideTyingMenu = false;
        if (this.showHideReachingStartMenu === true || this.showHideTyingStartMenu === true) {
          this.showHideReachingStartMenu = false;
          this.showHideTyingStartMenu = false;

          this.StartReachingDate = "";
          this.StartReachingTime = "";
          this.StartReachingShift = "";
          this.StartReachingOperator = "";
          this.StartReachingTypeInput = "";
          this.StartReachingTypeOutput = "";
          this.FinishReachingDate = "";
          this.FinishReachingTime = "";
          this.FinishReachingShift = "";
          this.FinishReachingOperator = "";
          this.FinishReachingWidth = "";
        }
        if (this.showHideReachingFinishMenu === true || this.showHideTyingFinishMenu === true) {
          this.showHideReachingFinishMenu = false;
          this.showHideTyingFinishMenu = false;

          this.StartReachingDate = "";
          this.StartReachingTime = "";
          this.StartReachingShift = "";
          this.StartReachingOperator = "";
          this.StartReachingTypeInput = "";
          this.StartReachingTypeOutput = "";
          this.FinishReachingDate = "";
          this.FinishReachingTime = "";
          this.FinishReachingShift = "";
          this.FinishReachingOperator = "";
          this.FinishReachingWidth = "";
        }
      }
    } else if (newValue == "Sisir") {
      this.showHideTyingStartMenu = false;
      this.showHideTyingFinishMenu = false;
      if (this.showHideTyingMenu === true) {
        this.showHideTyingMenu = false;
        if (this.showHideReachingStartMenu === true || this.showHideTyingStartMenu === true) {
          this.showHideReachingStartMenu = false;
          this.showHideTyingStartMenu = false;

          this.StartTyingDate = "";
          this.StartTyingTime = "";
          this.StartTyingShift = "";
          this.StartTyingOperator = "";
          this.StartTyingMargin = "";
          this.StartTyingNumber = "";
          this.FinishTyingDate = "";
          this.FinishTyingTime = "";
          this.FinishTyingShift = "";
          this.FinishTyingOperator = "";
          this.FinishTyingWidth = "";
        }
        if (this.showHideReachingFinishMenu === true || this.showHideTyingFinishMenu === true) {
          this.showHideReachingFinishMenu = false;
          this.showHideTyingFinishMenu = false;

          this.StartTyingDate = "";
          this.StartTyingTime = "";
          this.StartTyingShift = "";
          this.StartTyingOperator = "";
          this.StartTyingMargin = "";
          this.StartTyingNumber = "";
          this.FinishTyingDate = "";
          this.FinishTyingTime = "";
          this.FinishTyingShift = "";
          this.FinishTyingOperator = "";
          this.FinishTyingWidth = "";
        }
      } else {
        this.showHideTyingMenu = true;
        this.showHideReachingMenu = false;
        if (this.showHideReachingStartMenu === true || this.showHideTyingStartMenu === true) {
          this.showHideReachingStartMenu = false;
          this.showHideTyingStartMenu = false;

          this.StartTyingDate = "";
          this.StartTyingTime = "";
          this.StartTyingShift = "";
          this.StartTyingOperator = "";
          this.StartTyingMargin = "";
          this.StartTyingNumber = "";
          this.FinishTyingDate = "";
          this.FinishTyingTime = "";
          this.FinishTyingShift = "";
          this.FinishTyingOperator = "";
          this.FinishTyingWidth = "";
        }
        if (this.showHideReachingFinishMenu === true || this.showHideTyingFinishMenu === true) {
          this.showHideReachingFinishMenu = false;
          this.showHideTyingFinishMenu = false;

          this.StartTyingDate = "";
          this.StartTyingTime = "";
          this.StartTyingShift = "";
          this.StartTyingOperator = "";
          this.StartTyingMargin = "";
          this.StartTyingNumber = "";
          this.FinishTyingDate = "";
          this.FinishTyingTime = "";
          this.FinishTyingShift = "";
          this.FinishTyingOperator = "";
          this.FinishTyingWidth = "";
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
      this.showHideReachingFinishMenu = false;
    }
  }

  reachingFinish() {
    if (this.showHideReachingFinishMenu === true) {
      this.showHideReachingFinishMenu = false;
    } else {
      this.showHideReachingStartMenu = false;
      this.showHideReachingFinishMenu = true;
    }
  }

  tyingStart() {
    if (this.showHideTyingStartMenu === true) {
      this.showHideTyingStartMenu = false;
    } else {
      this.showHideTyingStartMenu = true;
      this.showHideTyingFinishMenu = false;
    }
  }

  tyingFinish() {
    if (this.showHideTyingFinishMenu === true) {
      this.showHideTyingFinishMenu = false;
    } else {
      this.showHideTyingStartMenu = false;
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
    var ReachingTypeInputContainer = this.StartReachingTypeInput;
    var ReachingTypeOutputContainer = this.StartReachingTypeOutput;

    this.data = {};
    this.data.Id = IdContainer;
    this.data.ReachingStartDate = DateContainer;
    this.data.ReachingStartTime = TimeContainer;
    this.data.ShiftDocumentId = ShiftContainer;
    this.data.OperatorDocumentId = OperatorContainer;
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

    saveReachingFinish() {
      var IdContainer = this.data.Id;
      var DateContainer = moment(this.FinishReachingDate).utcOffset("+07:00").format();
      var TimeContainer = this.FinishReachingTime;
      var ShiftContainer = this.FinishReachingShift.Id;
      var OperatorContainer = this.FinishReachingOperator.Id;
      var ReachingWidthContainer = this.FinishReachingWidth;
  
      this.data = {};
      this.data.Id = IdContainer;
      this.data.ReachingFinishDate = DateContainer;
      this.data.ReachingFinishTime = TimeContainer;
      this.data.ShiftDocumentId = ShiftContainer;
      this.data.OperatorDocumentId = OperatorContainer;
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

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
