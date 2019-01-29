import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  showViewEdit = false;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.data.tags = "weaving-products";
    this.error = {};
  }

  activate(params) {}

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    var supplierData = {
      code: this.data.code,
      name: this.data.name.name,
      coreSupplierId: this.data.name._id
    };

    if (supplierData.name == null || supplierData.name == undefined) {
      this.error.name = "Nama Supplier Tidak Boleh Kosong";
    }
    if (supplierData.code == null || supplierData.code == undefined) {
      this.error.code = "Kode Supplier Tidak Boleh Kosong";
    } else {
      this.service
        .create(supplierData)
        .then(result => {
          this.list();
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
