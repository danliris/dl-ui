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

        if (this.data.items.length > 0) {
            var delivered = this.data.items.find((item) => item.isDelivered.toString().toLowerCase() === "true");
            if (delivered) {
                this.isVoid = false;
            } else {
                this.isVoid = true;
            }
        }
    }

    update() {
        this.data.isVoid = true;
        this.service.update(this.data)
            .then((result) => {
                this.router.navigateToRoute('list');
            })
            .catch((e) => {
                this.error = e;
            })
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }
}