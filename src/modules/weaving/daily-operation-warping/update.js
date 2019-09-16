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
import {
  Dialog
} from '../../../components/dialog/dialog';
import moment from "moment";
var BeamLoader = require("../../../loader/weaving-beam-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service, BindingEngine)
export class Update {

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.data = {};
    this.error = {};

    this.showHideBrokenThreadsMenu = false;
    this.showHideLooseThreadsMenu = false;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

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
      header: "Tanggal",
      value: "DateOperation"
    },
    {
      header: "Waktu",
      value: "TimeOperation"
    },
    {
      header: "Shift",
      value: "ShiftName"
    },
    {
      header: "Operator",
      value: "BeamOperatorName"
    },
    {
      header: "Group",
      value: "BeamOperatorGroup"
    },
    {
      header: "Status",
      value: "OperationStatus"
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
      this.showHideBrokenThreadsMenu = true;
    } else {
      console.log("Broken Threads Unchecked");
      this.showHideBrokenThreadsMenu = false;
    }
  }

  looseThreadsClicked(event) {
    let targetValue = event.target.checked;

    if (targetValue) {
      console.log("Loose Threads Checked");
      this.showHideLooseThreadsMenu = true;
    } else {
      console.log("Loose Threads Unchecked");
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
      this.showHideDoffMenu = false;
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
      this.showHideDoffMenu = false;
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
      this.showHideDoffMenu = false;
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
      this.showHideDoffMenu = false;
    }
  }

  finish() {
    this.MachineSpeed = 0;
    this.DoffTexSQ = undefined;
    this.DoffVisco = undefined;
    this.DoffDate = undefined;
    this.DoffTime = null;
    this.DoffShift = undefined;
    this.DoffOperator = undefined;
    if (this.showHideDoffMenu === true) {
      this.showHideDoffMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = false;
      this.showHideProduceBeamsMenu = false;
      this.showHideDoffMenu = true;
    }
  }

  back() {
    this.router.navigateToRoute("list");
    // this.list();
  }

  // start() {
  //   $("#Mulai").modal('hide');
  //   this.error = {};

  //   this.service
  //     .updateForStartProcess(this.data)
  //     .then(result => {
  //       this.data.LoomHistory = [];

  //       if (result.length > 0) {

  //       }

  //       this.data.LoomHistory = result;
  //     }).catch(e => {
  //       var errorStatus = e.Status;
  //       this.dialog.errorPrompt(errorStatus);
  //     });
  // }

  // stop() {
  //   $("#Berhenti").modal('hide');
  //   this.error = {};

  //   this.service
  //     .updateForStopProcess(this.data)
  //     .then(result => {

  //       this.data.LoomHistory = [];

  //       if (result.length > 0) {
  //         result = this.remappingModels(result);
  //       }

  //       this.data.LoomHistory = result;
  //     }).catch(e => {
  //       var errorStatus = e.Status;
  //       this.dialog.errorPrompt(errorStatus);
  //     });
  // }

  // resume() {
  //   $("#Melanjutkan").modal('hide');
  //   this.error = {};

  //   this.service
  //     .updateForResumeProcess(this.data)
  //     .then(result => {

  //       this.data.LoomHistory = [];

  //       if (result.length > 0) {
  //         result = this.remappingModels(result);
  //       }

  //       this.data.LoomHistory = result;
  //     }).catch(e => {
  //       var errorStatus = e.Status;
  //       this.dialog.errorPrompt(errorStatus);
  //     });
  // }

  // finish() {
  //   $("#Selesai").modal('hide');
  //   this.error = {};

  //   this.service
  //     .updateForFinishProcess(this.data)
  //     .then(result => {

  //       this.data.LoomHistory = [];

  //       if (result.length > 0) {
  //         result = this.remappingModels(result);
  //       }

  //       this.data.LoomHistory = result;
  //     }).catch(e => {
  //       var errorStatus = e.Status;
  //       this.dialog.errorPrompt(errorStatus);
  //     });
  // }

  // updateShift() {
  //   $("#UbahShift").modal('hide');
  //   this.error = {};

  //   this.service
  //     .updateForShiftProcess(this.data)
  //     .then(result => {

  //       this.data.LoomHistory = [];

  //       if (result.length > 0) {
  //         result = this.remappingModels(result);
  //       }

  //       this.data.LoomHistory = result;
  //     }).catch(e => {
  //       var errorStatus = e.Status;
  //       this.dialog.errorPrompt(errorStatus);
  //     });
  // }
}
