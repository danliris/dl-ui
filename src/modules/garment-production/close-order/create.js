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
    var payload = Array.isArray(this.data)
        ? this.data
        : [this.data];

    this.garmentService.create(payload)
        .then(result => {
            this.list();
        })
        .catch(e => {
            this.error = Array.isArray(e) ? e : [];
        });
}
}


