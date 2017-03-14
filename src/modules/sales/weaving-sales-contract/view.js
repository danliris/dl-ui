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
    var locale = 'id-ID';
    var moment = require('moment');
    moment.locale(locale);

    var id = params.id;
    this.data = await this.service.getById(id);
    this.data.deliverySchedule = moment(this.data.deliverySchedule).format('YYYY-MM-DD');


    this.data.accountBank.toString = function () {
      return [this.accountName, this.bankName, this.accountNumber]
        .filter((item, index) => {
          return item && item.toString().trim().length > 0;
        }).join(" - ");
    }
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
