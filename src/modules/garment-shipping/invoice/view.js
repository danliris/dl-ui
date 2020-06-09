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
        this.data = await this.service.getById(id);
        this.hasEdit=true;
        this.hasDelete=true;
        this.hasCancel=true;
        this.isView= true;
        console.log(this.data);
      
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }
    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }
    delete(event) {
        if (confirm(`Hapus ${this.data.invoiceNo}?`))
            this.service.delete(this.data)
                .then(result => {
                    this.cancel();
                })
                .catch(e => {
                    this.error = e;
                })
    }
   
}