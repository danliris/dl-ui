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
    // console.log(this.data);

    var completeData = {
      code: this.data.code,
      name: this.data.name,
      coreSupplierId: this.data._id
    };

    if (completeData.name == null || completeData.name == undefined) {
      this.error = "Nama Supplier Tidak Boleh Kosong";
    } else {
      this.service
        .create(completeData)
        .then(result => {
          this.list();
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
