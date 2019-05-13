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
    this.data = await this.service
      .getById(Id)
      .then(result => {
        dataResult = result;
        return this.service.getUnitById(result.Unit);
      })
      .then(unit => {
        dataResult.UnitId.Id = unit;
        return dataResult;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", {
      Id: this.data.Id
    });
  }

  saveCallback(event) {
    console.log(this.data);
    debugger;
    // this.error = {};

    // if(this.data.UnitId.Id) {
    //   this.data.UnitId.Id = this.data.WeavingUnit.Id;
    // } else {
    //   this.data.UnitId.Id = '';
    // }

    // if(this.data.WeavingMachineType) {
    //   this.data.MachineTypeId = this.data.WeavingMachineType.Id;
    // } else {
    //   this.data.MachineTypeId = '';
    // }

    // if(this.data.Location == '') {
    //   this.data.Location = '';
    // }

    this.service
      .update(this.data)
      .then(result => {

        this.router.navigateToRoute("view", {
          Id: this.data.Id
        });
      })
      .catch(e => {

        this.error = e;
        this.error.WeavingUnit = e['WeavingUnitId'] ? 'Weaving Unit must not be empty' : '';
      });
  }
}
