import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  readOnlyValue = true;
  
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {

    var Id = params.Id;
    var dataResult;
    var weavingUnit;
    var weavingMachineUnit;
    this.data = await this.service
      .getById(Id)
      .then(result => {

        dataResult = result;

        return this.service.getUnitById(dataResult.WeavingUnitId);
      })
      .then(unit => {

        weavingUnit = unit;

        return this.service.getMachineTypeById(dataResult.MachineTypeId);
      }).then(machineType => {

        weavingMachineUnit = machineType;

        return dataResult;
      });

    this.data.WeavingUnit = weavingUnit;
    this.data.WeavingMachineType = weavingMachineUnit;
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { Id: this.data.Id });
  }

  saveCallback(event) {
    this.error = {};

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

    if(this.data.Location == '') {
      this.data.Location = '';
    }

    this.service
      .update(this.data)
      .then(result => {

        this.router.navigateToRoute("view", { Id: this.data.Id });
      })
      .catch(e => {

        this.error = e;
        this.error.WeavingUnit = e['WeavingUnitId'] ? 'Weaving Unit must not be empty' : '';
        this.error.WeavingMachineType = e['MachineTypeId']  ? 'Machine Type must not be empty' : '';
      });
  }
}
