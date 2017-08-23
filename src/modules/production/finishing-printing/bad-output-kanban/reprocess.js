import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import {activationStrategy} from 'aurelia-router';


@inject(Router, Service)
export class Reprocess {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  activate(params) {

  }

  bind() {
    this.data = this.data || {};
    this.error = {};
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  saveCallback(event) {
    var stepsError = [];
    var hasError = false;
    var instruction = this.data.instruction ? this.data.instruction.steps : [];

    if(instruction.length != 0) {
      if(this.data.reprocess == this.data.SEBAGIAN) {
          instruction = this.data.reprocessSteps.Reproses;
      }

      for (var step of instruction) {
          var stepErrors = {};
          
          if(!step.process || step.process == "") {
              stepErrors["process"] = "Process is required";
          }

          stepsError.push(stepErrors);
      }
      
      for(var stepError of stepsError)
      {
          if(Object.getOwnPropertyNames(stepError).length > 0)
          {
              hasError = true;
              break;
          }
      }

      if(!hasError) {
        event.event.toElement.disabled = true;

        var createPromise = [];
        this.data.isBadOutput = true;
        this.data.productionOrderId = this.data.productionOrder ? this.data.productionOrder._id : {};
        this.data.instructionId = this.data.instruction ? this.data.instruction._id : {};
        this.data.currentStepIndex = 0;

        for (var cart of this.data.carts) {
          this.data.cart = cart;
          this.data.currentQty = cart.qty;

          if(cart.reprocess == this.data.LANJUT_PROSES) {
            this.data.isReprocess = false;
            this.data.instruction.steps = this.data.reprocessSteps.LanjutProses;
          }
          else if(cart.reprocess == this.data.REPROSES) {
            this.data.isReprocess = true;
            this.data.instruction.steps = this.data.reprocessSteps.Reproses;
          } else {
            this.data.isReprocess = true;
          }

          createPromise.push(this.service.create(this.data));
        }

        if (createPromise.length <= 0) {
          createPromise.push(this.service.create(this.data));
        }

        Promise.all(createPromise)
          .then(responses => {
            alert("Data berhasil dibuat");
            this.router.navigateToRoute('reprocess', {}, { replace: true, trigger: true });
          })
          .catch(e => {
            delete this.data.cart;
            delete this.data.currentQty;
            this.error = e;
            event.event.toElement.disabled = false;
          })
      }
      else {
        this.error.steps = stepsError;
      }
    }
  }
}