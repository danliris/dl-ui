import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  onCreated = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  async activate(params) {
    // var id = params.id;
    // this.data = await this.service.getById(id);
    this.data = {
      noMKB: 1,
      konstruksi: "CD 133 72 63 Rf Rf B B",
      konstruksiJenis: "CD",
      konstruksiTipe: "PL",
      konstruksiLusi: "133",
      konstruksiPakan: "72",
      konstruksiLebar: "63",
      jnsLusi: "Rf",
      jnsPakan: "RcRf",
      totalBenang: 220.7084
    };
  }

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Ubah", routing ke 'edit'
  editCallback(event) {
    this.router.navigateToRoute("edit", { id: this.data.noMKB });
  }

  //Tombol "Hapus", hapus this.data, redirect ke list
  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.list();
    });
  }
}
