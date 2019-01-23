import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  createOnly=false;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
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
    this.data.fabricConstructionDocument.id="4b782240-1593-11e9-ab14-d663bd873d93";
    this.service
      .create(this.data)
      .then(result => {
        // debugger
        this.list();
      })
      .catch(e => {
        this.error = e;
      });
  }
}
