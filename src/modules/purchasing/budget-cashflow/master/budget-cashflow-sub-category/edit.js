import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { MasterService } from './master-service';


@inject(Router, Service, MasterService)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.masterService = masterService;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
        this.cashflowType = await this.service.getBudgetCashflowTypeById(this.data.CashflowTypeId);
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {

        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('list');
            })
            .catch(e => {
                this.error = e;
            })
    }
}
