import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { StatusHelper } from '../../../utils/disable-update';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        const isSuccess = (this.data.StatusD365 === "Success");
        StatusHelper.disableEditDelete(this, isSuccess);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        if (confirm("Oke?")) {
            this.service.delete(this.data)
                .then(result => {
                    this.list();
                });
        }
    }
}
