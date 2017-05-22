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

    back() {
        this.router.navigateToRoute('list');
    }

    save() {
        this.service.create(this.data)
            .then(result => {
                this.data = {};
                this.error = {};
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
