import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  showViewEdit = false;
  readOnlyViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.data.tags = "weaving-products";
  }

  activate(params) {}

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    if (this.data.coreUom.code = undefined || this.data.coreUom.code == null) {
      this.data.coreUom.code = this.data.coreUom.unit;
    }
    this.service
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.error = e;
      });
  }
}
