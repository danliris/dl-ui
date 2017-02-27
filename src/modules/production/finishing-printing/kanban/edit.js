import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
  
  selectedProductionOrderDetail = {};

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    this.data.cart.uom = this.data.productionOrder.uom.unit;
  }

  bind(){
      if (this.data.selectedProductionOrderDetail.colorRequest){
          this.data.selectedProductionOrderDetail.toString = function(){
              return `${this.colorRequest}`;  
          };
      }   
  }

  get view() {
    return () => {
      this.router.navigateToRoute('view', { id: this.data._id });
    }
  }

  get save() {
    return () => {
      this.data.productionOrderId = this.data.productionOrder._id || {};
      this.data.instructionId = this.data.instruction._id || {};
      if (!(this.data.selectedProductionOrderDetail instanceof Object))
        this.data.selectedProductionOrderDetail = this.selectedProductionOrderDetail;

      this.service.update(this.data)
        .then(result => {
          this.view();
        })
        .catch(e => {
          this.error = e;
        })
    }
  }

  get isEdit(){
    return true;
  }
}
