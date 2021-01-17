import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { MasterService } from './master-service';


@inject(Router, Service, MasterService)
export class Edit {
    constructor(router, service, masterService) {
        this.router = router;
        this.service = service;
        this.masterService = masterService;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);
        this.data.Items = this.data.PurchasingCategoryIds.map(async (item) => {
            item.Category = await this.masterService.getCategoryById(item);
        })
        this.cashflowCategory = await this.service.getBudgetCashflowCategoryById(this.data.CashflowCategoryId);
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
