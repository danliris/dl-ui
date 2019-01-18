import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
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
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  editCallback(event) {
    this.router.navigateToRoute("edit", { id: this.data.id });
  }

  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.cancelCallback(event);
    });
  }
}
