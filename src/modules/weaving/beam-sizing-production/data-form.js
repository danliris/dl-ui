import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";
// import { Dialog } from '../../../../../components/dialog/dialog';
import {
  callbackify
} from "util";
import {
  Router
} from "aurelia-router";
var UnitLoader = require("../../../loader/unit-loader");
var MachineLoader = require("../../../loader/weaving-machine-loader");

// @inject(Service, Router)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable MachineDocument;
  @bindable WeavingDocument;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor() {}

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.showStartMenu = false;
    this.showResumeMenu = false;
    this.showDoffMenu = false;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  // OperationalMachineOptions = {

  // };

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

  //   get units() {
  //     return UnitLoader;
  //   }

  //   MachineDocumentChanged(newValue) {
  //     console.log(newValue);
  //     if (newValue) {
  //       this.data.MachineId = newValue.Id;
  //     }
  //   }

  //Triggered when "+" on Items Collections Clicked
  // get start() {
  //   return event => {
  //     this.data.DailyOperationMachineDetails.push({});
  //   };
  // }

  start() {
    if (this.showStartMenu === true) {
      this.showStartMenu = false;
    } else {
      this.showStartMenu = true;
      this.showResumeMenu = false;
      this.showDoffMenu = false;
    }
  }

  resume() {
    if (this.showResumeMenu === true) {
      this.showResumeMenu = false;
    } else {
      this.showResumeMenu = true;
      this.showStartMenu = false;
      this.showDoffMenu = false;
    }
  }

  finish() {
    if (this.showDoffMenu === true) {
      this.showDoffMenu = false;
    } else {
      this.showDoffMenu = true;
      this.showResumeMenu = false;
      this.showStartMenu = false;
    }
  }

  hideMenu() {
    if (this.showStartMenu === true || this.showResumeMenu === true || this.showDoffMenu === true) {
      this.showStartMenu = false;
      this.showResumeMenu = false;
      this.showDoffMenu = false;
    }
  }
}
