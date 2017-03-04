import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getData(id);

        if (this.data.dateOutput == null)
            delete this.data.dateOutput;
        
        if (this.data.timeOutput == null)
            delete this.data.timeOutput;
    }

    list() {
        this.router.navigateToRoute('list');
    }

    editInput() {
        this.router.navigateToRoute('input', { id: this.data._id });
    }

    editOutput() {
        this.router.navigateToRoute('output', { id: this.data._id });
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}