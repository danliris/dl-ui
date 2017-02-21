import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  get view() {
    return () => {
      this.router.navigateToRoute('view', { id: this.data._id });
    }
  }

  get save() {
    this.data.productionOrderId = this.data.productionOrder._id || {};
    this.data.instructionId = this.data.instruction._id || {};
    return () => {
      this.service.update(this.data)
        .then(result => {
          this.view();
        })
        .catch(e => {
          this.error = e;
        })
    }
  }

  get isEdit(){
    return true;
  }
}
