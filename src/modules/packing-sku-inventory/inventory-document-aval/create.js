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
    this.CreateData = {};
    // this.CreateData

    this.data.CoreAccount = {};
    this.data.CoreAccount.MongoId = 0;
    this.data.CoreAccount.Id = 0;
    this.data.CoreAccount.Name = this.CoreAccount;

    if (this.UnitId == undefined || this.UnitId == null || this.UnitId == "") {
      this.data.UnitId = 0;
    } else {
      this.data.UnitId = this.UnitId.Id;
    }

    if (this.Assignment === undefined || this.Assignment === null || this.Assignment === "") {
      this.Assignment = "";
    } else {
      this.data.Assignment = this.Assignment;
    }

    if (this.data.Type === undefined || this.data.Type === null || this.data.Type === "") {
      this.data.Type = "";
    }

    this.service
      .create(this.data)
      .then(result => {

        this.list();
      })
      .catch(e => {
        this.error = e;
      });
  }
}
