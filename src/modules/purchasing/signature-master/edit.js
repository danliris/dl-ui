import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        const decoded = Base64Helper.decode(params.id);
        var id = decoded;

        this.data = await this.service.getById(id);
    }

    cancelCallback(event) {
        const encoded = Base64Helper.encode(this.data.Id);
        this.router.navigateToRoute('view', { id: encoded });
    }

    saveCallback(event) {
        this.service.update(this.data)
            .then(result => {
                const encoded = Base64Helper.encode(this.data.Id);
                this.router.navigateToRoute('view', { id: encoded });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
