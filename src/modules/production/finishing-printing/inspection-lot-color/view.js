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
    this.fabricQc = this.data;
    this.data.fabricQc = this.data;
    this.fabricQc.code = this.data.fabricQualityControlCode;
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  editCallback(event) {
    this.router.navigateToRoute('edit', { id: this.data._id });
  }   
   
  deleteCallback(event) {
    this.service.delete(this.data)
        .then(result => {
          this.cancelCallback();
        });
  }  
}