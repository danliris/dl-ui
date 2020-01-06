import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import numeral from "numeral";

@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);

    if (this.data.accepted) {
      this.hasEdit = false;
      this.hasDelete = false;
    }
  }

  cancel(event) {
    this.router.navigateToRoute("list");
  }

  edit(event) {
    this.router.navigateToRoute("edit", { id: this.data.Id });
  }

  delete(event) {
    this.service.delete(this.data).then(result => {
      this.cancel();
    });
  }

  attached() {
    var total = {
      UnitCode: "Total Jumlah",
      PackingQuantity: 0,
      ImperialQuantity: 0,
      MetricQuantity: 0
    };

    for (var detail of this.data.DOSalesDetails) {
      total.PackingQuantity += detail.PackingQuantity;
      total.ImperialQuantity += detail.ImperialQuantity;
      total.MetricQuantity += detail.MetricQuantity;
    }

    total.PackingQuantity = numeral(total.PackingQuantity).format("0,0.00");
    total.ImperialQuantity = numeral(total.ImperialQuantity).format("0,0.00");
    total.MetricQuantity = numeral(total.MetricQuantity).format("0,0.00");

    this.data.DOSalesDetails.push(total);
  }
}
