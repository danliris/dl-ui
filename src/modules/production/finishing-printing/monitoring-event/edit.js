import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

var moment = require('moment');

@inject(Router, Service)
export class Edit {
    selectedProductionOrderDetail = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    bind()
    {
        if (this.data.selectedProductionOrderDetail.colorRequest){
            this.selectedProductionOrderDetail = this.data.selectedProductionOrderDetail;
            this.data.selectedProductionOrderDetail = this.data.selectedProductionOrderDetail.colorRequest;
        }   
    }
    
    view() {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        if (!(this.data.selectedProductionOrderDetail instanceof Object))
            this.data.selectedProductionOrderDetail = this.selectedProductionOrderDetail;

        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }
}
