import { inject, bindable, computedFrom, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {

    @bindable data = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        this.service.create(this.data)
            .then(result => {
                alert(`create data success`);
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {

                this.error = e;
            })
        }
}