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

        if (this.data.dateEnd == null)
            delete this.data.dateEnd;
        
        if (this.data.timeInMillisEnd == null)
            delete this.data.timeInMillisEnd;
        
        if (this.data.selectedProductionOrderDetail.colorRequest){
            this.data.selectedProductionOrderDetail.toString = function(){
                return `${this.colorRequest}`;  
            };
        }   
    }

    view() {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }
}
