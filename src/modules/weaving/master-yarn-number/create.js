import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  activate(params) {}

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    this.error = {};
    var CodeRegEx = new RegExp("([1-9])");
    if (this.data.Code) {
      if (
        this.data.Code == undefined ||
        this.data.Code == null ||
        this.data.Code == ""
      ) {
        var yarnNumberCode = this.data.Code ? this.data.Code : "";
        this.data.Code = yarnNumberCode;
      } else {
        var yarnNumberCode = "";
        this.data.Code = yarnNumberCode;
      }
    }

    // if (this.data.Number) {
    if (
      this.data.Number == undefined ||
      this.data.Number == null ||
      this.data.Number == ""
    ) {
      this.data.Number = 0;
    } else {
      if (!CodeRegEx.test(this.data.Number)) {
        this.error.Number = "Only Numbers (1-9) Allowed";
      }
    }
    // }

    if (this.data.RingType) {
      if (
        this.data.RingType == undefined ||
        this.data.RingType == null ||
        this.data.RingType == ""
      ) {
        var yarnNumberRing = this.data.RingType ? this.data.RingType : "";
        this.data.RingType = yarnNumberRing;
      } else {
        var yarnNumberRing = "";
        this.data.RingType = yarnNumberRing;
      }
    }
    this.service
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        if (!this.error.Number) {
          this.error = e;
        }
      });
  }
}
