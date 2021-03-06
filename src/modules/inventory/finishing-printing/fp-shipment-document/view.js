import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    buyerReadOnly = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        // this.selectedStorage = this.data.storage;

        // for (var detail of this.data.details) {
        //     for (var item of detail.items) {
        //         var properties = Object.getOwnPropertyNames(item);
        //         var identityFields = properties.find((property) => property.toString().toLowerCase() === "productname");
        //         this.isNewStructure = identityFields ? false : true;
        //     }
        // }

        if (!this.data.IsVoid) {
            this.isVoidAble = true;
        }
    }

    update() {
        this.data.isVoid = true;
        this.service.update(this.data)
            .then((result) => {
                this.router.navigateToRoute('list');
            })
            .catch((e) => {
                this.error = e;
            })
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }
}