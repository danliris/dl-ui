import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }
  isView = true;
  formOptions = {
    cancelText: "Back",
    saveText: "Unpost",
  };

  async activate(params) {
    this.isKasie = params.isKasie;
    var id = params.id;
    this.data = await this.service.getById(id);
    var idx = 0;

    this.supplier = this.data.buyer;

    if (this.data.items) {
      for (const item of this.data.items) {
        item.buyerAgent = this.data.buyerAgent;
        item.section = this.data.section;
        this.sumSubTotal(item);
      }
    }
  }

  sumSubTotal(item) {
    item.subGrossWeight = 0;
    item.subNetWeight = 0;
    item.subNetNetWeight = 0;
    const newDetails = item.details
      .map((d) => {
        return {
          carton1: d.carton1,
          carton2: d.carton2,
          cartonQuantity: d.cartonQuantity,
          grossWeight: d.grossWeight,
          netWeight: d.netWeight,
          netNetWeight: d.netNetWeight,
        };
      })
      .filter(
        (value, index, self) =>
          self.findIndex(
            (f) => value.carton1 == f.carton1 && value.carton2 == f.carton2
          ) === index
      );
    for (const detail of newDetails) {
      const cartonExist = false;
      const indexItem = this.data.items.indexOf(item);
      if (indexItem > 0) {
        for (let i = 0; i < indexItem; i++) {
          const item = this.data.items[i];
          for (const prevDetail of item.details) {
            if (
              detail.carton1 == prevDetail.carton1 &&
              detail.carton2 == prevDetail.carton2
            ) {
              cartonExist = true;
              break;
            }
          }
        }
      }
      if (!cartonExist) {
        item.subGrossWeight += detail.grossWeight * detail.cartonQuantity;
        item.subNetWeight += detail.netWeight * detail.cartonQuantity;
        item.subNetNetWeight += detail.netNetWeight * detail.cartonQuantity;
      }
    }
  }

  cancel(event) {
    this.router.navigateToRoute("list");
  }

  unpost(data) {
    var dataIds = [];
    dataIds.push(this.data.id);

    var dataUpdate = {};
    dataUpdate.ids = dataIds;
    if (confirm(`UnApprove Data?`))
      this.service.unpost(dataUpdate).then((result) => {
        this.cancel();
      });
  }

  edit(event) {
    this.router.navigateToRoute("edit", { id: this.data.id });
  }

  delete(event) {
    if (confirm("Hapus?")) {
      this.service.delete(this.data).then((result) => {
        this.cancel();
      });
    }
  }
}
