import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;
  hascancelConfirm = false;
  hasConfirm = false;
  hasMasterPlan = false;
  expireBooking=false;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
      // this.params = params;
      var id = params.id;
      this.data = await this.service.getById(id);
      
      
      this.selectedSection = { Code:this.data.SectionCode, Name:this.data.SectionName,};
      this.selectedBuyer = { Code:this.data.BuyerCode, Name:this.data.BuyerName,};
      
      var today = new Date();
      today.setDate(today.getDate()+45);
      var dates = new Date(Date.parse(this.data.DeliveryDate));
      if(this.data.ConfirmedQuantity === 0 && dates > today){
        this.hasEdit = true;
        this.hasDelete = true;
        this.expireBooking = false;
      }
      if(this.data.HadConfirmed === 0 && dates > today){
        this.hasEdit = true;
        this.expireBooking = false;
      }
      if(dates > today){
        this.hasEdit = false;
        this.hasDelete = false;
        this.hasConfirm = true;
        this.expireBooking = false;
      }
      if(this.data.ConfirmedQuantity < this.data.OrderQuantity && dates > today){
        this.hascancelConfirm = true;
        this.hasEdit = false;
        this.hasDelete = false;
        this.expireBooking = false;
      }
      if(this.data.ConfirmedQuantity < this.data.OrderQuantity && dates <= today){
        this.expireBooking = true;
        this.hasEdit = false;
        this.hasDelete = false; 
      }
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  edit(event) {
    this.router.navigateToRoute('edit', { id: this.data.Id });
  }   

  // cancelBooking() {
  //       this.service.cancelBooking(this.data)
  //       .then(result => {
  //         this.cancel();
  //       });
  //   }

  // confirmBooking(event) {
  //   this.router.navigateToRoute('confirm', { id: this.data.Id });
  // }  

  // masterPlan(event) {
  //   this.router.navigateToRoute('detail', { id: this.data.code });
  // }

  // expired() {
  //       this.service.expiredBooking(this.data)
  //       .then(result => {
  //         this.cancel();
  //       });
  //   }
   
  delete(event) {
    this.service.delete(this.data)
        .then(result => {
          this.cancel();
        });
  }  

  // onitemchange(event) {
  //   var indexCanceledItem = this.data.items.findIndex(item => item.isCanceled);
    
  //   if(indexCanceledItem > -1) {
  //     this.service.update(this.data)
  //       .then(result => {
  //         alert("Confirm Canceled");
  //         this.hasEdit = true;
  //         this.hasDelete = true;
  //         this.hascancelConfirm = true;
  //         this.hasConfirm = true;
  //         this.activate(this.params);
  //       })
  //       .catch(e => {
  //         this.error = e;
  //         this.activate(this.params);
  //       });
  //   }
  // }
}
