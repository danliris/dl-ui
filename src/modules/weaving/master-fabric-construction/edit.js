import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  onViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    // this.constructionNumber = this.data.constructionNumber;
    // this.warpTypeForm = this.data.warpTypeForm;
    // this.weftTypeForm = this.data.weftTypeForm;
    // this.totalYarn = this.data.totalYarn;
    // console.log(this.data);
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.id });
  }

  saveCallback(event) {
    // debugger;
    // var notChecked = 0;
    // this.data.itemsWarp.forEach(warp => {
    //   console.log(warp);
    //   if (warp.Select == false) {
    //     notChecked++;
    //   }
    // });
    // if(notChecked == 0){
      // debugger;
      this.service
      .update(this.data)
      .then(result => {
        this.router.navigateToRoute("view", { id: this.data.id });
      })
      .catch(e => {
        this.error = e;
      });
    // } else {
    //   this.error.ItemsWarp = "Ada Benang yang Belum Dipilih";
    // }
  }
}
