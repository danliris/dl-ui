import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  onViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  async activate(params) {
    // var Id = params.Id;
    // this.data = await this.service.getById(Id);
    this.data = {
      Id: 1,
      runningMachineOrderDate: "02/02/2019",
      weavingUnit: "Weaving1",
      shift: "Shift 1",
      runningMachineNumber: "000001",
      orderProductionNumber: "002/02-2019",
      fabricConstructionNumber: "PC KIW 99 44 55 Tencelc Hd",
      warpOrigin: "A",
      weftOrigin: "C"
    };
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  editCallback(event) {
    this.router.navigateToRoute("edit", { Id: this.data.Id });
  }

  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.cancelCallback(event);
    });
  }
}
