import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var locale = 'id-ID';
    var moment = require('moment');
    moment.locale(locale);

    var id = params.id;
    this.data = await this.service.getById(id);

  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  editCallback(event) {
    this.router.navigateToRoute('edit', { id: this.data.Id });
  }

  deleteCallback(event) {
    this.service.delete(this.data)
      .then(result => {
        this.cancelCallback();
      });
  }
}
