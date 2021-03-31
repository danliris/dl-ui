import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { }
    }

    bind() {
        this.data = { items: [] };
        this.error = {};
        this.cancelCallback = this.cancel;
        this.saveCallback = this.save;
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) {
        console.log(this.data);
        // this.data.Accepted = true;
        // this.data.Date = moment().format("YYYY-MM-DD");

        // this.service.create(this.data)
        //     .then((result) => {
        //         alert("Data berhasil dibuat");
        //         this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
        //     })
        //     .catch((e) => {
        //         this.error = e;
        //     })
    }
}