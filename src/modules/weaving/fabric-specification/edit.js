import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  onCreated = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    // var id = params.id;
    // this.data = await this.service.getById(id);
    this.data = {
        noMKB: 1,
        konstruksi: "CD 133 72 63 Rf Rf B B",
        konstruksiJenis: "CD",
        konstruksiTipe: "PL",
        konstruksiLusi: "133",
        konstruksiPakan: "72",
        konstruksiLebar: "63",
        jnsLusi: "Rf",
        jnsPakan: "RcRf",
        totalBenang: 220.7084
    };
  }

  cancelCallback(event) {
    // this.router.navigateToRoute('view', { id: this.data._id });
    this.router.navigateToRoute("view", { id: this.data.noMKB });
  }

  saveCallback(event) {
    this.service
      .update(this.data)
      .then(result => {
        // this.router.navigateToRoute('view', { id: this.data._id });
        this.router.navigateToRoute("view", { id: this.data.noMKB });
      })
      .catch(e => {
        this.error = e;
      });
  }
}
