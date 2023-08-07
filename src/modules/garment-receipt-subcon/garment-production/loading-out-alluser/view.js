import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    let id = params.id;
    this.isKasie = params.isKasie;
    this.data = await this.service.read(id);
    this.selectedCuttingOut = await this.service.getCuttingOutbyId(
      this.data.CuttingOutId
    );

    if (this.data.IsApproved == true) {
      this.deleteCallback = null;
    }
    this.selectedUnit = this.data.Unit;
  }

  cancel(event) {
    this.router.navigateToRoute("list");
  }

  // editCallback(event) {
  //   this.router.navigateToRoute("edit", { id: this.data.Id });
  // }

  unpost(data) {
    var dataIds = [];
    dataIds.push(this.data.Id);

    var dataUpdate = {};
    dataUpdate.ids = dataIds;
    if (confirm(`UnApprove Data?`))
      this.service.unpost(dataUpdate).then((result) => {
        this.cancel();
      });
  }

  delete(event) {
    // if (confirm(`Hapus ${this.data.CutInNo}?`))
    this.service
      .delete(this.data)
      .then((result) => {
        alert(`delete data success`);
        this.cancel();
      })
      .catch((e) => {
        this.error = e;
      });
  }
}
