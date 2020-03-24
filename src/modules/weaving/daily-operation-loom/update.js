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
var LoomBeamsUsedLoader = require("../../../loader/weaving-loom-beams-used-loader");
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
    this.isReprocessDisabled = false;
    this.isProduceGreigeDisabled = false;

    this.isTying = false;
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
      value: "TyingGrup",
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
      value: "LoomGrup",
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
    this.data = await this.service
      .getById(Id);

    if (this.data.Id) {
      this.OperationIdFilter = {
        "LoomOperationId": this.data.Id
      };

      this.Histories = this.data.DailyOperationLoomBeamHistories;
      let isOnProcessBeam = (this.Histories.indexOf('ON-PROCESS-BEAM') > -1);

      this.BeamsUsed = this.data.DailyOperationLoomBeamsUsed;
      var isAllBeamProcessed = 0;
      this.BeamsUsed.forEach(beamUsed => {
        if (beamUsed.BeamUsedStatus == "COMPLETED") {
          isAllBeamProcessed++;
        }
      });

      // if (isOnProcessBeam === true) {
      //   if (isAllBeamProcessed === this.data.BeamProcessed) {
      //     this.isStartDisabled = false;
      //     this.isReprocessDisabled = false;
      //     this.isProduceGreigeDisabled = false;
      //     console.log("true, ga ada yg diproses gan");
      //   } else {
      //     this.isStartDisabled = true;
      //     this.isReprocessDisabled = false;
      //     this.isProduceGreigeDisabled = false;
      //     console.log("true, masih ada yg diproses gan");
      //   }
      // } else {
      //   console.log("false gan");
      //   this.isStartDisabled = false;
      //   this.isReprocessDisabled = true;
      //   this.isProduceGreigeDisabled = true;
      // }
    }
  }

  get operators() {
    return OperatorLoader;
  }

  get loomBeamsUsed() {
    return LoomBeamsUsedLoader;
  }

  get loomBeamsUsedProcessed() {
    return LoomBeamsUsedLoader;
  }

  start() {
    // console.log("StartLoomBeamDocuments :", this.StartLoomBeamDocuments);
    // console.log("StartTyingOperator :", this.StartTyingOperator);
    // console.log("StartLoomOperator :", this.StartLoomOperator);
    // console.log("StartDate :", this.StartDate);
    // console.log("StartTime :", this.StartTime);
    // console.log("StartShift :", this.StartShift);
    this.StartLoomBeamDocuments = null;
    this.StartTyingOperator = undefined;
    this.StartLoomOperator = undefined;
    this.StartDate = undefined;
    this.StartTime = null;
    this.StartShift = undefined;

    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHideProduceGreigeMenu = false;
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

  async StartLoomBeamDocumentsChanged(newValue) {
    console.log(newValue);
    if (newValue.Id) {
      this.StartLoomMachine = newValue.LoomMachineNumber;
      if (newValue.BeamOrigin === "TYING") {
        this.isTying = true;
        this.StartTyingMachine = newValue.TyingMachineNumber;
        this.StartTyingOperator = await this.service
          .getOperatorById(newValue.TyingOperatorId);
      }
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

  reprocess() {
    this.StartDate = undefined;
    this.StartTime = null;
    this.StartShift = undefined;
    this.StartOperator = undefined;
    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHideProduceGreigeMenu = false;
    }
  }

  produceGreige() {
    this.FinishFinishDate = undefined;
    this.FinishFinishTime = null;
    this.FinishFinishShift = undefined;
    this.FinishFinishOperator = undefined;
    if (this.showHideProduceGreigeMenu === true) {
      this.showHideProduceGreigeMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHideProduceGreigeMenu = true;
    }
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
