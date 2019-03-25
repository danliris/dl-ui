import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  readOnlyValue = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) { }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {

    if(this.data.WeavingUnit) {
      this.data.WeavingUnitId = this.data.WeavingUnit.Id;
    } else {
      this.data.WeavingUnitId = '';
    }

    if(this.data.WeavingMachineType) {
      this.data.MachineTypeId = this.data.WeavingMachineType.Id;
    } else {
      this.data.MachineTypeId = '';
    }
    
    this.service
      .create(this.data)
      .then(result => {

        this.list();
      })
      .catch(e => {

        this.error = e;
        this.error.WeavingMachineType = e['MachineTypeId'] ? 'Machine Type must not be empty' : '';
        this.error.WeavingUnit = e['WeavingUnitId'] ?  'Weaving Unit must not be empty' : '';
      });
  }
}
