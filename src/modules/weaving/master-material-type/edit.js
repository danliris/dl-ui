import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    // this.data = {
    //   id: 1,
    //   code: "01",
    //   name: "PC45",
    //   description: "some detail"
    // };

    // this.data.currency.toString = function() {
    //   return this.currency;}
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.id });
  }

  saveCallback(event) {
    console.log(this.data);
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
