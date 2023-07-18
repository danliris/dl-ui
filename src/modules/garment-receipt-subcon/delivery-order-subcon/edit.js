import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  hasCancel = true;
  hasSave = true;
  hasView = false;
  hasCreate = false;
  isEdit = true;
  
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  bind() {
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    this.supplier = this.data.supplier;
    this.cc = {
      RO_Number: this.data.roNo,
    };
  }

  cancel(event) {
    this.router.navigateToRoute("view", { id: this.data.Id });
  }

  save(event) {
    this.service
      .update(this.data)
      .then((result) => {
        this.cancel();
      })
      .catch((e) => {
        this.error = e;
      });
  }
}
