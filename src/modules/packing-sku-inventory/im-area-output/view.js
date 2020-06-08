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
        for(var item of this.data.inspectionMaterialProductionOrders){
            item.productionOrderDetails.filter(s => s.hasNextAreaDocument === false);
        }
        // this.data.inspectionMaterialProductionOrders = this.data.inspectionMaterialProductionOrders.filter(s => s.hasNextAreaDocument === false);
        //this.spp = await this.service.getSPPbySC(this.data.salesContractNo);
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