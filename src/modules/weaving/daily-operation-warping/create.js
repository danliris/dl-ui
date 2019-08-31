import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    this.error = {};
    var errorIndex = 0;

    if (this.data.OrderId == "" ||
      this.data.OrderId == undefined) {
      this.error.OrderId = "Field masih kosong";
      errorIndex++;
    }

    if (this.data.ConstructionId == "" ||
      this.data.ConstructionId == undefined) {
      this.error.ConstructionId = "Field masih kosong";
      errorIndex++;
    }

    if (this.data.MaterialTypeId == "" ||
      this.data.MaterialTypeId == undefined) {
      this.error.MaterialTypeId = "Field masih kosong";
      errorIndex++;
    }

    if (this.data.AmountOfCones == 0 ||
      this.data.AmountOfCones == undefined) {
      this.error.AmountOfCones = "Field masih kosong";
      errorIndex++;
    }

    if (this.data.ColourOfCone == "" ||
      this.data.ColourOfCone == undefined) {
      this.error.ColourOfCone = "Field masih kosong";
      errorIndex++;
    }

    if (this.data.DateOperation == "" ||
      this.data.DateOperation == undefined) {
      this.error.DateOperation = "Field masih kosong";
      errorIndex++;
    }

    if (this.data.TimeOperation == "" ||
      this.data.TimeOperation == undefined) {
      this.error.Shift = "Field masih kosong";
      errorIndex++;
    }

    if (this.data.OperatorId == "" ||
      this.data.OperatorId == undefined) {
      this.error.OperatorId = "Field masih kosong";
      errorIndex++;
    }

    if (errorIndex === 0) {
      this.service
        .createOnEntryProcess(this.data)
        .then(result => {
          this.list();
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
