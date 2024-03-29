import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import { debug } from 'util';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    async activate(params) {

        var id = params.id;
        this.data = await this.service.getById(id);
    }

    view(data) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save() {
        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }  
}
