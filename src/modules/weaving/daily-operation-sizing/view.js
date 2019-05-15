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
var ConstructionLoader = require("../../../loader/weaving-constructions-loader");
var BeamLoader = require("../../../loader/weaving-beam-loader");
var OperatorLoader = require("../../../loader/weaving-operator-loader");

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  formOptions = {
    cancelText: 'Kembali',
    saveText: 'Simpan',
  };

  beamColumns = [{
    value: "BeamNumber",
    header: "No. Beam"
  }, {
    value: "EmptyWeight",
    header: "Berat Kosong Beam"
  }];

  logColumns = [{
      value: "ConstructionNumber",
      header: "No. Konstruksi"
    },
    // {
    //   value: "PIS",
    //   header: "PIS"
    // },
    // {
    //   value: "Visco",
    //   header: "Visco"
    // },
    {
      value: "Shift",
      header: "Shift"
    },
    {
      value: "Broke",
      header: "Putus"
    },
    // {
    //   value: "Counter",
    //   header: "Counter"
    // },
    {
      value: "History.MachineTimeStamp",
      header: "Waktu"
    },
    {
      value: "History.Information",
      header: "Information"
    },
    {
      value: "History.MachineStatus",
      header: "Status"
    }
  ];

  async activate(params) {
    // var Id = params.Id;
    // this.data = await this.service.getById(Id);

    // this.data = {
    //   Id: 1,
    //   BeamNumber: "TS 108",
    //   ConstructionNumber: "C D 133 68 63 A B",
    //   PIS: 16,
    //   Visco: "12/12",
    //   Time: {
    //     Start: "02.30",
    //     Finish: "04.30"
    //   },
    //   Broke: 2,
    //   Counter: "Rahayu",
    //   Shift: "Rahayu",
    // };
  }

  causes = ["", "Putus Beam", "Mesin Bermasalah"];

  get constructions() {
    return ConstructionLoader;
  }

  get operators() {
    return OperatorLoader;
  }

  get beams() {
    return BeamLoader;
  }

  start() {
    if (this.showHideStartMenu === true) {
      this.showHideStartMenu = false;
    } else {
      this.showHideStartMenu = true;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = false;
      this.showHideDoffMenu = false;
    }
  }

  pause() {
    if (this.showHidePauseMenu === true) {
      this.showHidePauseMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = true;
      this.showHideResumeMenu = false;
      this.showHideDoffMenu = false;
    }
  }

  resume() {
    if (this.showHideResumeMenu === true) {
      this.showHideResumeMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = true;
      this.showHideDoffMenu = false;
    }
  }

  finish() {
    if (this.showHideDoffMenu === true) {
      this.showHideDoffMenu = false;
    } else {
      this.showHideStartMenu = false;
      this.showHidePauseMenu = false;
      this.showHideResumeMenu = false;
      this.showHideDoffMenu = true;
    }
  }

  hideMenu() {
    // console.log(this.data);
    if (this.showResumeMenu === true || this.showDoffMenu === true || this.showPauseMenu === true) {
      this.showPauseMenu = false;
      this.showResumeMenu = false;
      this.showDoffMenu = false;
    }
  }

  save() {
    // console.log(this.data);
    // debugger;
    this.service
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.error = e;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }
}
