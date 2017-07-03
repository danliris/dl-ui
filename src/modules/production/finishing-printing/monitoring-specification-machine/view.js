import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    // @bindable Options = {
    //     "readOnly": true,
    // }
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = this.data || {};
        this.items = this.data.items;
        this.error = {};
    }

    async activate(params) {
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        var id = params.id;
        this.data = await this.service.getById(id);
        this.machine = this.data.machine;
        this.Options = {
            "readOnly": true,
            "isMaster": false,
        }
        this.productionOrder = this.data.productionOrder;

    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    deleteCallback(event) {
        this.service.delete(this.data)
            .then(result => {
                this.cancelCallback();
            });
    }
}
