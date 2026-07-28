import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service, PurchasingService} from './service';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service, PurchasingService)
export class View {
    constructor(router, service, purchasingService) {
        this.router = router;
        this.service = service;
        this.purchasingService = purchasingService;
        this.canDelete = true;
        this.isUsedInEPO = false;
    }

    async activate(params) {
        const decoded = Base64Helper.decode(params.id);
        var id = decoded;
        this.data = await this.service.getById(id);
        const result = await this.purchasingService.getEPOById(id);

        this.isUsedInEPO = result === true;

        if (this.isUsedInEPO) {
            this.deleteCallback = null;
        }


        
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
      this.list();
    }

    // editCallback(event) {
    //     const encoded = Base64Helper.encode(this.data.Id);
    //     this.router.navigateToRoute('edit', { id: encoded });
    // }
   
    // deleteCallback(event) {
    //     this.service.delete(this.data)
    //         .then(result => {
    //             this.list();
    //         });
    // }  

    deleteCallback() {
        if (this.isUsedInEPO) {
            return;
        }

        this.service.delete(this.data)
            .then(() => {
                this.list();
            });
    }
}