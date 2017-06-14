import { bindable, inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class Edit {
  hasCancel = true;
  hasEdit = true;

  @bindable data;
  @bindable error;

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  cancel(event) {
    this.router.navigateToRoute('view', { id: this.data._id });
  }

  save(event) {
    if(typeof this.data.dateIm === 'object')
      this.data.dateIm.setHours(this.data.dateIm.getHours() - this.data.dateIm.getTimezoneOffset() / 60);

    this.service.update(this.data)
      .then(result => {
        this.cancelCallback();
      })
      .catch(e => {
        this.error = e;
      })
  }
}
