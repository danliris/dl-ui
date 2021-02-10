import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }
  isEdit = true;
  async activate(params) {
    let id = params.id;
    this.data = await this.service.read(id);

    this.selectedUnit=this.data.Unit;
  }

  bind() {
    this.error = {};
    this.checkedAll = true;
  }

  cancelCallback(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  saveCallback(event) {

    if (this.data && this.data.IsDifferentSize) {
      if (this.data.Items) {
        for (var item of this.data.Items) {
          if (item.Quantity > 0) {
            item.IsSave = true;
          }
          else {
            item.IsSave = false;
          }
          if (item.IsSave) {
            item.TotalQuantity = 0;
            if (this.data.SewingInDate == null || this.data.SewingInDate < item.SewingInDate)
              this.data.SewingInDate = item.SewingInDate;
            item.RemainingQuantity = item.TotalQuantity;
          }
        }
      }
    }
    else if (this.data && !this.data.IsDifferentSize) {
      if (this.data.Items) {
        for (var item of this.data.Items) {
          if (item.Quantity > 0) {
            item.IsSave = true;
          }
          else {
            item.IsSave = false;
          }
          if (item.IsSave) {
            if (this.data.SewingInDate == null || this.data.SewingInDate < item.SewingInDate)
              this.data.SewingInDate = item.SewingInDate;
            item.RemainingQuantity = item.Quantity;
          }
        }
      }
    }
    console.log(this.data)
    this.service.update(this.data)
      .then(result => {
        this.cancelCallback();
      })
      .catch(e => {
        this.error = e;
      })
  }
}
