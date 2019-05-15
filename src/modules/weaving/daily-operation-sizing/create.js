import {
  inject,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";
import moment from 'moment';
var UnitLoader = require("../../../loader/unit-loader");
var MachineLoader = require("../../../loader/weaving-machine-loader");
var ConstructionLoader = require("../../../loader/weaving-constructions-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service)
export class Create {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};

    var date = new Date();
    var today = moment(date, "DD/MM/YYYY");
    this.data.ProductionDate = today;
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  columns = [{
    value: "BeamNumber",
    header: "No. Beam"
  }];

  // shifts = ["", "1 - Pagi", "2 - Siang", "3 - Malam"];

  start() {
    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
    }
  }

  // hideMenu() {
  //   // console.log(this.data);
  //   if (this.showStartMenu === true) {
  //     this.showStartMenu = false;
  //   }
  // }

  get machines() {
    return MachineLoader;
  }

  get units() {
    return UnitLoader;
  }

  get constructions() {
    return ConstructionLoader;
  }

  get operators() {
    return OperatorLoader;
  }

  get addBeamsWarping() {
    return event => {
      this.BeamsWarping.push({});
    };
  }

  save() {
    debugger;
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    this.data.ProductionTime.Start = time;
    console.log(this.data.ProductionTime.Start);

    // this.data = {};
    // this.data.DailyOperationSizingDetails = {};

    // console.log(this.data.DailyOperationSizingDetails);
    // console.log(this.data);

    // this.data.ProductionDate = moment(new Date(), "DD/MM/YYYY");
    this.data.MachineDocumentId = this.MachineDocument.Id;
    this.data.WeavingUnitId = this.WeavingDocument.Id;
    // this.data.DailyOperationSizingDetails.ConstructionDocumentId = this.ConstructionDocument.Id;
    // this.data.DailyOperationSizingDetails.BeamDocumentId = this.BeamDocument.Id;
    // this.data.DailyOperationSizingDetails.ShiftDocumentId = this.ShiftDocument.Id;

    // console.log(this.data.DailyOperationSizingDetails);
    console.log(this.data);

    this.service
      .create(this.data)
      .then(result => {
        this.router.navigateToRoute('list');
      })
      .catch(e => {
        this.error = e;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
