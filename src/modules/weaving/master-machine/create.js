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

@inject(Router, Service)
export class Create {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) {}

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    var postData = {}

    if (this.data.MachineNumberOne) {
      postData.MachineNumber = this.data.MachineNumberOne;
    } else if (this.data.MachineNumberOne && this.data.MachineNumberTwo) {
      postData.MachineNumber = this.data.MachineNumberOne + " / " + this.data.MachineNumberTwo;
    } else {
      this.error.MachineNumberOne = "Nomor Mesin Wajib Diisi";
    }

    if (this.data.Location) {
      postData.Location = this.data.Location;
    }

    if (this.data.WeavingUnit) {
      postData.WeavingUnitId = this.data.WeavingUnit.Id;
    }

    if (this.data.WeavingMachineType) {
      postData.MachineTypeId = this.data.WeavingMachineType.Id;
    }

    if (this.data.Cutmark) {
      postData.Cutmark = this.data.Cutmark;
    }

    if (this.data.CutmarkUom) {
      postData.CutmarkUomId = this.data.CutmarkUom.Id;
    }

    if (this.data.Process) {
      postData.Process = this.data.Process;
    }

    if (this.data.Area) {
      postData.Area = this.data.Area;
    }

    if (this.data.Block) {
      postData.Block = this.data.Block;
    }
    console.log(postData);
    debugger
    this.service
      .create(postData)
      .then(result => {

        this.list();
      })
      .catch(e => {

        this.error = e;
        this.error.WeavingMachineType = e['MachineTypeId'] ? 'Machine Type must not be empty' : '';
        this.error.WeavingUnit = e['WeavingUnitId'] ? 'Weaving Unit must not be empty' : '';
      });
  }
}
