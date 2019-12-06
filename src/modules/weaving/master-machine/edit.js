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
export class Edit {
  readOnlyValue = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {

    var Id = params.Id;
    var dataResult;
    var weavingUnit;
    var weavingMachineUnit;
    var cutmarkUom;
    this.data = await this.service
      .getById(Id)
      .then(result => {
        dataResult = result;
        return this.service.getUnitById(dataResult.WeavingUnitId);
      })
      .then(unit => {
        weavingUnit = unit;
        return this.service.getMachineTypeById(dataResult.MachineTypeId);
      }).then(machineType => {
        weavingMachineUnit = machineType;
        
        if (dataResult.CutmarkUomId != 0) {
          return this.service.getUomById(dataResult.CutmarkUomId).then(uom => {
            cutmarkUom = uom;
            return dataResult
          });
        } else {
          return dataResult;
        }
      });

    this.data.WeavingUnit = weavingUnit;
    this.data.WeavingMachineType = weavingMachineUnit;
    if (cutmarkUom) {
      this.data.CutmarkUom = cutmarkUom;
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", {
      Id: this.data.Id
    });
  }

  saveCallback(event) {
    this.error = {};
    var updateData = {}

    if (this.data.Id) {
      updateData.Id = this.data.Id;
    }
    if (this.data.MachineNumber) {
      updateData.MachineNumber = this.data.MachineNumber;
    }

    if (this.data.Location) {
      updateData.Location = this.data.Location;
    }

    if (this.data.WeavingUnit) {
      updateData.WeavingUnitId = this.data.WeavingUnit.Id;
    }

    if (this.data.WeavingMachineType) {
      updateData.MachineTypeId = this.data.WeavingMachineType.Id;
    }

    if (this.data.Cutmark) {
      updateData.Cutmark = this.data.Cutmark;
    }

    if (this.data.CutmarkUom) {
      updateData.CutmarkUomId = this.data.CutmarkUom.Id;
    }

    this.service
      .update(updateData)
      .then(result => {
        this.router.navigateToRoute("view", {
          Id: this.data.Id
        });
      })
      .catch(e => {

        this.error = e;
        this.error.WeavingUnit = e['WeavingUnitId'] ? 'Weaving Unit must not be empty' : '';
        this.error.WeavingMachineType = e['MachineTypeId'] ? 'Machine Type must not be empty' : '';
      });
  }
}
