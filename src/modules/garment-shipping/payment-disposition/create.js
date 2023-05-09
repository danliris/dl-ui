import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = { invoiceDetails: [] };
        this.error = {};
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        if(this.data.paymentType == 'EMKL'){
            this.service.createEMKL(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                // this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                this.router.navigateToRoute('list');
            })
            .catch(error => {
                this.error = error;
            });
        }else{
            this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                // this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                this.router.navigateToRoute('list');
            })
            .catch(error => {
                this.error = error;
            });
        }
       
    }
}