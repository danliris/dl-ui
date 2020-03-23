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
var LoomBeamProductsLoader = require("../../../loader/weaving-loom-beams-used-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable StartTime;
  @bindable StartLoomBeamDocuments;
  @bindable FinishTime;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};

    this.isStartDisabled = false;
    this.isFinishDisabled = false;

    this.showHideCalculationField = false;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamsUsedColumns = [{
    value: "BeamOrigin",
    header: "Asal Beam"
  }, {
    value: "BeamNumber",
    header: "No. Beam"
  }, {
    value: "StartCounter",
    header: "CounterAwal"
  }, {
    value: "FinishCounter",
    header: "Counter Akhir"
  }, {
    value: "MachineSpeed",
    header: "Kecepatan Mesin"
  }, {
    value: "SCMPX",
    header: "SCMPX"
  }, {
    value: "Efficiency",
    header: "Efisiensi"
  }, {
    value: "F",
    header: "F"
  }, {
    value: "W",
    header: "W"
  }, {
    value: "L",
    header: "L"
  }, {
    value: "T",
    header: "T"
  }, {
    value: "UomUnit",
    header: "Satuan"
  }, {
    value: "BeamUsedStatus",
    header: "Status Beam"
  }];

  historiesColumns = [{
      value: "BeamNumber",
      header: "No. Beam"
    },
    {
      value: "TyingMachineNumber",
      header: "Mesin Tying"
    },
    {
      value: "TyingOperatorName",
      header: "Operator Tying"
    },
    {
      value: "TyingOperatorGrup",
      header: "Grup Tying"
    },
    {
      value: "LoomMachineNumber",
      header: "Mesin Loom"
    }, {
      value: "LoomOperatorName",
      header: "Operator Loom"
    },
    {
      value: "LoomOperatorGrup",
      header: "Grup Loom"
    },
    {
      value: "CounterPerOperator",
      header: "Counter Per Operator"
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
      value: "Information",
      header: "Informasi"
    },
    {
      value: "MachineStatus",
      header: "Status Mesin"
    }
  ];

  reprocessItems = ["", "Sizing", "Reaching"];

  async activate(params) {
    var Id = params.Id;
    var dataResult;
    this.data = await this.service
      .getById(Id);
    // .then(result => {
    //   dataResult = result;
    //   return this.service.getUnitById(result.WeavingUnitId);
    // })
    // .then(unit => {
    //   dataResult.WeavingDocument = unit;
    //   dataResult.WeavingUnitName = unit.Name;
    //   return dataResult;
    // });

    if (this.data.Id) {
      this.OperationIdFilter = {
        "LoomOperationId": this.data.Id
      };

      this.BeamsUsed = this.data.DailyOperationLoomBeamsUsed;
      this.Histories = this.data.DailyOperationLoomBeamHistories;

      var lastLoomHistory = this.Histories[0];
      var lastMachineStatusHistory = lastLoomHistory.MachineStatus;
      switch (lastMachineStatusHistory) {
        case "ENTRY":
          this.isStartDisabled = false;
          this.isFinishDisabled = true;
          break;
        case "START":
          this.isStartDisabled = true;
          this.isFinishDisabled = false;
          break;
        case "COMPLETED":
          var isAllBeamProcessed = 0;
          this.BeamsUsed.forEach(beamProduct => {
            if (beamProduct.BeamUsedStatus == "ON-PROCESS") {
              isAllBeamProcessed++;
            }
          });
          if (isAllBeamProcessed == 0) {
            this.isStartDisabled = true;
            this.isFinishDisabled = true;
          } else {
            this.isStartDisabled = false;
            this.isFinishDisabled = true;
          }
          break;
        default:
          this.isStartDisabled = true;
          this.isFinishDisabled = true;
          break;
      }

      // this.dataOptions = this.data;
    }
  }

  causes = ["", "Putus Beam", "Mesin Bermasalah"];

  get operators() {
    return OperatorLoader;
  }

  get loomBeamsUsed() {
    return LoomBeamProductsLoader;
  }

  start() {
    this.StartDate = undefined;
    this.StartTime = null;
    this.StartShift = undefined;
    this.StartOperator = undefined;
    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHideFinishMenu = false;
    }
  }

  finish() {
    this.FinishFinishDate = undefined;
    this.FinishFinishTime = null;
    this.FinishFinishShift = undefined;
    this.FinishFinishOperator = undefined;
    if (this.showHideFinishMenu === true) {
      this.showHideFinishMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHideFinishMenu = true;
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

  StartLoomBeamDocumentsChanged(newValue) {
    if (newValue.MachineNumber) {
      this.StartMachineNumber = newValue.MachineNumber;
    }
  }

  saveStart() {
    this.error = {};
    var IdContainer = this.data.Id;
    if (this.StartDate) {
      var StartDateContainer = moment(this.StartDate).utcOffset("+07:00").format();
    }
    if (this.StartTime) {
      var StartTimeContainer = this.StartTime;
    }
    if (this.StartShift) {
      var StartShiftIdContainer = this.StartShift.Id;
    }
    if (this.StartOperator) {
      var StartOperatorIdContainer = this.StartOperator.Id;
    }
    if (this.StartLoomBeamDocuments) {
      var StartBeamNumberContainer = this.StartLoomBeamDocuments.BeamNumber;
      var StartBeamIdContainer = this.StartLoomBeamDocuments.Id;
    }
    if (this.StartMachineNumber) {
      var StartMachineNumberContainer = this.StartMachineNumber;
    }

    var startData = {};
    startData.Id = IdContainer;
    startData.StartBeamProductId = StartBeamIdContainer;
    startData.StartBeamNumber = StartBeamNumberContainer;
    startData.StartMachineNumber = StartMachineNumberContainer;
    startData.StartDateMachine = StartDateContainer;
    startData.StartTimeMachine = StartTimeContainer;
    startData.StartShiftDocumentId = StartShiftIdContainer;
    startData.StartOperatorDocumentId = StartOperatorIdContainer;

    this.service
      .updateStart(startData.Id, startData)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error = e;
      });
  }

  FinishTimeChanged(newValue) {
    this.service.getShiftByTime(newValue)
      .then(result => {
        this.error.FinishShift = "";
        this.FinishShift = {};
        this.FinishShift = result;
      })
      .catch(e => {
        this.FinishShift = {};
        this.error.FinishShift = " Shift tidak ditemukan ";
      });
  }

  saveFinish() {
    var IdContainer = this.data.Id;

    if (this.data.DailyOperationLoomBeamHistories.length > 0) {
      var LastHistory = this.data.DailyOperationLoomBeamHistories[0];
    }

    var beamProductBeamId = ""
    this.BeamsUsed.forEach(beamProduct => {
      if (beamProduct.BeamNumber == LastHistory.BeamNumber) {
        beamProductBeamId = beamProduct.BeamDocumentId;
      }
    });
    if (this.FinishDate) {
      var HistoryDateContainer = moment(this.FinishDate).utcOffset("+07:00").format();
    }
    if (this.FinishTime) {
      var HistoryTimeContainer = this.FinishTime;
    }
    if (this.FinishShift) {
      var ShiftContainer = this.FinishShift.Id;
    }
    if (this.FinishOperator) {
      var OperatorContainer = this.FinishOperator.Id;
    }

    var updateData = {};
    updateData.Id = IdContainer;
    updateData.FinishBeamProductBeamId = beamProductBeamId;
    updateData.FinishBeamNumber = LastHistory.BeamNumber;;
    updateData.FinishMachineNumber = LastHistory.MachineNumber;;
    updateData.FinishDateMachine = HistoryDateContainer;
    updateData.FinishTimeMachine = HistoryTimeContainer;
    updateData.FinishShiftDocumentId = ShiftContainer;
    updateData.FinishOperatorDocumentId = OperatorContainer;

    this.service
      .updateFinish(updateData.Id, updateData)
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
