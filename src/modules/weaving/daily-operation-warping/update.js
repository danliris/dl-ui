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
import moment from "moment";
// var BeamLoader = require("../../../loader/weaving-beam-loader");
var WarpingBeamLoader = require("../../../loader/weaving-warping-beam-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");
var UOMLoader = require("../../../loader/uom-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable StartTime;
  @bindable ProduceBeamsTime;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;

    this.data = {};
    this.error = {};
    this.error.error = {};

    this.showHideBrokenThreadsMenu = false;
    this.showHideLooseThreadsMenu = false;

    this.isStartDisabled = false;
    this.isProduceBeamDisabled = false;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  warpingBrokenCausesColumns = [{
    value: "WarpingBrokenCause",
    header: "Penyebab Putus Benang"
  }, {
    value: "TotalBroken",
    header: "Total"
  }];

  brokenThreadsItems = ["", "Benang Tipis"];

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
        dataResult.WeavingUnit = unit.Name;
        return dataResult;
      });
    if (this.data.Id) {
      this.BeamProducts = this.data.DailyOperationWarpingBeamProducts;
      this.Histories = this.data.DailyOperationWarpingHistories;

      var lastWarpingHistory = this.Histories[0];
      var lastWarpingHistoryStatus = lastWarpingHistory.MachineStatus
      // switch (lastWarpingHistoryStatus) {
      //   case "ENTRY":
      //     this.isStartDisabled = false;
      //     this.isPauseDisabled = true;
      //     this.isResumeDisabled = true;
      //     this.isProduceBeamDisabled = true;
      //     this.isFinishDisabled = true;
      //     break;
      //   case "START":
      //     this.isStartDisabled = true;
      //     this.isPauseDisabled = false;
      //     this.isResumeDisabled = true;
      //     this.isProduceBeamDisabled = false;
      //     this.isFinishDisabled = true;
      //     break;
      //   case "STOP":
      //     this.isStartDisabled = true;
      //     this.isPauseDisabled = true;
      //     this.isResumeDisabled = false;
      //     this.isProduceBeamDisabled = true;
      //     this.isFinishDisabled = true;
      //     break;
      //   case "CONTINUE":
      //     this.isStartDisabled = true;
      //     this.isPauseDisabled = false;
      //     this.isResumeDisabled = true;
      //     this.isProduceBeamDisabled = false;
      //     this.isFinishDisabled = true;
      //     break;
      //   case "COMPLETED":
      //     this.isStartDisabled = false;
      //     this.isPauseDisabled = true;
      //     this.isResumeDisabled = true;
      //     this.isProduceBeamDisabled = true;
      //     this.isFinishDisabled = false;
      //     break;
      //   case "FINISH":
      //     this.isStartDisabled = true;
      //     this.isPauseDisabled = true;
      //     this.isResumeDisabled = true;
      //     this.isProduceBeamDisabled = true;
      //     this.isFinishDisabled = true;
      //     break;
      //   default:
      //     this.isStartDisabled = false;
      //     this.isPauseDisabled = false;
      //     this.isResumeDisabled = false;
      //     this.isProduceBeamDisabled = false;
      //     this.isFinishDisabled = false;
      //     break;
      // }
    }
  }

  dailyOperationBeamProductsColumns = [{
      value: "WarpingBeamNumber",
      header: "No. Beam Warping"
    },
    {
      value: "LatestDateBeamProduct",
      header: "Tanggal"
    },
    {
      value: "LatestTimeBeamProduct",
      header: "Jam"
    },
    {
      value: "WarpingBrokenThreads",
      header: "Putus Benang Warping"
    },
    {
      value: "WarpingTotalBeamLength",
      header: "Total Panjang Beam"
    },
    {
      value: "Tention",
      header: "Tention"
    },
    {
      value: "MachineSpeed",
      header: "Kecepatan Mesin"
    },
    {
      value: "PressRoll",
      header: "PressRoll"
    },
    {
      value: "WarpingBeamStatus",
      header: "Status Beam Warping"
    }
  ];

  dailyOperationHistoriesColumns = [{
      value: "WarpingBeamNumber",
      header: "No. Beam Warping"
    },
    {
      value: "DateMachine",
      header: "Tanggal"
    },
    {
      value: "TimeMachine",
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
      value: "OperatorGroup",
      header: "Group"
    },
    {
      value: "WarpingBeamLengthPerOperator",
      header: "Panjang Beam Per Operator"
    },
    {
      value: "OperationStatus",
      header: "Status Mesin"
    }
  ];

  get operators() {
    return OperatorLoader;
  }

  get beams() {
    return WarpingBeamLoader;
  }

  get uoms() {
    return UOMLoader;
  }

  completeBeamClicked(event) {
    let targetValue = event.target.checked;

    if (targetValue) {
      this.showHideCompleteMenu = true;
    } else {
      this.showHideCompleteMenu = false;
    }
  }

  addBrokenCause = (e) => {
    this.WarpingBrokenCauses = this.WarpingBrokenCauses || [];
    this.WarpingBrokenCauses.push({});
  }

  start() {
    this.StartDate = undefined;
    this.StartTime = null;
    this.StartShift = undefined;
    this.StartOperator = undefined;
    this.StartSizingBeamDocuments = undefined;
    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = false;
      this.showHideProduceBeamsMenu = false;
      this.showHideFinishMenu = false;
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
      this.showHideFinishMenu = false;
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
    if (this.StartWarpingBeamDocuments) {
      var WarpingBeamIdContainer = this.StartWarpingBeamDocuments.Id;
      var WarpingBeamNumberContainer = this.StartWarpingBeamDocuments.Number;
    }

    this.data = {};
    this.data.Id = IdContainer;
    this.data.StartDate = HistoryDateContainer;
    this.data.StartTime = HistoryTimeContainer;
    this.data.StartShift = ShiftContainer;
    this.data.StartOperator = OperatorContainer;
    this.data.WarpingBeamId = WarpingBeamIdContainer;
    this.data.WarpingBeamNumber = WarpingBeamNumberContainer;

    this.service
      .updateStartProcess(this.data.Id, this.data)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error.error = e;
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

  saveProduceBeams() {
    var HistoryDateContainer;
    var HistoryTimeContainer;
    var ShiftContainer;
    var OperatorContainer;
    var WarpingBeamLengthContainer;
    var WarpingBeamLengthUomIdContainer;
    var TentionContainer;
    var MachineSpeedContainer;
    var PressRollContainer;

    var IdContainer = this.data.Id;
    if (this.ProduceBeamsDate) {
      HistoryDateContainer = moment(this.ProduceBeamsDate).utcOffset("+07:00").format();
    }
    if (this.ProduceBeamsTime) {
      HistoryTimeContainer = this.ProduceBeamsTime;
    }
    if (this.ProduceBeamsShift) {
      ShiftContainer = this.ProduceBeamsShift.Id;
    }
    if (this.ProduceBeamsOperator) {
      OperatorContainer = this.ProduceBeamsOperator.Id;
    }
    if (this.WarpingBeamLength) {
      WarpingBeamLengthContainer = this.WarpingBeamLength;
    }
    if (this.WarpingBeamLengthUom) {
      WarpingBeamLengthUomIdContainer = this.WarpingBeamLengthUom.Id;
    }
    if (this.Tention) {
      TentionContainer = this.Tention;
    }
    if (this.MachineSpeed) {
      MachineSpeedContainer = this.MachineSpeed;
    }
    if (this.PressRoll) {
      PressRollContainer = this.PressRoll;
    }

    this.data = {};
    this.data.Id = IdContainer;
    this.data.ProduceBeamsDate = HistoryDateContainer;
    this.data.ProduceBeamsTime = HistoryTimeContainer;
    this.data.ProduceBeamsShift = ShiftContainer;
    this.data.ProduceBeamsOperator = OperatorContainer;
    this.data.WarpingBeamLength = WarpingBeamLengthContainer;
    this.data.WarpingBeamLengthUomId = WarpingBeamLengthUomIdContainer;
    this.data.Tention = TentionContainer;
    this.data.MachineSpeed = MachineSpeedContainer;
    this.data.PressRoll = PressRollContainer;

    this.service
      .updateProduceBeamsProcess(this.data.Id, this.data)
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
