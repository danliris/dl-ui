import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  isEdit = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);

    this.error = {};
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.Id });
  }

  saveCallback(event) {
    var Items = [];
    // var dataSave = this.data;

    for (var item of this.data.ROList) {
      for (var detail of item.FabricItems) {
        var itemSave = {};
        if (detail.IsSave) {
          itemSave.RONo = item.RONo;
          itemSave.Product = detail.Product;
          itemSave.ProductRemark = detail.ProductRemark;
          itemSave.Quantity = detail.Quantity;
          itemSave.Uom = detail.Uom;
          itemSave.BCNo = detail.BCNo;
          itemSave.BCDate = detail.BCDate;
          itemSave.BCType = detail.BCType;
          itemSave.Article = item.Article;
          Items.push(itemSave);
        }
      }
    }

    this.data.Items = Items;

    this.service
      .update(this.data)
      .then((result) => {
        this.router.navigateToRoute("view", { id: this.data.Id });
      })
      .catch((e) => {
        this.error = e;
      });
  }
}
