import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        this.packingReadOnly = true;
        this.packing = this.data;
        this.packing.code = this.data.packingCode;
        this.data.packing = this.data;
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }
}