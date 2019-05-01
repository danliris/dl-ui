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
var ShiftLoader = require("../../../loader/weaving-shift-loader");

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

  async activate(params) {
    // var Id = params.Id;
    // this.data = await this.service.getById(Id);
    this.data = {
      Id: 1,
      BeamNumber: "TS 108",
      ConstructionNumber: "C D 133 68 63 A B",
      PIS: 16,
      Visco: "12/12",
      Time: {
        Start: "02.30",
        Finish: "04.30"
      },
      Broke: 2,
      Counter: "Rahayu",
      Shift: "Rahayu",
    };
  }

  causes = ["", "Putus Beam", "Mesin Bermasalah"];

  get constructions() {
    return ConstructionLoader;
  }

  get beams() {
    return BeamLoader;
  }

  get shifts() {
    return ShiftLoader;
  }

  pause() {
    if (this.showPauseMenu === true) {
      this.showPauseMenu = false;
    } else {
      this.showPauseMenu = true;
      this.showResumeMenu = false;
      this.showDoffMenu = false;
    }
  }

  resume() {
    if (this.showResumeMenu === true) {
      this.showResumeMenu = false;
    } else {
      this.showResumeMenu = true;
      this.showPauseMenu = false;
      this.showDoffMenu = false;
    }
  }

  finish() {
    if (this.showDoffMenu === true) {
      this.showDoffMenu = false;
    } else {
      this.showDoffMenu = true;
      this.showPauseMenu = false;
      this.showResumeMenu = false;
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
