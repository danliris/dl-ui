import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
        
        this.unit = this.data.Unit;
        this.type = this.data.Type;
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    deleteCallback(event) {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}
