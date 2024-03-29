import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
console.log("masuk ke edit.js");

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
    
    this.data.Unit.toString = function () {
      return [this.Division.Name, this.Name]
          .filter((item, index) => {
              return item && item.toString().trim().length > 0;
          }).join(" - ");
    }
  }

  bind(){
    this.error = {};
  }

  cancelCallback(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  saveCallback(event) {
    this.service.update(this.data)
        .then(result => {
          this.router.navigateToRoute('view', { id: this.data.Id });
        })
        .catch(e => {
          this.error = e;
        })
  }    
}
