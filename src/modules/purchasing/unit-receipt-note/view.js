import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;

        this.data = await this.service.getById(id);
        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })
        }
        this.unit = this.data.unit;
        this.supplier = this.data.supplier;
        this.deliveryOrder = this.data.items;
        if(this.data.doNo){
            this.deliveryOrder.no=this.data.doNo;
            
        }
        for(var _item of this.deliveryOrder){
            _item.deliveredUom=_item.product.uom;
        }
        if(this.data.unit && this.data.supplier){
            this.data.unitId=this.data.unit._id;
            this.data.supplierId=this.data.supplier._id;
            
        }
        if(this.data.storage && this.data.unit){
                this.data.storage.unit=this.data.unit;
            }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit() {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete() {
        this.service.delete(this.data).then(result => {
            this.list();
        });
    }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
}
