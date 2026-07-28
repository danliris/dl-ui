import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.canDelete = true;
        this.isUsedInSalesTax = false;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        const result = await this.service.getSalesTaxById(id);

        this.isUsedInSalesTax = result === true;

        if (this.isUsedInSalesTax) {
            this.editCallback = null;
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event)
    {
      this.list();
    }

    // editCallback(event) {
    //     const encoded = Base64Helper.encode(this.data.Id);
    //     this.router.navigateToRoute('edit', { id: encoded });
    // }


    editCallback(event) {
        if (this.isUsedInSalesTax) {
            return;
        }

        const encoded = Base64Helper.encode(this.data.Id);
        this.router.navigateToRoute('edit', { id: encoded });
    }



    // deleteCallback(event) {
    //     this.service.delete(this.data)
    //         .then(result => {
    //             this.list();
    //         });
    // }

    deleteCallback() {
        if (this.isUsedInSalesTax) {
            return;
        }

        this.service.delete(this.data)
            .then(() => {
                this.list();
            });
    }
}
