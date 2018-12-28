import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    // var id = params.id;
    // this.data = await this.service.getById(id);
    // console.log(params);
    this.data = {
      sopNo: "1",
      tglsp: new Date(),
      periodebulan: "Januari",
      periodetahun: 2018,
      unit: "Weaving 1",
      konstruksijenis: "CD",
      konstruksitipe: "AYM",
      konstruksilusi: 133,
      konstruksipakan: 72,
      konstruksilebar: 63,
      jenislusi: "RfRf",
      asallusi: "Rf",
      jenispakan: "BC",
      asalpakan: "B",
      blendedpoly: 60,
      blendedcotton: 30,
      blendedlainnya: 10,
      delivery: new Date(),
      jenismesin: "AJL",
      jenisbenang: "Benang A",
      allgrade: 3500
    };
  }

  cancelCallback(event) {
    // this.router.navigateToRoute('view', { id: this.data._id });
    this.router.navigateToRoute("view", { id: this.data.sopNo });
  }

  saveCallback(event) {
    this.service
      .update(this.data)
      .then(result => {
        // this.router.navigateToRoute('view', { id: this.data._id });
        this.router.navigateToRoute("view", { id: this.data.sopNo });
      })
      .catch(e => {
        this.error = e;
      });
  }
}
