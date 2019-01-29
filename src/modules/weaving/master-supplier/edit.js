import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  showViewEdit = true;
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
    // debugger;
    var supplierData = {
      id: this.supplierId,
      code: this.data.code,
      name: this.data.name.name ? this.data.name.name : this.data.name,
      coreSupplierId: this.data.name._id
        ? this.data.name._id
        : this.data.coreSupplierId
    };

    if (supplierData.name == null || supplierData.name == undefined) {
      this.error.name = "Nama Supplier Tidak Boleh Kosong";
    }
    if (supplierData.code == null || supplierData.code == undefined) {
      this.error.code = "Kode Supplier Tidak Boleh Kosong";
    } else {
      console.log(this.supplierId);
      this.service.update(supplierData).then(result => {
        this.router.navigateToRoute("list", { id: this.supplierId });
      });
    }
  }
}
