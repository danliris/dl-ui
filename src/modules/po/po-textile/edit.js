import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.isSplit = params.isSplit == "true" ? true : false;
        // this.data.RefPONo = params.isSplit == "true" ? "" : this.data.RefPONo;
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
         this.service.split(this.copyForSplit(this.data)).then(result => {
            // console.log(this.data._id );
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }

    copyForSplit(purchaseOrder) {
        var newPurchaseOrder = {};
        newPurchaseOrder.iso = purchaseOrder.iso;
        newPurchaseOrder.PRNo = purchaseOrder.PRNo;
        newPurchaseOrder.RefPONo = purchaseOrder.RefPONo;
        newPurchaseOrder.linkedPONo = purchaseOrder.PONo;
        newPurchaseOrder.PODLNo = purchaseOrder.PODLNo;
        newPurchaseOrder.unit = purchaseOrder.unit;
        newPurchaseOrder.PRDate = purchaseOrder.PRDate;
        newPurchaseOrder.category = purchaseOrder.category;
        newPurchaseOrder.rate = purchaseOrder.rate;
        newPurchaseOrder.requestDate = purchaseOrder.requestDate;
        newPurchaseOrder.staffName = purchaseOrder.staffName;
        newPurchaseOrder.receivedDate = purchaseOrder.receivedDate;
        newPurchaseOrder.items = purchaseOrder.items;
        
        console.log(newPurchaseOrder);
        return newPurchaseOrder;
    }
}
