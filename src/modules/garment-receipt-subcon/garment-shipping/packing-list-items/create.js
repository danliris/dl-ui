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
    saveText: "Buat",
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
