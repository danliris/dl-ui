import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  showViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {
    var Id = params.Id;
    this.data = await this.service.getById(Id);
    this.data.Name = await this.service.getCoreSupplierById(
      this.data.CoreSupplierId
    );
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { Id: this.data.Id });
  }

  saveCallback(event) {
    if (this.data.Name) {
      if (this.data.Name.name) {
        var supplierName = this.data.Name.name ? this.data.Name.name : "";
        var supplierId = this.data.Name._id ? this.data.Name._id : "";
        this.data.Name = supplierName;
        this.data.CoreSupplierId = supplierId;
      } else {
        var supplierName = "";
        var supplierId = "";
        this.data.Name = supplierName;
        this.data.CoreSupplierId = supplierId;
      }
    }
    // if (
    //   this.data.Code == undefined ||
    //   this.data.Code == null ||
    //   this.data.Code == ""
    // ) {
    //   var supplierCode = "";
    //   this.data.Code = supplierCode;
    // } else {
    //   var supplierCode = this.data.Code ? this.data.Code : "";
    //   this.data.Code = supplierCode;
    // }
    this.service
      .update(this.data)
      .then(result => {
        this.router.navigateToRoute("list", { Id: this.data.Id });
      })
      .catch(e => {
        this.error = e;
      });
  }
}
