import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    canEdit = true;
    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.type = "OUT";
        // if (this.data.type == "OUT") {
        //     this.data.shippingProductionOrders = this.data.shippingProductionOrders.filter(s => s.hasNextAreaDocument === false);
        // }

        //this.spp = await this.service.getSPPbySC(this.data.salesContractNo);
        this.canEdit =  this.data.destinationArea == "BUYER" && this.data.updateBySales == false;

        console.log(this.data.shippingItems);

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
            }).catch(e => {
                if (e.statusCode == 500) {
                    alert(e.error);
                } else {
                    this.error = e;
                }
            });
    }
}