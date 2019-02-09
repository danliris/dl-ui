import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  onViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.id });
  }

  saveCallback(event) {
    var isEmpty;
    var emptyFieldName =
      "- Terdapat Field yang Belum Diisi\n- Pilih Minimal Satu Lusi\n- Pilih Minimal Satu Pakan";
    if (
      this.data.materialTypeDocument == null ||
      this.data.materialTypeDocument == undefined
    ) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    if (this.data.wovenType == null || this.data.wovenType == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    if (this.data.amountOfWarp == null || this.data.amountOfWarp == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    if (this.data.amountOfWeft == null || this.data.amountOfWeft == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    if (this.data.width == null || this.data.width == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    if (this.warpTypeForm == null || this.warpTypeForm == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    if (this.weftTypeForm == null || this.weftTypeForm == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    if (this.isEmpty == true) {
      window.alert(emptyFieldName);
    } else {
      this.service
        .update(this.data)
        .then(result => {
          this.router.navigateToRoute("view", { id: this.data.id });
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
