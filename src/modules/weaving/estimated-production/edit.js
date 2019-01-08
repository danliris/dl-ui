import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  ePNumberVisibility=true;
  searchButton=false;
  addButton=true;
  readOnly=true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    // var id = params.id;
    // this.data = await this.service.getById(id);
    this.data = {
      ePNumber: 1,
      productionEstimationNumber: "0192/00-2018",
      monthPeriod: "November",
      yearPeriod: "2018",
      unit: "Weaving 1"
    };
  }

  cancelCallback(event) {
    // this.router.navigateToRoute('view', { id: this.data._id });
    this.router.navigateToRoute("view", { id: this.data.ePNumber });
  }

  saveCallback(event) {
    this.service
      .update(this.data)
      .then(result => {
        // this.router.navigateToRoute('view', { id: this.data._id });
        this.router.navigateToRoute("view", { id: this.data.ePNumber });
      })
      .catch(e => {
        this.error = e;
      });
  }
}
