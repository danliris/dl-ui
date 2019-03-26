import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  onViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
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

  cancelCallback(event) {
    this.router.navigateToRoute("view", { Id: this.data.Id });
  }

  saveCallback(event) {
    // this.error = {};
    // var index = 0;
    // var emptyFieldName = "Semua Field Harus Diisi";

    // if (
    //   this.data.code == null ||
    //   this.data.code == undefined ||
    //   this.data.code == ""
    // ) {
    //   this.error.code = "Kode Material Tidak Boleh Kosong";
    //   index++;
    // }
    // if (
    //   this.data.name == null ||
    //   this.data.name == undefined ||
    //   this.data.name == ""
    // ) {
    //   this.error.name = "Nama Material Tidak Boleh Kosong";
    //   index++;
    // }
    // if (index > 0) {
    //   window.alert(emptyFieldName);
    // } else {
    this.service
      .update(this.data)
      .then(result => {
        this.router.navigateToRoute("view", { Id: this.data.Id });
      })
      .catch(e => {
        this.error = e;
      });
    // }
  }
}
