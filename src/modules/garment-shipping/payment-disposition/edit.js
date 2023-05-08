import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
    isEdit = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        var type = params.type; 
        if(type == "EMKL")
        {
            this.data = await this.service.getByIdEMKL(id);
        }else{
            this.data = await this.service.getById(id);
        }
        this.error = {};
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    saveCallback(event) {
        if(this.data.paymentType == 'EMKL'){
            this.service.updateEMKL(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.id });
            })
            .catch(e => {
                this.error = e;
            })
        }else{
        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.id });
            })
            .catch(e => {
                this.error = e;
            })
        }
    }
}
