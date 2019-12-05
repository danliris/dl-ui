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

    if (this.data.MachineNumber) {
      postData.MachineNumber = this.data.MachineNumber;
    }

    if(this.data.Location){
      postData.Location = this.data.Location;
    }

    if (this.data.WeavingUnit) {
      postData.WeavingUnitId = this.data.WeavingUnit.Id;
    }

    if (this.data.WeavingMachineType) {
      postData.MachineTypeId = this.data.WeavingMachineType.Id;
    }

    if(this.data.Cutmark){
      postData.Cutmark = this.data.Cutmark;
    }

    if (this.data.CutmarkUom) {
      postData.CutmarkUomId = this.data.CutmarkUom.Id;
    }
    
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
