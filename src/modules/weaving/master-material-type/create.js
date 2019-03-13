import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
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
    this.error = {};
    if (this.data.Name) {
      var whitespaceRegex = new RegExp("\\s");
      var name = this.data.Name;
      if (whitespaceRegex.test(name)) {
        var detectWhitespace = this.data.Name.split(" ");
        this.error.Name = "Kode Tambahan Tidak Boleh Mengandung Spasi";
        this.data.Name = detectWhitespace[0] ? detectWhitespace[0] : " ";
      } else {
        this.data.Name = "";
        this.data.Name = name;
      }
    }
    console.log(this.data);
    debugger;
    if (!this.error.Name) {
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
