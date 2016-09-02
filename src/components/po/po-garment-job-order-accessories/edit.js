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
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }
    
    copyForSplit(purchaseOrder) {
        var newPurchaseOrder = {};
        newPurchaseOrder.iso = purchaseOrder.iso;
        newPurchaseOrder.RONo = purchaseOrder.RONo;
        newPurchaseOrder.PRNo = purchaseOrder.PRNo;
        newPurchaseOrder.RefPONo = purchaseOrder.PRNo;
        newPurchaseOrder.linkedPONo = purchaseOrder.PONo;
        newPurchaseOrder.article = purchaseOrder.article;
        newPurchaseOrder.buyerId = purchaseOrder.buyerId;
        newPurchaseOrder.buyer = purchaseOrder.buyer;
        newPurchaseOrder.shipmentDate = purchaseOrder.shipmentDate;
        newPurchaseOrder.items = purchaseOrder.items;

        return newPurchaseOrder;
    }
}
