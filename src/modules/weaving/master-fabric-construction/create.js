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
    // this.collection = {};
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
    // console.log(this.data);
    // debugger;
    // var isEmpty;
    // var emptyFieldName = "Terdapat Field yang Belum Diisi";
    // if (
    //   this.data.materialTypeDocument == null ||
    //   this.data.materialTypeDocument == null
    // ) {
    //   this.isEmpty = true;
    // } else {
    //   this.isEmpty = false;
    // }

    // if (this.data.wovenType == null || this.data.wovenType == null) {
    //   this.isEmpty = true;
    // } else {
    //   this.isEmpty = false;
    // }

    // if (this.data.amountOfWarp == null || this.data.amountOfWarp == null) {
    //   this.isEmpty = true;
    // } else {
    //   this.isEmpty = false;
    // }

    // if (this.data.amountOfWeft == null || this.data.amountOfWeft == null) {
    //   this.isEmpty = true;
    // } else {
    //   this.isEmpty = false;
    // }

    // if (this.data.width == null || this.data.width == null) {
    //   this.isEmpty = true;
    // } else {
    //   this.isEmpty = false;
    // }

    // if (this.data.warpTypeForm == null || this.data.warpTypeForm == null) {
    //   this.isEmpty = true;
    // } else {
    //   this.isEmpty = false;
    // }

    // if (this.data.weftTypeForm == null || this.data.weftTypeForm == null) {
    //   this.isEmpty = true;
    // } else {
    //   this.isEmpty = false;
    // }

    // if ((this.isEmpty = true)) {
    //   window.alert(emptyFieldName);
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
