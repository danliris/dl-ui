import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;
  hascancelConfirm = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
      var id = params.id;
      this.data = await this.service.getById(id);
      if(this.data.isConfirmed){
        this.hasEdit = false;
        this.hasDelete = false;
        this.hascancelConfirm = false;
      }
      else if(this.data.isCanceled){
        this.hasEdit = false;
        this.hascancelConfirm = false;
      }
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  edit(event) {
    this.router.navigateToRoute('edit', { id: this.data._id });
  }   

  cancelBooking() {
        this.service.cancelBooking(this.data)
        .then(result => {
          this.cancel();
        });
    }
   
  delete(event) {
    this.service.delete(this.data)
        .then(result => {
          this.cancel();
        });
  }  
}