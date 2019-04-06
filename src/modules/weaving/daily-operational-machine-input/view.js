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
      DateOrdered: "02/02/2019",
      WeavingUnit: "Weaving1",
      Shift: "Shift 1",
      OrderProductionNumber: "PC AB 99 44 55",
      ConstructionNumber: "0002/02-2019",
      MachineNumber: "1/1",
      BeamNumber: "TS 108",
      WarpOrigin: "B",
      WeftOrigin: "A",
      Time: { Pause: "02.30", Resume: "04.30", Difference: "2" },
      BeamOperator: "Rahayu",
      LoomGroup: "D",
      SizingNumber: 2,
      SizingOperator: "Ahmad",
      SizingGroup: "B",
      Information: "Some Info"
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
