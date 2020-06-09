import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import * as _ from 'underscore';

@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        var groupObj = _.groupBy(this.data.packagingProductionOrders,'productionOrderNo');

        var mappedGroup = _.map(groupObj);
        
        var packagingProductionOrdersGroup = [];
        mappedGroup.forEach((element,index) => {
            var headData = {};
            
            element.forEach((x,i)=>{
                if(i==0){
                    headData = x;
                    headData.PackagingList = [];
                }
                headData.PackagingList.push(x);
            });
        });
        
        this.canEdit=true;
    }

    view(data) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save() {
        
        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }
}