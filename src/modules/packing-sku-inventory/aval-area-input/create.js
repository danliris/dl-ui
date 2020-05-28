import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};

    this.isShowed = true;
  }

  BonNoChanged(newValue) {
    if (newValue.id) {
      this.data.BonNo = newValue.bonNo;
      this.data.OutputInspectionMaterialId = newValue.id;
    }
  }

  determineActivationStrategy() {
      return activationStrategy.replace; //replace the viewmodel with a new instance
      // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
      // or activationStrategy.noChange to explicitly use the default behavior
  }

  back() {
    this.router.navigateToRoute("list");
  }

  save() {
    let CreateData = {};
    CreateData.Area = this.data.Area;
    CreateData.Shift = this.data.Shift;
    CreateData.Group = this.data.Group;

    if (this.data.Date === undefined || this.data.Date === null || this.data.Date === "") {
      CreateData.Date = "";
    } else {
      CreateData.Date = this.data.Date;
    }

    if(this.data.DyeingPrintingMovementIds.length > 0){
      CreateData.DyeingPrintingMovementIds = this.data.DyeingPrintingMovementIds;
    }else{
      CreateData.DyeingPrintingMovementIds = [{}];
    }

    if (this.data.DyeingPrintingItems.length > 0) {
      CreateData.AvalItems = this.data.DyeingPrintingItems.map(
        (item) => {
          var remappedItems = {};
          remappedItems.AvalType = item.AvalType;
          remappedItems.AvalCartNo = item.AvalCartNo;
          remappedItems.AvalUomUnit = item.AvalUomUnit.Unit;
          remappedItems.AvalQuantity = item.AvalQuantity;
          remappedItems.AvalQuantityKg = item.AvalQuantityKg;

          return remappedItems;
        }
      );
    } else {
      CreateData.AvalItems = [{}];
    }

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
