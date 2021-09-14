import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.selectedTransactionType = this.data.transactionType;
        
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }


    approve(event) {
        if (confirm("Approve Draft Packing List?")) {
            this.service.approve(this.data).then(result => {
                this.cancel(event);
            });
        }
    }

}
