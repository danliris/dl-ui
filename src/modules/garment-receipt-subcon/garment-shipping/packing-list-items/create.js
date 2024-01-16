import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  @bindable packingList;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  bind() {
    this.data = { Items: [] };
    this.error = {};
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
    // return activationStrategy.invokeLifecycle;
  }
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
  };

  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 5,
    },
  };

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  saveCallback(event) {
    for (var item of this.data.items) {
      var qty = 0;
      var qtyCarton = 0;
      for (var detail of item.details) {
        qtyCarton += (detail.cartonQuantity * detail.quantityPCS);
        for (var size of detail.sizes) {
          if (size.quantity > 0) {
            qty += size.quantity;
            
          }
        }
      }
      item.totalQuantitySize = qty;
      item.totalQuantityCarton = qtyCarton;
    }

    this.service
      .create(this.data)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute("list");
      })
      .catch((e) => {
        this.error = e;
        if (typeof this.error == "string") {
          alert(this.error);
        } else {
          alert("Missing Some Data");
        }
      });
  }
}
