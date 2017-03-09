import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
  hasCancel = true;
  hasSave = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    
    this.data.unit.toString = function () {
      return [this.division.name, this.name]
          .filter((item, index) => {
              return item && item.toString().trim().length > 0;
          }).join(" - ");
    }
  }

  bind(){
    this.error = {};
  }

  cancel(event) {
    this.router.navigateToRoute('view', { id: this.data._id });
  }

  save(event) {
    this.service.update(this.data)
        .then(result => {
          this.cancel();
        })
        .catch(e => {
          this.error = e;
        })
  }    
}
