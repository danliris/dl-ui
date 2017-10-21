import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {

    }
    bind() {
        this.data = { useIncomeTax: false, useVat: false, items: [] };
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    // determineActivationStrategy() {
    //     return activationStrategy.replace; //replace the viewmodel with a new instance
    //     // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    //     // or activationStrategy.noChange to explicitly use the default behavior
    // }

    save(event) {
        var itemToBeSaved = this.data.items.filter(function (item) {
            return item.check
        });
        var _data = Object.assign({}, this.data);
        _data.items = itemToBeSaved;
        this.service.create(_data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.data.no = "";
                this.data.items = this.data.items.filter(function (item) {
                    return !item.check
                });
                // this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                // var supplier = Object.assign({}, this.data.supplier);
                // this.data = Object.assign({}, { supplier: supplier, supplierId: supplier._id, items: [] });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
