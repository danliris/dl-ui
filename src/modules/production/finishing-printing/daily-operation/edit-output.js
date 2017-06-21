import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class EditOutput {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getData(id);
        this.machine = this.data.machine;
        this.step = this.data.step;
        this.kanban = this.data.kanban;

        if (this.data.dateOutput == null)
            delete this.data.dateOutput;
        
        if (this.data.timeOutput == null)
            delete this.data.timeOutput;
    }

    view() {
        this.router.navigateToRoute('view-output', { id: this.data._id });
    }

    save() {
        this.service.update(this.data)
            .then(result => {
                this.view();
            })
            .catch(e => {
                this.error = e;
            })
    }
}