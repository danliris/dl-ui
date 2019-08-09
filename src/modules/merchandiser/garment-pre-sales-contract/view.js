import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    isView = true;
    isPosted = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        console.log(this.data)
        this.hasUnpost = this.data.IsPosted && !this.data.IsCC && !this.data.IsPR;
        if (this.data.IsPosted) {
            this.isPosted = false;
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit(data) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }

    unpostCallback(event) {
        if (confirm(`Unpost Data?`))
            this.service.unpost({ Id: this.data.Id })
                .then(result => {
                    this.list();
                });
    }
}