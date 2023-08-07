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
    this.selectedLoadingIn = await this.service.getLoadingInbyId(
      this.data.LoadingInId
    );

    for (var item of this.data.Items) {
      if (item.Quantity != item.RemainingQuantity) {
        this.deleteCallback = null;
      }
    }

    this.selectedUnit = this.data.Unit;
  }

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  // editCallback(event) {
  //   this.router.navigateToRoute("edit", { id: this.data.Id });
  // }

  deleteCallback(event) {
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
