import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  // showViewEdit=false;
  // readOnlyViewEdit=true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  activate(params) {}

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    // var ringData = {
    //   code: this.data.code,
    //   number: this.data.number,
    //   description: this.data.description
    // };
    
    // if (ringData.code == null || ringData.code == undefined) {
    //   this.error.code = "Kode Ring Tidak Boleh Kosong";
    // }
    // if (ringData.number == null || ringData.number == undefined) {
    //   this.error.number = "Ukuran Ring Tidak Boleh Kosong";
    // }
    // if (ringData.description == null || ringData.description == undefined) {
    //   this.error.description = "Deskripsi Ring Tidak Boleh Kosong";
    // } else {
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
