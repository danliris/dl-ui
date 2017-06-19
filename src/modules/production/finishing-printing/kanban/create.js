import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import {activationStrategy} from 'aurelia-router';


@inject(Router, Service)
export class Create {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  activate(params) {

  }

  bind() {
    this.data = this.data || {};
    this.error = {};
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  saveCallback(event) {
    var createPromise = [];
    this.data.productionOrderId = this.data.productionOrder ? this.data.productionOrder._id : {};
    this.data.instructionId = this.data.instruction ? this.data.instruction._id : {};

    for (var cart of this.data.carts) {
      this.data.cart = cart;
      this.data.currentQty = cart.qty;
      createPromise.push(this.service.create(this.data));
    }

    if (createPromise.length <= 0) {
      createPromise.push(this.service.create(this.data));
    }

    Promise.all(createPromise)
      .then(responses => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
      })
      .catch(e => {
        delete this.data.cart;
        delete this.data.currentQty;
        this.error = e;
      })
  }
}