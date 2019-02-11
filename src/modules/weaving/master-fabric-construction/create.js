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
    // debugger;
    console.log(this.data);
    var isEmpty;
    var emptyFieldName =
      "- Terdapat Field yang Belum Diisi\n- Pilih Minimal Satu Lusi\n- Pilih Minimal Satu Pakan";

    //Cek Jenis Material
    if (this.data.materialTypeDocument) {
      if (this.data.materialTypeDocument.id) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
    } else {
      this.isEmpty = true;
    }

    //Cek Jenis Anyaman
    if (this.data.wovenType == null || this.data.wovenType == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    //Cek Jumlah Lusi
    if (this.data.amountOfWarp == null || this.data.amountOfWarp == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    //Cek Jumlah Pakan
    if (this.data.amountOfWeft == null || this.data.amountOfWeft == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    //Cek Lebar
    if (this.data.width == null || this.data.width == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    //Cek Jenis Lusi
    if (
      this.data.warpTypeForm == null ||
      this.data.warpTypeForm == undefined ||
      this.data.warpTypeForm == ""
    ) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    //Cek Jenis Pakan
    if (
      this.data.weftTypeForm == null ||
      this.data.weftTypeForm == undefined ||
      this.data.weftTypeForm == ""
    ) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    //Cek Total Benang
    if (this.data.totalYarn == null || this.data.totalYarn == undefined) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    if (this.isEmpty == true) {
      window.alert(emptyFieldName);
    } else {
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
