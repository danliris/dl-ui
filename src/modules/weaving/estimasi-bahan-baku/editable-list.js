import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
// import { activationStrategy } from "aurelia-router";

@inject(Router, Service)
export class EditableList {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = [
      {
        sopNoEBB: "0913/00-2018",
        noKonstruksi: "CD 133 72 63",
        jnsLusiSatu: "CD",
        asalLusiSatu: "SSS",
        qtyLusiSatu: 100,
        jnsLusiDua: "CD",
        asalLusiDua: "SSS",
        qtyLusiDua: 100,
        jnsPknSatu: "CD",
        asalPknSatu: "SSS",
        qtyPknSatu: 100,
        jnsPknDua: "CD",
        asalPknDua: "SSS",
        qtyPknDua: 100,
        jnsPknTiga: "CD",
        asalPknTiga: "SSS",
        qtyPknTiga: 100,
        jnsPknEmpat: "CD",
        asalPknEmpat: "SSS",
        qtyPknEmpat: 100
      }
    ];
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "edit":
        this.router.navigateToRoute("editable-list", { id: data.sopNoEBB });
        break;
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute("editable-list", { id: this.data.sopNoEBB });
  }

  saveCallback(event) {
    this.service
      .update(this.data)
      .then(result => {
        this.router.navigateToRoute("editable-list", {
          id: this.data.sopNoEBB
        });
      })
      .catch(e => {
        this.error = e;
      });
  }
}
