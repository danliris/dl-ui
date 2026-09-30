import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, GarmentService } from './service';


@inject(Router, Service, GarmentService)
export class Create {
  // @bindable data;
  // @bindable error;

  constructor(router, service, garmentService) {
    this.router = router;
    this.service = service;
    this.garmentService = garmentService;
    this.data = {};
  }

  activate(params) {

  }

  list() {
    this.router.navigateToRoute('list');
  }

  cancelCallback(event) {
    this.list();
  }



  saveCallback(event) {
    this.garmentService.create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        Object.assign(this.error, e);
      })
  }
}


