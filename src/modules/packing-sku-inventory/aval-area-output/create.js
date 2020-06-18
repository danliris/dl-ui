import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
  @bindable BonNo;
  @bindable Uom;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};

    this.isShowed = true;
  }

  list() {
    this.router.navigateToRoute("list");
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
    CreateData.DestinationArea = this.data.DestinationArea;
    console.log(this);
    if (this.data.Date === undefined || this.data.Date === null || this.data.Date === "") {
      CreateData.Date = "";
    } else {
      CreateData.Date = this.data.Date;
    }

    // if(this.data.DyeingPrintingMovementIds.length > 0){
    //   CreateData.DyeingPrintingMovementIds = this.data.DyeingPrintingMovementIds;
    // }else{
    //   CreateData.DyeingPrintingMovementIds = [];
    // }
    // CreateData.DeliveryOrdeSalesId = this.data.doNO.DeliveryOrderSalesID;
    // CreateData.DeliveryOrderSalesNo = this.data.doNO.DeliveryOrderSalesNO;
    CreateData.DeliveryOrdeSalesId = 0;
    CreateData.DeliveryOrderSalesNo = this.data.doNO;
    if (this.data.DyeingPrintingItems.length > 0) {
      CreateData.AvalItems = this.data.DyeingPrintingItems.map(
        (item) => {
          var remappedItems = {};
          remappedItems.AvalItemId = item.AvalItemId;
          remappedItems.AvalType = item.AvalType;
          remappedItems.AvalCartNo = item.AvalCartNo;
          remappedItems.AvalUomUnit = item.AvalUomUnit;
          remappedItems.AvalQuantity = item.AvalQuantity;
          remappedItems.AvalQuantityKg = item.AvalQuantityKg;
          remappedItems.AvalOutSatuan = item.AvalOutSatuan;
          remappedItems.AvalOutQuantity = item.AvalOutQuantity;

          return remappedItems;
        }
      );
    } else {
      CreateData.AvalItems = [{}];
    }
    // console.log(CreateData);
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
        } else if (e.statusCode == 400){
          // alert("Aval Keluar Satuan Harus Diisi!");

          this.error = e;
        } else {
        alert("Aval Keluar Satuan Harus Diisi!");
         
          this.error = e;
          console.log(e);
        }
      });
  }
}
