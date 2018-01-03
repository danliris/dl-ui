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
  //hasConfirm = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
      var id = params.id;
      this.data = await this.service.getById(id);
      var conf=false;
      if(this.data.items){
            for(var a of this.data.items){
                if(a.isConfirmed){
                    conf=true;
                    break;
                }
            }
        }
      if(conf){
        this.hasDelete = false;
        //this.hasConfirm = false;
      }
      else if(this.data.isMasterPlan){
        this.hasDelete = false;
        //this.hasConfirm = false;
      }
      else if(this.data.isCanceled){
        this.hasEdit = false;
        this.hascancelConfirm = false;
        this.hasDelete = false;
        //this.hasConfirm = false;
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
}