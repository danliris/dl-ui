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

  pressRollUoms = ["", "PSA", "Kg/Cm2"]

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
      value: "WarpingBrokenCauses",
      header: "Putus"
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

  warpingBrokenCausesColumns = [{
    value: "WarpingBrokenCause",
    header: "Penyebab Putus Benang"
  }, {
    value: "TotalBroken",
    header: "Total"
  }];

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
      var isAllBeamProcessedFlag;
      this.BeamProducts = this.data.DailyOperationWarpingBeamProducts;
      if (this.data.BeamProductResult == this.BeamProducts.length) {
        isAllBeamProcessedFlag = true;
      } else {
        isAllBeamProcessedFlag = false;
      }

      this.Histories = this.data.DailyOperationWarpingHistories;
      var lastWarpingHistory = this.Histories[0];
      var lastWarpingHistoryStatus = lastWarpingHistory.MachineStatus;
      switch (lastWarpingHistoryStatus) {
        case "ENTRY":
          this.isStartDisabled = false;
          this.isProduceBeamDisabled = true;
          break;
        case "START":
          this.isStartDisabled = true;
          this.isProduceBeamDisabled = false;
          break;
        case "ON-PROCESS-BEAM":
          this.isStartDisabled = true;
          this.isProduceBeamDisabled = false;
          break;
        case "COMPLETED":
          if (isAllBeamProcessedFlag == true) {
            this.isStartDisabled = true;
            this.isProduceBeamDisabled = true;
          } else {
            this.isStartDisabled = false;
            this.isProduceBeamDisabled = true;
          }
          break;
        default:
          this.isStartDisabled = false;
          this.isProduceBeamDisabled = false;
          break;
      }
    }
  }

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

      this.Tention = 0;
      this.MachineSpeed = 0;
      this.PressRoll = 0;
      this.PressRollUom = "";
    } else {
      this.showHideCompleteMenu = false;

      this.Tention = 0;
      this.MachineSpeed = 0;
      this.PressRoll = 0;
      this.PressRollUom = "";
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
      this.showHideProduceBeamsMenu = false;
    }
  }

  produceBeams() {
    this.ProduceBeamsDate = undefined;
    this.ProduceBeamsTime = null;
    this.ProduceBeamsShift = undefined;
    this.ProduceBeamsOperator = undefined;
    this.WarpingBeamLengthPerOperator = 0;
    this.WarpingBeamLengthUom = "";
    if (this.showHideProduceBeamsMenu === true) {
      this.showHideProduceBeamsMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHideProduceBeamsMenu = true;
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
    var ShiftIdContainer;
    var OperatorIdContainer;
    var WarpingBeamLengthPerOperatorContainer;
    var WarpingBeamLengthUomIdContainer;

    var IdContainer = this.data.Id;
    if (this.ProduceBeamsDate) {
      HistoryDateContainer = moment(this.ProduceBeamsDate).utcOffset("+07:00").format();
    }
    if (this.ProduceBeamsTime) {
      HistoryTimeContainer = this.ProduceBeamsTime;
    }
    if (this.ProduceBeamsShift) {
      ShiftIdContainer = this.ProduceBeamsShift.Id;
    }
    if (this.ProduceBeamsOperator) {
      OperatorIdContainer = this.ProduceBeamsOperator.Id;
    }
    if (this.WarpingBeamLengthPerOperator) {
      WarpingBeamLengthPerOperatorContainer = this.WarpingBeamLengthPerOperator;
    }
    if (this.WarpingBeamLengthUom) {
      WarpingBeamLengthUomIdContainer = this.WarpingBeamLengthUom.Id;
    }

    var updateData = {};
    updateData.Id = IdContainer;
    updateData.ProduceBeamsDate = HistoryDateContainer;
    updateData.ProduceBeamsTime = HistoryTimeContainer;
    updateData.ProduceBeamsShift = ShiftIdContainer;
    updateData.ProduceBeamsOperator = OperatorIdContainer;
    updateData.WarpingBeamLengthPerOperator = WarpingBeamLengthPerOperatorContainer;
    updateData.WarpingBeamLengthUomId = WarpingBeamLengthUomIdContainer;
    updateData.BrokenCauses = [];

    if (this.completeBeam) {
      var TentionContainer;
      var MachineSpeedContainer;
      var PressRollContainer;
      var PressRollUomContainer;
      var IsFinishFlagContainer;

      if (this.Tention) {
        TentionContainer = this.Tention;
      }
      if (this.MachineSpeed) {
        MachineSpeedContainer = this.MachineSpeed;
      }
      if (this.PressRoll) {
        PressRollContainer = this.PressRoll;
      }
      if (this.PressRollUom) {
        PressRollUomContainer = this.PressRollUom;
      }
      if (this.data.BeamProductResult == this.BeamProducts.length) {
        IsFinishFlagContainer = true
      } else {
        IsFinishFlagContainer = false;
      }

      this.WarpingBrokenCauses.forEach(o => {
        var brokenCauseObject = {};
        brokenCauseObject.WarpingBrokenCauseId = o.WarpingBrokenCause.Id;
        brokenCauseObject.TotalBroken = o.TotalBroken;
        updateData.BrokenCauses.push(brokenCauseObject);
      });

      updateData.Tention = TentionContainer;
      updateData.MachineSpeed = MachineSpeedContainer;
      updateData.PressRoll = PressRollContainer;
      updateData.PressRollUom = PressRollUomContainer;
      updateData.IsFinishFlag = IsFinishFlagContainer;
      
      this.service
        .updateCompletedProcess(updateData.Id, updateData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    } else {
      this.service
        .updateProduceBeamsProcess(updateData.Id, updateData)
        .then(result => {
          location.reload();
        })
        .catch(e => {
          this.error = e;
        });
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
