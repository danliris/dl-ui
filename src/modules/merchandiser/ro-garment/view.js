import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    readOnly = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        console.log(this.data);
        // if(this.data.CostCalculationGarment){
        //     this.data.CostCalculationGarment=await this.service.getCostCalculationGarmentById(this.data.CostCalculationGarment.Id);
        //     console.log(this.data);
        // }
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
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}