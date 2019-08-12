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

    if (this.data.ConstructionId == "" ||
      this.data.ConstructionId == undefined) {
        console.log(this.data.ConstructionId);

    } else if (this.data.MaterialTypeId == "" ||
      this.data.MaterialTypeId == undefined) {
        console.log(this.data.MaterialTypeId);

    } else if (this.data.AmountOfCones == "" ||
      this.data.AmountOfCones == undefined) {
        console.log(this.data.AmountOfCones);
    }

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
