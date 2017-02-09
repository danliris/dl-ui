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
    var id = params.id;
    this.data = await this.service.getById(id);
    this.data.password = "";
  }

  get list() {
    return () => {
      this.router.navigateToRoute('list');
    };
  }

  get edit() {
    return () => {
      this.router.navigateToRoute('edit', { id: this.data._id });
    }
  }

  get delete() {
    return () => {
      this.service.delete(this.data)
        .then(result => {
          this.list();
        });
    }
  }
}
