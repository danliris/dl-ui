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

        this.data.accountBank.toString = function () {
            return [this.accountName, this.bankName, this.accountNumber]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }
    }

  get view() {
    return () => {
      this.router.navigateToRoute('view', { id: this.data._id });
    }
  }

  get save() {
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
}
