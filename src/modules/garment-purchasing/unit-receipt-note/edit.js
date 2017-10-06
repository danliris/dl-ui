import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.unit = this.data.unit;
        this.supplier = this.data.supplier;
        this.deliveryOrder = { "_id": this.data.deliveryOrderId, "no": this.data.deliveryOrderNo };
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        if (typeof this.data.date === 'object')
            this.data.date.setHours(this.data.date.getHours() - this.data.date.getTimezoneOffset() / 60);

        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}
