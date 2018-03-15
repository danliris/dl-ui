import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;
  hascancelConfirm = true;
  hasConfirm = true;
  hasMasterPlan = true;
  expireBooking=false;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
      this.params = params;
      var id = params.id;
      this.data = await this.service.getById(id);
      var conf=false;
      if(this.data.items){
         if(this.data.items.length>0){
           conf=true;
         }
        }
      if(!this.data.isMasterPlan){
        this.hasMasterPlan=false;
      }
      if(this.data.isCanceled){
        this.hasEdit = false;
        this.hascancelConfirm = false;
        this.hasDelete = false;
        this.hasConfirm = false;
        //this.hasMasterPlan = false;
      }
      // else if(this.data.isMasterPlan){
      //   this.hasDelete = false;
      //   //this.hasConfirm = false;
      // }
      else if(conf){
        this.hasDelete = false;
        this.hasEdit = false;
        //this.hasConfirm = false;
      }
      var total=0;
      for(var b of this.data.items){
          total+=b.quantity;
      }
      var c = new Date(this.data.deliveryDate);
      var b = new Date();
      c.setHours(0,0,0,0);
      b.setHours(0,0,0,0);
      var diff=c.getTime() - b.getTime();
      var timeDiff = Math.abs(c.getTime() - b.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(diffDays<=45){
        this.hasConfirm = false;
        this.hasEdit = false;
        this.expireBooking=true;
        this.hascancelConfirm = false;
        this.hasDelete = false;
      }
      if(this.data.orderQuantity<=total){
        this.expireBooking=false;
        this.hascancelConfirm = false;
      }

      if(this.data.canceledItems && this.data.canceledItems.length > 0) {
        this.hasEdit = false;
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

  confirmBooking(event) {
    this.router.navigateToRoute('confirm', { id: this.data._id });
  }  

  masterPlan(event) {
    this.router.navigateToRoute('detail', { id: this.data.code });
  }

  expired() {
        this.service.expiredBooking(this.data)
        .then(result => {
          this.cancel();
        });
    }

  // confirmBooking() {
  //     var today=new Date();
  //     var a = new Date(this.data.deliveryDate);
  //     var b = today;
  //     var timeDiff = Math.abs(a.getTime() - b.getTime());
  //     var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //     if(diffDays<=45){
  //         if (confirm('Tanggal Confirm <= 45 hari ('+diffDays+' hari) dari Tanggal Pengiriman. Tetap Confirm?')) {
  //             this.service.confirmBooking(this.data)
  //               .then(result => {
  //                 alert("Data Confirmed");
  //                 this.cancel();
  //               });
  //         } else {
  //             this.cancel();
  //         }
  //     }
  //     else{
  //         this.service.confirmBooking(this.data)
  //               .then(result => {
  //                 alert("Data Confirmed");
  //                 this.cancel();
  //               });
  //     }
  // }
   
  delete(event) {
    this.service.delete(this.data)
        .then(result => {
          this.cancel();
        });
  }  

  onitemchange(event) {
    var indexCanceledItem = this.data.items.findIndex(item => item.isCanceled);
    
    if(indexCanceledItem > -1) {
      this.service.update(this.data)
        .then(result => {
          alert("Confirm Canceled");
          this.hasEdit = true;
          this.hasDelete = true;
          this.hascancelConfirm = true;
          this.hasConfirm = true;
          this.activate(this.params);
        })
        .catch(e => {
          this.error = e;
          this.activate(this.params);
        });
    }
  }
}
