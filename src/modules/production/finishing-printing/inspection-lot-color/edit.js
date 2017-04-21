import { bindable, inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class Edit {
  @bindable data;
  @bindable error;

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);

    this.data.kanban.toString = function () {
      return [this.productionOrder.orderNo, this.cart.cartNumber]
          .filter((item, index) => {
              return item && item.toString().trim().length > 0;
          }).join(" - ");
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute('view', { id: this.data._id });
  }

  saveCallback(event) {

    this.service.update(this.data)
      .then(result => {
        this.cancelCallback();
      })
      .catch(e => {
        this.error = e;
      })
  }
}