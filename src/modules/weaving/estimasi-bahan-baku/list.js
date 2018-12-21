import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) {}

  months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Desember"
  ];

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {
    this.service
      .create(this.data)
      .then(result => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create",
          {},
          { replace: true, trigger: true }
        );
      })
      .catch(e => {
        this.error = e;
      });
  }
}