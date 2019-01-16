import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  showViewEdit = true;
  readOnlyViewEdit=true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    // var id = params.id;
    // this.data = await this.service.getById(id);
    this.data = {
      id: 1,
      yarnCode: "01",
      yarnMaterialType: "Cotton",
      yarnRingSize: 2,
      yarnName: "PC45",
      yarnUnit: "Bale",
      yarnCurrencyCode: "IDR",
      yarnPrice: 70000,
      tags: "Weaving",
      yarnDescription: "some detail"
    };

    // this.data.currency.toString = function() {
    //   return this.currency;}
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.id });
  }

  saveCallback(event) {
    this.service
      .update(this.data)
      .then(result => {
        this.router.navigateToRoute("view", { id: this.data.id });
      })
      .catch(e => {
        this.error = e;
      });
  }
}
