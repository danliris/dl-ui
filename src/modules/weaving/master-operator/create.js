import {
  inject,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";

@inject(Router, Service)
export class Create {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) {}

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    this.data.CoreAccount = {};
    if (this.data.CoreAccount) {
      this.data.CoreAccount.MongoId = this.CoreAccount._id;
      this.data.CoreAccount.Id = 0;
      this.data.CoreAccount.Name = this.CoreAccount.username;
    } else {
      this.data.CoreAccount.MongoId = "";
      this.data.CoreAccount.Id = 0;
      this.data.Name = "";
    }
    // this.data.Assignment = this.Assignment;
    this.data.UnitId = this.data.UnitId.Id;

    console.log(this.data);
    debugger;

    this.service
      .create(this.data)
      .then(result => {

        this.list();
      })
      .catch(e => {

        this.error = e;
        this.error.WeavingUnit = e['WeavingUnitId'] ? 'Weaving Unit must not be empty' : '';
      });
  }
}
