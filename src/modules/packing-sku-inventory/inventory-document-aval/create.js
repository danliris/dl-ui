import {
  inject,
  bindable,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";

@inject(Router, Service)
export class Create {
  @bindable BonNo;
  @bindable Uom;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) {}

  BonNoChanged(newValue) {
    if (newValue.id) {
      this.data.CartNo = newValue.cartNo;
      this.data.UnitCode = newValue.unitName;
      this.data.Area = newValue.area;
      this.data.ProductionOrderType = newValue.productionOrderType;
    }
  }

  UomChanged(newValue) {
    if (newValue.Id) {
      this.data.UOMUnit = newValue.Unit;
    }
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    let CreateData = {};
    CreateData.Area = "AVAL";

    if (this.BonNo === undefined || this.BonNo === null || this.BonNo === "") {
      CreateData.Id = "";
    } else {
      CreateData.Id = this.BonNo.id;
    }

    if (this.data.Shift === undefined || this.data.Shift === null || this.data.Shift === "") {
      CreateData.Shift = "";
    } else {
      CreateData.Shift = this.data.Shift;
    }

    if (this.Uom === undefined || this.Uom === null || this.Uom === "") {
      CreateData.UOMUnit = "";
    } else {
      CreateData.UOMUnit = this.Uom.Unit;
    }

    if (this.data.ProductionOrderQuantity === undefined || this.data.ProductionOrderQuantity === null || this.data.ProductionOrderQuantity === "") {
      CreateData.ProductionOrderQuantity = null;
    } else {
      CreateData.ProductionOrderQuantity = this.data.ProductionOrderQuantity;
    }

    if (this.data.QtyKg === undefined || this.data.QtyKg === null || this.data.QtyKg === "") {
      CreateData.QtyKg = "";
    } else {
      CreateData.QtyKg = this.data.QtyKg;
    }

    this.service
      .create(CreateData)
      .then(result => {

        this.list();
      })
      .catch(e => {
        this.error = e;
      });
  }
}
