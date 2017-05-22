import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    activate() {
        this.data.paymentDueDays = 0;
    }

    back() {

        this.router.navigateToRoute('list');
    }

    save() {
        this.service.create(this.data)
            .then(result => {
                // this.back();
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', { replace: true, trigger: true, force: true });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
