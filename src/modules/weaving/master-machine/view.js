import {
  inject,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {

    var Id = params.Id;
    var dataResult;
    // var weavingUnit;
    // var weavingMachineUnit;
    // var cutmarkUom;
    this.data = await this.service
      .getById(Id)
      .then(result => {
        dataResult = result;
        return this.service.getUnitById(dataResult.UnitId);
      })
      .then(unit => {
        dataResult.WeavingUnit = unit;
        return this.service.getMachineTypeById(dataResult.MachineTypeId);
      }).then(machineType => {
        dataResult.MachineType = machineType;
        dataResult.Speed = machineType.Speed;
        
        // if (dataResult.CutmarkUomId != 0) {
        //   return this.service.getUomById(dataResult.CutmarkUomId).then(uom => {
        //     cutmarkUom = uom;
        //     return dataResult
        //   });
        // } else {
          return dataResult;
        // }
      });

      console.log(dataResult);
    // this.data.WeavingUnit = weavingUnit;
    // this.data.WeavingMachineType = weavingMachineUnit;
    // if (cutmarkUom) {
    //   this.data.CutmarkUom = cutmarkUom;
    // }
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  editCallback(event) {
    this.router.navigateToRoute("edit", {
      Id: this.data.Id
    });
  }

  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.cancelCallback(event);
    });
  }
}
