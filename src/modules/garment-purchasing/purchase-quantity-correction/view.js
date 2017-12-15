import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    isView = true

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.isUseVat = this.data.useVat;
        this.isUseIncomeTax = this.data.useIncomeTax;
        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
}
