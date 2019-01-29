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
    // console.log(this.data.name);
    var materialData = {
      code: this.data.code,
      name: this.data.name,
      description: this.data.description
    };
    if (materialData.code == null || materialData.code == undefined) {
      this.error.code = "Kode Material Tidak Boleh Kosong";
    }
    if (materialData.name == null || materialData.name == undefined) {
      this.error.name = "Nama Material Tidak Boleh Kosong";
    }
    if (materialData.description == null || materialData.description == undefined) {
      this.error.description = "Deskripsi Material Tidak Boleh Kosong";
    } else {
      this.service
        .create(materialData)
        .then(result => {
          this.list();
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
