import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

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

    cancel(event) {
        this.router.navigateToRoute('list');
    }
    save(event) {
        this.service.create(this.data)
            .then(result => {
                this.cancel();
            })
            .catch(e => {
                this.error = e;
            })
    }
}