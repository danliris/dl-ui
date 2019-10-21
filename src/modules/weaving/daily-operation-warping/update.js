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
  @bindable PauseTime;
  @bindable ResumeTime;
  @bindable ProduceBeamsTime;
  @bindable FinishTime;
  @bindable BrokenThreads;
  @bindable LooseThreads;

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
    this.isPauseDisabled = false;
    this.isResumeDisabled = false;
    this.isProduceBeamDisabled = false;
    this.isFinishDisabled = false;
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

      var lastWarpingHistory = this.Histories[0];
      var lastWarpingHistoryStatus = lastWarpingHistory.MachineStatus
      switch (lastWarpingHistoryStatus) {
        case "ENTRY":
          this.isStartDisabled = false;
          this.isPauseDisabled = true;
          this.isResumeDisabled = true;
          this.isProduceBeamDisabled = true;
          this.isFinishDisabled = true;
          break;
        case "START":
          this.isStartDisabled = true;
          this.isPauseDisabled = false;
          this.isResumeDisabled = true;
          this.isProduceBeamDisabled = false;
          this.isFinishDisabled = true;
          break;
        case "STOP":
          this.isStartDisabled = true;
          this.isPauseDisabled = true;
          this.isResumeDisabled = false;
          this.isProduceBeamDisabled = true;
          this.isFinishDisabled = true;
          break;
        case "CONTINUE":
          this.isStartDisabled = true;
          this.isPauseDisabled = false;
          this.isResumeDisabled = true;
          this.isProduceBeamDisabled = false;
          this.isFinishDisabled = true;
          break;
        case "COMPLETED":
          this.isStartDisabled = false;
          this.isPauseDisabled = true;
          this.isResumeDisabled = true;
          this.isProduceBeamDisabled = true;
          this.isFinishDisabled = false;
          break;
        case "FINISH":
          this.isStartDisabled = true;
          this.isPauseDisabled = true;
          this.isResumeDisabled = true;
          this.isProduceBeamDisabled = true;
          this.isFinishDisabled = true;
          break;
        default:
          this.isStartDisabled = false;
          this.isPauseDisabled = false;
          this.isResumeDisabled = false;
          this.isProduceBeamDisabled = false;
          this.isFinishDisabled = false;
          break;
      }
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
      value: "WarpingBeamStatus",
      header: "Status Beam Warping"
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

  brokenThreadsClicked(event) {
    let targetValue = event.target.checked;

    if (targetValue) {
      this.showHideBrokenThreadsMenu = true;
    } else {
      this.showHideBrokenThreadsMenu = false;
    }
  }

  looseThreadsClicked(event) {
    let targetValue = event.target.checked;

    if (targetValue) {
      this.showHideLooseThreadsMenu = true;
    } else {
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
    this.error = {};
    this.error.error = {};

    var BrokenThreadsCauseContainer;
    var ConeDeficientContainer;
    var LooseThreadsAmountContainer;
    var RightLooseCreelContainer;
    var LeftLooseCreelContainer;

    //Lempar Error Jika Penyebabab Putus Benang dan Benang Lolos Tidak Dicentang
    if ((this.BrokenThreads == false || this.BrokenThreads == null || this.BrokenThreads == undefined) && (this.LooseThreads == false || this.LooseThreads == null || this.LooseThreads == undefined)) {
      this.error.BrokenThreads = "Penyebab Putus Benang atau Benang Lolos Harus Diisi";
      this.error.LooseThreads = "Penyebab Putus Benang atau Benang Lolos Harus Diisi";
    } else {

      //Untuk Kondisi Putus Benang Dicentang DAN Benang Lolos Tidak Dicentang
      if (this.BrokenThreads == true && (this.LooseThreads == false || this.LooseThreads == null || this.LooseThreads == undefined)) {
        let BeamProducts = this.data.DailyOperationWarpingBeamProducts;

        //Jika Produk Beam Sebelumnya Sudah Ada
        if (BeamProducts != null || BeamProducts != undefined) {
          var LastBeamProduct = this.data.DailyOperationWarpingBeamProducts[0];
          //Cek Penyebab Benang Putus Sudah Diisi
          //Jika Diisi
          if (this.BrokenThreadsCause === "Benang Tipis") {
            BrokenThreadsCauseContainer = LastBeamProduct.BrokenThreadsCause + 1;
          }
          //Lempar Error Jika Tidak Diisi
          else {
            this.error.error.BrokenThreadsCause = "Penyebab Putus Benang Harus Diisi";
          }

          //Cek Cone Panjang Kurang Sudah Diisi
          //Jika Diisi
          if (this.ConeDeficient) {
            ConeDeficientContainer = this.ConeDeficient + LastBeamProduct.ConeDeficient;
          }
          //Jika Tidak Diisi
          else {
            ConeDeficientContainer = LastBeamProduct.ConeDeficient;
          }
        }

        //Jika Produk Beam Sebelumnya Belum Ada
        else {
          //Cek Penyebab Benang Putus Sudah Diisi
          //Jika Diisi
          if (this.BrokenThreadsCause === "Benang Tipis") {
            BrokenThreadsCauseContainer = 1;
          }
          //Lempar Error Jika Tidak Diisi
          else {
            this.error.error.BrokenThreadsCause = "Penyebab Putus Benang Harus Diisi";
          }

          //Cek Cone Panjang Kurang Sudah Diisi
          //Jika Diisi
          if (this.ConeDeficient != 0) {
            ConeDeficientContainer = this.ConeDeficient;
          }
          //Jika Tidak Diisi
          else {
            ConeDeficientContainer = 0;
          }
        }
        // } else {
        //   //Jika Beam Product Sebelumnya Sudah Ada
        //   if (BeamProducts.length != null || BeamProducts != undefined) {
        //     var LastBeamProduct = this.data.DailyOperationWarpingBeamProducts[0];

        //     //Ambil Value dari Elemen Terakhir dari Array Produk Beam
        //     LooseThreadsAmountContainer = LastBeamProduct.LooseThreadsAmount;
        //     RightLooseCreelContainer = LastBeamProduct.RightLooseCreel;
        //     LeftLooseCreelContainer = LastBeamProduct.LeftLooseCreel;
        //   } else {
        //     //Beri Nilai Default 0 Karena Benang Lolos Tidak Dicentang Dan Belum Ada Produk Beam (Array)
        //     LooseThreadsAmountContainer = 0;
        //     RightLooseCreelContainer = 0;
        //     LeftLooseCreelContainer = 0;
        //   }
      }

      //Untuk Kondisi Putus Benang Tidak Dicentang DAN Benang Lolos Dicentang
      if ((this.BrokenThreads == false || this.BrokenThreads == null || this.BrokenThreads == undefined) && this.LooseThreads == true) {
        let BeamProducts = this.data.DailyOperationWarpingBeamProducts;

        //Jika Produk Beam Sebelumnya Sudah Ada
        if (BeamProducts != null || BeamProducts != undefined) {
          var LastBeamProduct = this.data.DailyOperationWarpingBeamProducts[0];

          //Cek Benang Lolos Sudah Diisi (Tidak 0)
          //Jika Diisi
          if (this.LooseThreadsAmount != 0) {
            LooseThreadsAmountContainer = this.LooseThreadsAmount + LastBeamProduct.LooseThreadsAmount;
          }
          //Lempar Error Jika Tidak Diisi
          else {
            this.error.error.LooseThreadsAmount = "Jumlah Benang Lolos Tidak Boleh 0";
          }

          //Cek Creel Lolos Kanan
          //Jika Diisi
          if (this.RightLooseCreel != 0) {
            RightLooseCreelContainer = this.RightLooseCreel + LastBeamProduct.RightLooseCreel;
          }
          //Nilai Default Jika Tidak Diisi 
          else {
            RightLooseCreelContainer = LastBeamProduct.RightLooseCreel;
          }

          //Cek Creel Lolos Kiri
          //Jika Diisi
          if (this.LeftLooseCreel != 0) {
            LeftLooseCreelContainer = this.LeftLooseCreel + LastBeamProduct.LeftLooseCreel;
          }
          //Nilai Default Jika Tidak Diisi 
          else {
            LeftLooseCreelContainer = LastBeamProduct.LeftLooseCreel;
          }
        }

        //Jika Produk Beam Sebelumnya Belum Ada
        else {
          //Cek Benang Lolos Sudah Diisi (Tidak 0)
          //Jika Diisi
          if (this.LooseThreadsAmount != 0) {
            LooseThreadsAmountContainer = this.LooseThreadsAmount;
          }
          //Lempar Error Jika Tidak Diisi
          else {
            this.error.error.LooseThreadsAmount = "Jumlah Benang Lolos Tidak Boleh 0";
          }

          //Cek Creel Lolos Kanan
          //Jika Diisi
          if (this.RightLooseCreel != 0) {
            RightLooseCreelContainer = this.RightLooseCreel;
          }
          //Nilai Default Jika Tidak Diisi 
          else {
            RightLooseCreelContainer = 0;
          }

          //Cek Creel Lolos Kiri
          //Jika Diisi
          if (this.LeftLooseCreel != 0) {
            LeftLooseCreelContainer = this.LeftLooseCreel;
          }
          //Nilai Default Jika Tidak Diisi 
          else {
            LeftLooseCreelContainer = 0;
          }
        }
        // } else {
        //     //Jika Beam Product Sebelumnya Sudah Ada
        //     if (BeamProducts.length != null || BeamProducts != undefined) {
        //       var LastBeamProduct = this.data.DailyOperationWarpingBeamProducts[0];

        //       //Ambil Value dari Elemen Terakhir dari Array Produk Beam
        //       BrokenThreadsCauseContainer = LastBeamProduct.BrokenThreadsCause;
        //       ConeDeficientContainer = LastBeamProduct.ConeDeficient;
        //     } else {
        //       //Beri Nilai Default 0 Karena Benang Lolos Tidak Dicentang Dan Belum Ada Produk Beam (Array)
        //       BrokenThreadsCauseContainer = 0;
        //       ConeDeficientContainer = 0;
        //     }
      }

      //Untuk Kondisi Putus Benang Dicentang DAN Benang Lolos Dicentang (Dicentang Dua-duanya)
      if (this.BrokenThreads == true && this.LooseThreads == true) {
        let BeamProducts = this.data.DailyOperationWarpingBeamProducts;

        //Jika Produk Beam Sebelumnya Sudah Ada
        if (BeamProducts != null || BeamProducts != undefined) {
          var LastBeamProduct = this.data.DailyOperationWarpingBeamProducts[0];
          //Cek Penyebab Benang Putus Sudah Diisi
          //Jika Diisi
          if (this.BrokenThreadsCause === "Benang Tipis") {
            BrokenThreadsCauseContainer = LastBeamProduct.BrokenThreadsCause + 1;
          }
          //Lempar Error Jika Tidak Diisi
          else {
            this.error.error.BrokenThreadsCause = "Penyebab Putus Benang Harus Diisi";
          }

          //Cek Cone Panjang Kurang Sudah Diisi
          //Jika Diisi
          if (this.ConeDeficient != 0) {
            ConeDeficientContainer = this.ConeDeficient + LastBeamProduct.ConeDeficient;
          }
          //Jika Tidak Diisi
          else {
            ConeDeficientContainer = LastBeamProduct.ConeDeficient;
          }

          //Cek Benang Lolos Sudah Diisi (Tidak 0)
          //Jika Diisi
          if (this.LooseThreadsAmount != 0) {
            LooseThreadsAmountContainer = this.LooseThreadsAmount + LastBeamProduct.LooseThreadsAmount;
          }
          //Lempar Error Jika Tidak Diisi
          else {
            this.error.error.LooseThreadsAmount = "Jumlah Benang Lolos Tidak Boleh 0";
          }

          //Cek Creel Lolos Kanan
          //Jika Diisi
          if (this.RightLooseCreel != 0) {
            RightLooseCreelContainer = this.RightLooseCreel + LastBeamProduct.RightLooseCreel;
          }
          //Nilai Default Jika Tidak Diisi 
          else {
            RightLooseCreelContainer = LastBeamProduct.RightLooseCreel;
          }

          //Cek Creel Lolos Kiri
          //Jika Diisi
          if (this.LeftLooseCreel != 0) {
            LeftLooseCreelContainer = this.LeftLooseCreel + LastBeamProduct.LeftLooseCreel;
          }
          //Nilai Default Jika Tidak Diisi 
          else {
            LeftLooseCreelContainer = LastBeamProduct.LeftLooseCreel;
          }
        }

        //Jika Produk Beam Sebelumnya Belum Ada
        else {
          //Cek Penyebab Benang Putus Sudah Diisi
          //Jika Diisi
          if (this.BrokenThreadsCause === "Benang Tipis") {
            BrokenThreadsCauseContainer = 1;
          }
          //Lempar Error Jika Tidak Diisi
          else {
            this.error.error.BrokenThreadsCause = "Penyebab Putus Benang Harus Diisi";
          }

          //Cek Cone Panjang Kurang Sudah Diisi
          //Jika Diisi
          if (this.ConeDeficient != 0) {
            ConeDeficientContainer = this.ConeDeficient;
          }
          //Jika Tidak Diisi
          else {
            ConeDeficientContainer = 0;
          }

          //Cek Benang Lolos Sudah Diisi (Tidak 0)
          //Jika Diisi
          if (this.LooseThreadsAmount != 0) {
            LooseThreadsAmountContainer = this.LooseThreadsAmount + LastBeamProduct.LooseThreadsAmount;
          }
          //Lempar Error Jika Tidak Diisi
          else {
            this.error.error.LooseThreadsAmount = "Jumlah Benang Lolos Tidak Boleh 0";
          }

          //Cek Creel Lolos Kanan
          //Jika Diisi
          if (this.RightLooseCreel != 0) {
            RightLooseCreelContainer = this.RightLooseCreel;
          }
          //Nilai Default Jika Tidak Diisi 
          else {
            RightLooseCreelContainer = 0;
          }

          //Cek Creel Lolos Kiri
          //Jika Diisi
          if (this.LeftLooseCreel != 0) {
            LeftLooseCreelContainer = this.LeftLooseCreel;
          }
          //Nilai Default Jika Tidak Diisi 
          else {
            LeftLooseCreelContainer = 0;
          }
        }
      }
      // } else {
      //   //Jika Beam Product Sebelumnya Sudah Ada
      //   if (BeamProducts.length != null || BeamProducts != undefined) {
      //     var LastBeamProduct = this.data.DailyOperationWarpingBeamProducts[0];

      //     //Ambil Value dari Elemen Terakhir dari Array Produk Beam
      //     BrokenThreadsCauseContainer = LastBeamProduct.BrokenThreadsCause;
      //     ConeDeficientContainer = LastBeamProduct.ConeDeficient;
      //     LooseThreadsAmountContainer = LastBeamProduct.LooseThreadsAmount;
      //     RightLooseCreelContainer = LastBeamProduct.RightLooseCreel;
      //     LeftLooseCreelContainer = LastBeamProduct.LeftLooseCreel;
      //   } else {
      //     //Beri Nilai Default 0 Karena Benang Lolos Tidak Dicentang Dan Belum Ada Produk Beam (Array)
      //     BrokenThreadsCauseContainer = 0;
      //     ConeDeficientContainer = 0;
      //     LooseThreadsAmountContainer = 0;
      //     RightLooseCreelContainer = 0;
      //     LeftLooseCreelContainer = 0;
      //   }
    }

    // let BeamProducts = this.data.DailyOperationWarpingBeamProducts;
    // if (BeamProducts.length != null || BeamProducts != undefined) {
    //   var LastBeamProduct = this.data.DailyOperationWarpingBeamProducts[0];

    //   if (this.BrokenThreads == true) {
    //     if (this.BrokenThreadsCause === "Benang Tipis") {
    //       BrokenThreadsCauseContainer = LastBeamProduct.BrokenThreadsCause + 1;
    //     } else {
    //       this.error.BrokenThreadsCause = "Penyebab Putus Benang Harus Diisi";
    //     }

    //     if (this.ConeDeficient) {
    //       ConeDeficientContainer = this.ConeDeficient + LastBeamProduct.ConeDeficient;
    //     } else {
    //       ConeDeficientContainer = LastBeamProduct.ConeDeficient;
    //     }
    //   } else {
    //     BrokenThreadsCauseContainer = 0;
    //   }

    //   if (this.LooseThreads == true) {
    //     if (!this.LooseThreadsAmount == 0) {
    //       LooseThreadsAmountContainer = this.LooseThreadsAmount + LastBeamProduct.LooseThreadsAmount;
    //     } else {
    //       this.error.LooseThreadsAmount = "Jumlah Benang Lolos Tidak Boleh 0";
    //     }

    //     if (this.RightLooseCreel) {
    //       RightLooseCreelContainer = this.RightLooseCreel + LastBeamProduct.RightLooseCreel;
    //     } else {
    //       RightLooseCreelContainer = LastBeamProduct.RightLooseCreel;
    //     }

    //     if (this.LeftLooseCreel) {
    //       LeftLooseCreelContainer = this.LeftLooseCreel + LastBeamProduct.LeftLooseCreel;
    //     } else {
    //       LeftLooseCreelContainer = LastBeamProduct.LeftLooseCreel;
    //     }
    //   } else {
    //     LooseThreadsAmountContainer = 0;
    //   }
    // } else {
    //   this.error.BrokenThreads = "Penyebab Putus Benang Harus Diisi";
    //   this.error.LooseThreads = "Jumlah Benang Lolos Tidak Boleh 0";

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

    this.service
      .updatePauseProcess(this.data.Id, this.data)
      .then(result => {
        location.reload();
      })
      .catch(e => {
        if (this.error.error.BrokenThreadsCause) {
          e.BrokenThreadsCause = this.error.error.BrokenThreadsCause;
        }
        if (this.error.error.LooseThreadsAmount) {
          e.LooseThreadsAmount = this.error.error.LooseThreadsAmount;
        }
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
    var WarpingBeamLengthUOMIdContainer;
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
    if (this.WarpingBeamLengthUOM) {
      WarpingBeamLengthUOMIdContainer = this.WarpingBeamLengthUOM.Id;
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
    this.data.WarpingBeamLengthUOMId = WarpingBeamLengthUOMIdContainer;
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

    this.data = {};
    this.data.Id = IdContainer;
    this.data.FinishDate = HistoryDateContainer;
    this.data.FinishTime = HistoryTimeContainer;
    this.data.FinishShift = ShiftContainer;
    this.data.FinishOperator = OperatorContainer;

    this.service
      .updateFinishProcess(this.data.Id, this.data)
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
