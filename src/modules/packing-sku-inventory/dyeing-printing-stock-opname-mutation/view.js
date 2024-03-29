import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import * as _ from 'underscore';

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  canEdit = true;
  async activate(params) {
    
    var id = params.id;


    this.data = await this.service.getById(id);
   
   this.canEdit = true
    
  }

  list() {
    this.router.navigateToRoute("list");
  }

  // edit(data) {
  //   this.router.navigateToRoute('edit', { id: this.data.id });
  // }

  // delete() {
  //   this.service.delete(this.data)
  //     .then(result => {
  //       this.list();
  //     });
  // }
}
