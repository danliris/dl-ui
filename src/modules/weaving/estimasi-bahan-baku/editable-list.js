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
    this.jnsLusiSatu = [
      {uid:1, val:"AA"}, 
      {uid:1, val:"AS"}, 
      {uid:1, val="AD"}
    ];
    this.asalLusiSatu = [
      {uid:1, val="SSW"}, 
      {uid:2, val="SSS"}, 
      {uid:3, val="SSX"}
    ];
    this.jnsLusiDua = [
      {uid:1, val:"AA"}, 
      {uid:1, val:"AS"}, 
      {uid:1, val="AD"}
    ];
    this.asalLusiDua = [
      {uid:1, val="SSW"}, 
      {uid:2, val="SSS"}, 
      {uid:3, val="SSX"}
    ];
    this.jnsPknSatu = [
      {uid:1, val:"AA"}, 
      {uid:1, val:"AS"}, 
      {uid:1, val="AD"}
    ];
    this.asalPknSatu = [
      {uid:1, val="SSW"}, 
      {uid:2, val="SSS"}, 
      {uid:3, val="SSX"}
    ];
    this.jnsPknDua = [
      {uid:1, val:"AA"}, 
      {uid:1, val:"AS"}, 
      {uid:1, val="AD"}
    ];
    this.asalPknDua = [
      {uid:1, val="SSW"}, 
      {uid:2, val="SSS"}, 
      {uid:3, val="SSX"}
    ];
    this.jnsPknTiga = [
      {uid:1, val:"AA"}, 
      {uid:1, val:"AS"}, 
      {uid:1, val="AD"}
    ];
    this.asalPknTiga = [
      {uid:1, val="SSW"}, 
      {uid:2, val="SSS"}, 
      {uid:3, val="SSX"}
    ];
    this.jnsPknEmpat = [
      {uid:1, val:"AA"}, 
      {uid:1, val:"AS"}, 
      {uid:1, val="AD"}
    ];
    this.asalPknEmpat = [
      {uid:1, val="SSW"}, 
      {uid:2, val="SSS"}, 
      {uid:3, val="SSX"}
    ];
    this.data = [
      {
        sopNoEBB: "0913/00-2018",
        noKonstruksi: "CD 133 72 63",
        jmlhOrder: 100,
        qtyLusiSatu: 100,
        qtyLusiDua: 100,
        qtyPknSatu: 100,
        qtyPknDua: 100,
        qtyPknTiga: 100,
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
