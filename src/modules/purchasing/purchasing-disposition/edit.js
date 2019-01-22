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

  bind() {
    this.data = this.data || {};
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    if(this.data.Currency){
        this.selectedCurrency=this.data.Currency;
    }

    if(this.data.Supplier){
        this.selectedSupplier=this.data.Supplier;
    }

    if(this.data.Division){
        this.selectedDivision=this.data.Division;
    }

    if(this.data.Category){
        this.selectedCategory=this.data.Category;
    }
  }

  cancel(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
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

