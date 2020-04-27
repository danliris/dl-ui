import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from "aurelia-router";

@inject(Router, Service)
export class Create {
  @bindable BonNo;
  // @bindable Uom;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  // activate(params) {

  // }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  BonNoChanged(newValue) {
    if (newValue.id) {
      this.data.BonNo = newValue.bonNo;
      this.data.OutputInspectionMaterialId = newValue.id;
    }
  }

  back() {
    this.router.navigateToRoute("list");
  }

  save() {
    let CreateData = {};
    CreateData.Area = this.data.Area;
    CreateData.AvalProductionIds = this.data.AvalProductionIds;

    // if (this.data.Date === undefined || this.data.Date === null || this.data.Date === "") {
    //   CreateData.Date = "";
    // } else {
    //   CreateData.Date = this.data.Date;
    // }

    // if (this.data.Shift === undefined || this.data.Shift === null || this.data.Shift === "") {
    //   CreateData.Shift = "";
    // } else {
    //   CreateData.Shift = this.data.Shift;
    // }

    if (this.data.DyeingPrintingItems.length > 0) {
      CreateData.AvalProductionOrders = this.data.DyeingPrintingItems.map(
        (item) => {
          var remappedItems = {};
          remappedItems.AvalCartNo = item.AvalCartNo;
          remappedItems.AvalQuantity = item.AvalQuantity;
          remappedItems.AvalQuantityKg = item.AvalQuantityKg;
          remappedItems.AvalType = item.AvalType;
          remappedItems.AvalUomUnit = item.AvalUomUnit.Unit;

          return remappedItems;
        }
      );
    } else {
      CreateData.AvalProductionOrders = [{}];
    }

    console.log(CreateData);
    debugger;
    this.service
      .create(CreateData)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create",
          {},
          {
            replace: true,
            trigger: true,
          }
        );
      })
      .catch((e) => {
        if (e.statusCode == 500) {
          alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
        } else {
          this.error = e;
        }
      });
  }
}
