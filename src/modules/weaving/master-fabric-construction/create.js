import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  onViewEdit = false;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  activate(params) {}

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Simpan", membuat data, redirect ke create
  saveCallback(event) {
    let errorIndex = 0;
    var CodeRegEx = new RegExp("([1-9])");

    if (!this.data.ReedSpace) {
      this.data.ReedSpace = 0;
    } else {
      if (!CodeRegEx.test(this.data.ReedSpace)) {
        this.error.ReedSpace = "Only Numbers (1-9) Allowed";
        errorIndex++;
      }
    }

    
    if (!this.data.TotalEnds) {
      this.data.TotalEnds = 0;
    } else {
      if (!CodeRegEx.test(this.data.TotalEnds)) {
        this.error.TotalEnds = "Only Numbers (1-9) Allowed";
        errorIndex++;
      }
    }

    if (errorIndex == 0) {
    this.service
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.error = e;
      });
    }
  }
}
