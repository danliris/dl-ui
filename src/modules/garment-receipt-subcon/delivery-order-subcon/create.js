import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from "aurelia-router";
import { forEach } from "../../../routes/general";

@inject(Router, Service)
export class Create {
  hasCancel = true;
  hasSave = true;
  hasView = false;
  hasCreate = true;
  hasEdit = false;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }
  activate(params) {}
  bind() {
    this.data = { items: [], itemsPR: [] };
    this.data.isCustoms = true;
    this.error = {};
  }

  cancel(event) {
    if (confirm(`Apakah Anda yakin akan kembali?`))
      this.router.navigateToRoute("list");
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  save(event) {
    // // var newItems = this.data.items;
    // if (this.data.itemsPR.length > 0) {
    //   this.data.itemsPR.forEach((element) => {
    //     this.data.items.push(element);
    //   });
    // }
    this.service
      .create(this.data)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create",
          {},
          { replace: true, trigger: true }
        );
      })
      .catch((e) => {
        this.error = e;
      });
  }
}
