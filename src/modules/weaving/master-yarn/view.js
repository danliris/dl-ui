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
      yarnMaterialTypeCode: "R",
      yarnMaterialTypeName: "CD",
      yarnRingSizeCode: "f",
      yarnRingSizeName: 45,
      yarnName: "CD45",
      yarnUnit: "Bale",
      yarnCurrencyCode: "IDR",
      yarnPrice: 70000,
      tags: "weaving-products",
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
