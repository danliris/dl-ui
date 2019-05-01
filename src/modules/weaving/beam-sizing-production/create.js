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
var BeamLoader = require("../../../loader/weaving-beam-loader");
var ShiftLoader = require("../../../loader/weaving-shift-loader");

@inject(Router, Service)
export class Create {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};

    var today = moment(new Date()).format("DD-MMM-YYYY");
    this.data.ProductionDate = today;
    this.DailyOperationSizingDetailsOptions = {}
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  columns = [{
      value: "BeamNumber",
      header: "No. Beam"
    },
    {
      value: "ConstructionNumber",
      header: "No. Konstruksi"
    }, {
      value: "PIS",
      header: "PIS"
    },
    {
      value: "Visco",
      header: "Visco"
    },
    {
      value: "Time.Start",
      header: "Mulai"
    },
    {
      value: "Time.Finish",
      header: "Doff/ Selesai"
    },
    {
      value: "Broke",
      header: "Putus"
    },
    {
      value: "Counter",
      header: "Counter"
    },
    {
      value: "Shift",
      header: "Shift"
    }
  ];

  start() {
    if (this.showStartMenu === true) {
      this.showStartMenu = false;
    } else {
      this.showStartMenu = true;
    }
  }

  hideMenu() {
    // console.log(this.data);
    if (this.showStartMenu === true) {
      this.showStartMenu = false;
    }
  }

  get machines() {
    return MachineLoader;
  }

  get units() {
    return UnitLoader;
  }

  get constructions() {
    return ConstructionLoader;
  }

  get beams() {
    return BeamLoader;
  }

  get shifts() {
    return ShiftLoader;
  }

  save() {
    debugger;
    this.data.MachineDocumentId = this.MachineDocument.Id;
    this.data.WeavingUnitId = this.WeavingDocument.Id;
    this.data.DailyOperationSizingDetails.ConstructionDocumentId = this.ConstructionDocument.Id;
    // this.data.DailyOperationSizingDetails.BeamDocumentId = this.BeamDocument.Id;
    this.data.DailyOperationSizingDetails.BeamDocumentId = "f1aef325-df81-45ba-962b-1760f7b94478";
    // this.data.DailyOperationSizingDetails.ShiftDocumentId = this.ShiftDocument.Id;
    this.data.DailyOperationSizingDetails.ShiftDocumentId = "44b5ec23-e958-4ded-a00a-7b8905aebcf5";
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
