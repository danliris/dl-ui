import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {items: [{}, {}] };
        this.error = {
            unit: "unit is required",
            items: [
                {
                    product: "product does not exist"
                },
                {
                    defaultQuantity: "default quantity error"
                }
            ]
        }
    }

    back() {
        this.router.navigateToRoute('list');
    }

<<<<<<< HEAD:src/modules/po/po-textile/create.js
    save() {
        console.log(this.data)
=======
    save() { 
>>>>>>> e825bd548fa2e1f14b2f2a9f4995f65618baa31e:src/modules/purchasing/po-textile/create.js
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
