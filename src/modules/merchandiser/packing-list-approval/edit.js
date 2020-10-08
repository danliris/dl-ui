import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';

@inject(Router, Service, CoreService)
export class Edit {
    isEdit = true;

    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Back",
        saveText: "Save Approval",
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.error = {};
        var idx=0;
        if(this.data.measurements){
            for(var i of this.data.measurements){
                i.MeasurementIndex=idx;
                idx++;
            }
        }

        if (this.data.items) {
            for (const item of this.data.items) {
                item.buyerAgent = this.data.buyerAgent;
                item.section = this.data.section;
                item.priceFOB = item.priceRO;
            }
        }
        
        this.data.truckingEstimationDate = new Date(new Date().setHours(0, 0, 0, 0));
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
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
