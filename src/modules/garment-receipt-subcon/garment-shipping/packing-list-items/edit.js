import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { Dialog } from "../../../../au-components/dialog/dialog";

@inject(Router, Service, Dialog)
export class Edit {
  isEdit = true;

  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    this.error = {};

    this.selectedLocalNote = {
      noteNo: this.data.localSalesNoteNo,
    };

    if (this.data.items && this.data.items.length > 0) {
      for (var item of this.data.items) {
        item.buyerAgent = this.data.buyerAgent;
        // item.section = this.data.section;
        this.sumSubTotal(item);

        for (var detail of item.details) {
          detail.packingOutNo = item.packingOutNo;
        }
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
          index: d.index,
        };
      })
      .filter(
        (value, index, self) =>
          self.findIndex(
            (f) =>
              value.carton1 == f.carton1 &&
              value.carton2 == f.carton2 &&
              value.index == f.index
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
              detail.carton2 == prevDetail.carton2 &&
              detail.index == prevDetail.index
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

  cancelCallback(event) {
    this.dialog
      .prompt(
        "Apakah anda yakin untuk keluar dari form ini ?",
        "Edit Packing List Items"
      )
      .then((response) => {
        if (response.ok) {
          this.router.navigateToRoute("view", { id: this.data.id });
        }
      });
  }

  saveCallback(event) {
    this.service
      .update(this.data)
      .then((result) => {
        this.router.navigateToRoute("view", { id: this.data.id });
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
