import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  showViewEdit = true;
  readOnlyViewEdit = true;
  supplierId = null;
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.supplierId = id;
    this.data = await this.service.getById(id);
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.id });
  }

  saveCallback(event) {
    var completeData = {
      id: this.supplierId,
      code: this.data.code,
      name: this.data.name,
      coreSupplierId: this.data._id
    };
    this.service
      .update(completeData)
      .then(result => {
        this.router.navigateToRoute("list", { id: this.data.id });
      });
  }
}
