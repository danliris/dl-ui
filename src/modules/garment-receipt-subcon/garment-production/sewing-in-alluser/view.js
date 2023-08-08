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
    this.selectedLoadingOut = await this.service.getLoadingOutbyId(
      this.data.LoadingOutId
    );

    this.same = true;
    for (var item of this.data.Items) {
      if (item.Quantity != item.RemainingQuantity) {
        this.same = false;
      }
    }

    this.selectedUnit = this.data.Unit;
  }

  cancel(event) {
    this.router.navigateToRoute("list");
  }

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
    if (confirm(`Hapus ${this.data.SewingInNo}?`))
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
