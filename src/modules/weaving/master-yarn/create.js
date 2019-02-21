import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  showViewEdit = false;
  readOnlyViewEdit = true;
  createOnly = true;
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
    this.error = {};
    var index = 0;
    var emptyFieldName = "Semua Field Harus Diisi";

    if (this.optionalName) {
      this.data.name = this.data.name + " " + this.optionalName;
    } else {
      this.data.name = this.data.name;
    }

    if (
      this.data.materialTypeDocument == null ||
      this.data.materialTypeDocument == undefined
    ) {
      this.error.materialTypeDocument = "Kode Material Tidak Boleh Kosong";
      index++;
    }
    if (this.data.ringDocument == null || this.data.ringDocument == undefined) {
      this.error.ringDocument = "Kode Ring Tidak Boleh Kosong";
      index++;
    }
    if (this.data.code == null || this.data.code == undefined) {
      this.error.code = "Kode Benang Tidak Boleh Kosong";
      index++;
    }
    if (index > 0) {
      window.alert(emptyFieldName);
    } else {
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
}
