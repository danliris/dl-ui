import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        if (this.data.referenceNumber && this.data.referenceNumber != "") {
            this.data.reference = { orderNo: this.data.referenceNumber };
        }
        else {
            this.data.reference = {};
        }
    }

    view(data) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        this.data.remainingQuantity = this.data.orderQuantity + (this.data.orderQuantity * this.data.shippingQuantityTolerance / 100);
        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }


}