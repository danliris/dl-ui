import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Create {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  activate(params) {

  }

  bind(){
    this.data = this.data || {};
    this.error = {};
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  saveCallback(event) {
    var createPromise = [];
    this.data.productionOrderId = this.data.productionOrder ? this.data.productionOrder._id : {};
    this.data.instructionId = this.data.instruction ? this.data.instruction._id : {};

    for (var cart of this.data.carts){
      this.data.cart = cart;
      createPromise.push(this.service.create(this.data));
    }

    if (createPromise.length <= 0){
      createPromise.push(this.service.create(this.data));
    }

    Promise.all(createPromise)
      .then(responses => {
        this.cancelCallback();
      })
      .catch(e => {
        delete this.data.cart;
        this.error = e;
      })
  }    
}