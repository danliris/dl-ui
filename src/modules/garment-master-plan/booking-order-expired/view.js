import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasMasterPlan = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    this.params = params;
    var id = params.id;
    this.data = await this.service.getById(id);
    if (!this.data.isMasterPlan) {
      this.hasMasterPlan = false;
    }
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  masterPlan(event) {
    this.router.navigateToRoute('detail', { id: this.data.code });
  }
}
