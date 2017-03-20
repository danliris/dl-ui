import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

var moment = require('moment');

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        if (this.data.dateEnd == null)
            delete this.data.dateEnd;
        
        if (this.data.timeInMillisEnd == null)
            delete this.data.timeInMillisEnd;
    }

    back() {
        this.router.navigateToRoute('list');
    }

    edit() {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete() {
        this.service.delete(this.data).then(result => {
                this.back();
        });
    }
}