import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error={};
        // this.error = {
        //     purchaseRequest:{unit: "unit is required"},
        //     items: [
        //         {
        //             product: "product does not exist"
        //         },
        //         {
        //             defaultQuantity: "default quantity error"
        //         }
        //     ]
        // }
    }

    back() {
        this.router.navigateToRoute('list');
    }

    save() { 
        console.log(this.data);
        this.service.create(this.data)
            .then(result => {
                this.back();
            })
            .catch(e => {
                console.log(e);
                this.error = e;
            })
    }
}