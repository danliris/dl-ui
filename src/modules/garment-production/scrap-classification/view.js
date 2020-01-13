import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
        this.hasEdit=true;

    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    deleteCallback(event) {
        if (confirm(`Hapus ${this.data.Code}?`))
            this.service.delete(this.data)
                .then(result => {
                    this.cancelCallback();
                })
                .catch(e => {
                    this.error = e;
                })
    }
    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }
}