import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    activate(params) {

    }

    back() {
        this.router.navigateToRoute('list');
    }

    save(event) {
        this.service.create(this.data)
            .then(result => {
                this.back();
            })
            .catch(e => {
                this.error = e;
            })
    }
}
