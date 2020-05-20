import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import * as _ from 'underscore';
// import{Underscore} from 'underscore';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        // console.log(this);
        //this.spp = await this.service.getSPPbySC(this.data.salesContractNo);
        var groupObj = _.groupBy(this.data.packagingProductionOrders,'productionOrderNo');
        var mappedGroup = _.map(groupObj);
        var packagingProductionOrdersGroup = [];
        mappedGroup.forEach((element,index) => {
            var headData = element[0]
            headData.PackagingList = element;
            packagingProductionOrdersGroup.push(headData);
        });
        this.data.packagingProductionOrders = packagingProductionOrdersGroup;
        // console.log(sort);
        // console.log(mappedGroup);
        this.canEdit=true;
        
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit(data) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}