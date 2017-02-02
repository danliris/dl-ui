import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    isReceived = false;

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

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
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit() {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete() {
        this.service.delete(this.data).then(result => {
            this.list();
        });
    }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
}
