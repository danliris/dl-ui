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
var BeamLoader = require("../../../loader/weaving-beam-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service, BindingEngine)
export class Update {
  @bindable StartTime;
  @bindable PauseTime;
  @bindable ResumeTime;
  @bindable ProduceBeamsTime;
  @bindable FinishTime;

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};
    this.error = {};
    this.error.error = {};

    this.showHideBrokenThreadsMenu = false;
    this.showHideLooseThreadsMenu = false;
  }

  // bind(context) {
  //   this.context = context;
  //   this.data = this.context.data;
  //   this.error = this.context.error;
  // }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

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
      console.log(this.data);
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
      value: "BrokenThreadsCause",
      header: "Benang Tipis Putus"
    },
    {
      value: "ConeDeficient",
      header: "Cone Panjang Kurang"
    },
    {
      value: "LooseThreadsAmount",
      header: "Benang Lolos"
    },
    {
      value: "RightLooseCreel",
      header: "Creel Lolos (Kanan)"
    },
    {
      value: "LeftLooseCreel",
      header: "Creel Lolos (Kiri)"
    },
    {
      value: "WarpingBeamLength",
      header: "Panjang Beam"
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
      value: "BeamStatus",
      header: "Status Beam"
    }
  ];

  dailyOperationHistoriesColumns = [{
      value: "WarpingBeamNumber",
      header: "No. Beam Warping"
    },
    {
      value: "MachineDate",
      header: "Tanggal"
    },
    {
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
      value: "OperatorGroup",
      header: "Group"
    },
    {
      value: "OperationStatus",
      header: "Status"
    }
  ];

  get operators() {
    return OperatorLoader;
  }

  get beams() {
    return BeamLoader;
  }

  brokenThreadsClicked(event) {
    let targetValue = event.target.checked;

    if (targetValue) {
      console.log("Broken Threads Checked");
      console.log(this.BrokenThreads);
      this.showHideBrokenThreadsMenu = true;
    } else {
      console.log("Broken Threads Unchecked");
      console.log(this.BrokenThreads);
      this.showHideBrokenThreadsMenu = false;
    }
  }

  looseThreadsClicked(event) {
    let targetValue = event.target.checked;

    if (targetValue) {
      console.log("Loose Threads Checked");
      console.log(this.LooseThreads);
      this.showHideLooseThreadsMenu = true;
    } else {
      console.log("Loose Threads Unchecked");
      console.log(this.LooseThreads);
      this.showHideLooseThreadsMenu = false;
    }
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

  pause() {
    this.PauseDate = undefined;
    this.PauseTime = null;
    this.PauseShift = undefined;
    this.PauseOperator = undefined;
    this.Information = undefined;
    if (this.showHidePauseMenu === true) {
      this.showHidePauseMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = true;
      this.showHideResumeMenu = false;
      this.showHideProduceBeamsMenu = false;
      this.showHideFinishMenu = false;
    }
  }

  resume() {
    this.ResumeDate = undefined;
    this.ResumeTime = null;
    this.ResumeShift = undefined;
    this.ResumeOperator = undefined;
    if (this.showHideResumeMenu === true) {
      this.showHideResumeMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = true;
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

  finish() {
    this.MachineSpeed = 0;
    this.FinishTexSQ = undefined;
    this.FinishVisco = undefined;
    this.FinishDate = undefined;
    this.FinishTime = null;
    this.FinishShift = undefined;
    this.FinishOperator = undefined;
    if (this.showHideFinishMenu === true) {
      this.showHideFinishMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = false;
      this.showHideProduceBeamsMenu = false;
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

    debugger

    this.service
      .updateStartProcess(this.data.Id, this.data)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error.error = e;
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
    // console.log(this.BrokenThreadsCause);
    // console.log(this.ConeDeficient);
    // console.log(this.LooseThreadsAmount);
    // console.log(this.RightLooseCreel);
    // console.log(this.LeftLooseCreel);
    // if (this.ConeDeficient == null) {
    //   console.log("null");
    // }
    // if (this.ConeDeficient == undefined) {
    //   console.log("undefined");
    // }
    // if (this.ConeDeficient == "") {
    //   console.log("kosong");
    // }
    var BrokenThreadsCauseContainer;
    var ConeDeficientContainer;
    var LooseThreadsAmountContainer;
    var RightLooseCreelContainer;
    var LeftLooseCreelContainer;

    var BeamProducts = this.data.DailyOperationWarpingBeamProducts;
    if (this.BrokenThreads == true || this.LooseThreads == true) {
      if (BeamProducts.length > 0) {
        var LastBeamProduct = this.data.DailyOperationWarpingBeamProducts[0];
        // if (LastBeamProduct.BrokenThreadsCause) {
          if (this.BrokenThreads == true) {
            if (this.BrokenThreadsCause === "Benang Tipis") {
              BrokenThreadsCauseContainer = LastBeamProduct.BrokenThreadsCause + 1;
            } else {
              this.error.BrokenThreadsCause = "Penyebab Putus Benang Harus Diisi";
            }
          } else {
            BrokenThreadsCauseContainer = LastBeamProduct.BrokenThreadsCause;
          }
        // }
        // if (LastBeamProduct.ConeDeficient) {
          if (this.ConeDeficient) {
            ConeDeficientContainer = this.ConeDeficient + LastBeamProduct.ConeDeficient;
          } else {
            ConeDeficientContainer = LastBeamProduct.ConeDeficient;
          }
        // }
        // if (LastBeamProduct.LooseThreadsAmount) {
          if (this.LooseThreads == true) {
            if (!this.LooseThreadsAmount == 0) {
              LooseThreadsAmountContainer = this.LooseThreadsAmount + LastBeamProduct.LooseThreadsAmount;
            } else {
              this.error.LooseThreadsAmount = "Jumlah Benang Lolos Tidak Boleh 0";
            }
          } else {
            LooseThreadsAmountContainer = LastBeamProduct.LooseThreadsAmount;
          }
        // }
        // if (LastBeamProduct.RightLooseCreel) {
          if (this.RightLooseCreel) {
            RightLooseCreelContainer = this.RightLooseCreel + LastBeamProduct.RightLooseCreel;
          } else {
            RightLooseCreelContainer = LastBeamProduct.RightLooseCreel;
          }
        // }
        // if (LastBeamProduct.LeftLooseCreel) {
          if (this.LeftLooseCreel) {
            LeftLooseCreelContainer = this.LeftLooseCreel + LastBeamProduct.LeftLooseCreel;
          } else {
            LeftLooseCreelContainer = LastBeamProduct.LeftLooseCreel;
          }
        // }
      }
    } else {
      this.error.BrokenThreads = "Penyebab Putus Benang Harus Diisi";
      this.error.LooseThreads = "Jumlah Benang Lolos Tidak Boleh 0";

    }

    // switch (this.CauseOfStopping) {
    //   case "Putus Beam":
    //     LastCausesBrokenBeam = LastCausesBrokenBeam + 1;
    //     break;
    //   case "Mesin Bermasalah":
    //     LastCausesMachineTroubled = LastCausesMachineTroubled + 1;
    //     break;
    //   default:
    //     this.error.CauseOfStopping = "Penyebab berhenti harus diisi";
    // }

    var IdContainer = this.data.Id;
    if (this.PauseDate) {
      var HistoryDateContainer = moment(this.PauseDate).utcOffset("+07:00").format();
    }
    if (this.PauseTime) {
      var HistoryTimeContainer = this.PauseTime;
    }
    if (this.PauseShift) {
      var ShiftContainer = this.PauseShift.Id;
    }
    if (this.PauseOperator) {
      var OperatorContainer = this.PauseOperator.Id;
    }
    if (this.Information) {
      var InformationContainer = this.Information;
    }

    this.data = {};
    this.data.Id = IdContainer;
    this.data.PauseDate = HistoryDateContainer;
    this.data.PauseTime = HistoryTimeContainer;
    this.data.PauseShift = ShiftContainer;
    this.data.PauseOperator = OperatorContainer;
    this.data.Information = InformationContainer;
    this.data.BrokenThreadsCause = BrokenThreadsCauseContainer;
    this.data.ConeDeficient = ConeDeficientContainer;
    this.data.LooseThreadsAmount = LooseThreadsAmountContainer;
    this.data.RightLooseCreel = RightLooseCreelContainer;
    this.data.LeftLooseCreel = LeftLooseCreelContainer;

    // this.data.SizingDetails = {};
    // this.data.SizingDetails.PauseDate = HistoryDateContainer;
    // this.data.SizingDetails.PauseTime = HistoryTimeContainer;
    // this.data.SizingDetails.Information = InformationContainer;
    // this.data.SizingDetails.ShiftId = ShiftContainer;
    // this.data.SizingDetails.OperatorDocumentId = OperatorContainer;
    // this.data.SizingDetails.Causes = {};
    // this.data.SizingDetails.Causes.BrokenBeam = LastCausesBrokenBeam.toString();
    // this.data.SizingDetails.Causes.MachineTroubled = LastCausesMachineTroubled.toString();

    this.service
      .updatePauseProcess(this.data.Id, this.data)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error.error = e;
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
    if (this.ResumeDate) {
      var HistoryDateContainer = moment(this.ResumeDate).utcOffset("+07:00").format();
    }
    if (this.ResumeTime) {
      var HistoryTimeContainer = this.ResumeTime;
    }
    if (this.ResumeShift) {
      var ShiftContainer = this.ResumeShift.Id;
    }
    if (this.ResumeOperator) {
      var OperatorContainer = this.ResumeOperator.Id;
    }

    this.data = {};
    this.data.Id = IdContainer;
    this.data.ResumeDate = HistoryDateContainer;
    this.data.ResumeTime = HistoryTimeContainer;
    this.data.ResumeShift = ShiftContainer;
    this.data.ResumeOperator = OperatorContainer;

    this.service
      .updateResumeProcess(this.data.Id, this.data)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        this.error.error = e;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
