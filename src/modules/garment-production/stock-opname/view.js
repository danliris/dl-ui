import { inject } from 'aurelia-framework';
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
        this.data = await this.service.read(id);
        for (const item of this.data.Items) {
            Object.assign(item, item.DOItem);
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }
}