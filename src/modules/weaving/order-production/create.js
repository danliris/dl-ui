import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  createOnly = false;
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

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Simpan", menyimpan nilai masukan
  saveCallback(event) {
    var Unit = this.data.WeavingUnit;
    this.data.WeavingUnit = {};
    this.data.WeavingUnit.Id = Unit.Id;
    this.data.WeavingUnit.Code = Unit.Code;
    this.data.WeavingUnit.Name = Unit.Name;
    this.data.Period.Month = this.Month;
    console.log(this.data);
    debugger;
    this.service
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.error = e;
      });
    // }
  }
}
