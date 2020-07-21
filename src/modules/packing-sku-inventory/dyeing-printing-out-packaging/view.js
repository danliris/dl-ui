import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
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
        // console.log(await this.service.getById(id));
        // console.log(this.data);
        // console.log(this);
        var groupObj = _.groupBy(this.data.packagingProductionOrders, 'productionOrderNo');
        // console.log(groupObj);
        var mappedGroup = _.map(groupObj);
        // console.log(mappedGroup);

        var packagingProductionOrdersGroup = [];
        mappedGroup.forEach((element, index) => {
            var headData = {};
            element.forEach((x, i) => {
                // console.log(x);
                if (i == 0) {
                    // console.log(x);
                    headData = x;
                    headData.PackagingList = [];
                    // console.log(headData);
                }
                // console.log(x.PackagingList);
                if (headData.PackagingList != undefined) {
                    headData.PackagingList.push(x);
                }
            });
            // var headData = element[0]
            // console.log(headData);
            // console.log(element);
            // console.log(headData);
            //     headData.PackagingList = element;
            packagingProductionOrdersGroup.push(headData);
        });
        // console.log(packagingProductionOrdersGroup);
        this.data.packagingProductionOrders = packagingProductionOrdersGroup;

        this.canEdit = true;

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