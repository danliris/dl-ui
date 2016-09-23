import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    
    dataToBeSplit = {};
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.isSplit = params.isSplit == "true" ? true : false;
        if(this.data.isSplit)
        {
            this.dataToBeSplit = Object.assign({},this.data);
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

    split() {
        console.log(this.dataToBeSplit);
        this.service.split(this.copyForSplit(this.data)).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }

    copyForSplit(purchaseOrder) {
        var newPurchaseOrder = Object.assign({}, purchaseOrder);
        delete newPurchaseOrder._id;

        newPurchaseOrder.sourcePurchaseOrderId = purchaseOrder._id;
        newPurchaseOrder.sourcePurchaseOrder = Object.assign({}, this.dataToBeSplit);
        return newPurchaseOrder;
    }
}