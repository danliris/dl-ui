import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = { items: [] };
        this.error = {};
    }

    // async activate(params) {
    //     let id = params.id;
    //     this.data = await this.service.getById(id);
    // }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: 1 });
    }

    saveCallback(event) {
                
        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: 1 });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
