import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasSplit = false;
    hasDelete = false;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.hasSplit = !this.data.isClosed;
        this.hasDelete = !this.data.items
            .map((item) => item.isClosed)
            .reduce((prev, curr, index) => {
                return prev || curr
            }, true);
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    split(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete(event) {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }
}