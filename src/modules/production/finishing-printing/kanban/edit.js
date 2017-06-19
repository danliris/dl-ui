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
    this.data.cart.uom = this.data.cart.uom ? this.data.cart.uom.unit : 'MTR';

    var currentIndex = 0, countDoneStep = 0;
    for(var step of this.data.instruction.steps) {
      if(step.isNotDone) {
        if(step.isNotDone == false) {
          currentIndex++;
        }
        else {
          countDoneStep++;
        }
      }
    }

    this.data.countDoneStep = countDoneStep;
    this.data.currentIndex = currentIndex;
  }

  bind(){
      if (this.data.selectedProductionOrderDetail.colorRequest){
          this.data.selectedProductionOrderDetail.toString = function(){
              return `${this.colorRequest}`;  
          };
      }

      this.error = {};   
  }

  cancelCallback(event) {
    this.router.navigateToRoute('view', { id: this.data._id });
  }

  saveCallback(event) {
    this.data.productionOrderId = this.data.productionOrder ? this.data.productionOrder._id : {};
    this.data.instructionId = this.data.instruction ? this.data.instruction._id : {};

    this.service.update(this.data)
      .then(result => {
        this.cancelCallback();
      })
      .catch(e => {
        this.error = e;
      })
  } 

  get isEdit(){
    return true;
  }
}
