import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }
  isEdit = true;
  async activate(params) {
    let id = params.id;
    this.data = await this.service.read(id);

    this.selectedUnit = this.data.Unit;
  }

  bind() {
    this.error = {};
    this.checkedAll = true;
  }

  cancelCallback(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  saveCallback(event) {
    this.service.update(this.data)
      .then(result => {
        this.cancelCallback();
      })
      .catch(e => {
        this.error = e;
      })
  }
}
