import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Base64Helper } from '../../../../../utils/base-64-coded-helper';
import { StatusHelper } from '../../../../../utils/disable-update';

 
@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        let decoded = Base64Helper.decode(id);
        id = decoded;
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
        const encoded = Base64Helper.encode(this.data.Id);
        this.router.navigateToRoute('edit', { id: encoded });
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
