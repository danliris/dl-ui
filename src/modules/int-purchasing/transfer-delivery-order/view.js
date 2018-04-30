import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    isReceived = false;

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.supplier = this.data.supplier;
        this.isReceived = this.data.items
            .map((item) => {
                var _isReceived = item.fulfillments
                    .map((fulfillment) => fulfillment.realizationQuantity.length > 0)
                    .reduce((prev, curr, index) => {
                        return prev || curr
                    }, false);
                return _isReceived
            })
            .reduce((prev, curr, index) => {
                return prev || curr
            }, false);

        if (!this.isReceived) {
            this.hasDelete = true;
            this.hasEdit = true;
        }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete(event) {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }
}