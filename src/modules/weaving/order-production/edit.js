import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  detailEditOnly = true;
  createOnly = true;
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
        return this.service.getUnitById(result.WeavingUnit);
      })
      .then(unit => {
        dataResult.WeavingUnit = unit;
        return dataResult;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { Id: this.data.Id });
  }

  saveCallback(event) {
    var Unit = this.data.WeavingUnit;
    this.data.WeavingUnit = {};
    this.data.WeavingUnit.Id = Unit.Id;
    this.data.WeavingUnit.Code = Unit.Code;
    this.data.WeavingUnit.Name = Unit.Name;
    this.data.Period.Month = this.Month;
    console.log(this.data);
    debugger;
    this.service
      .update(this.data)
      .then(result => {
        this.router.navigateToRoute("view", { Id: this.data.Id });
      })
      .catch(e => {
        this.error = e;
      });
  }
}
