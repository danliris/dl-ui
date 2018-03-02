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
        this.data = { items: [] };
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) {
        var payments = [this.data.items[0].payment];
        var e = {};
        var errorItems=[];
        for (var data of this.data.items) {
            if (payments.find(o => o != data.payment)) {
                payments.push(data.payment)
                e.purchaseOrderExternal = data.payment + " :semua Payment Method harus sama";
                errorItems.push(e)
            } else {
                e.purchaseOrderExternal = data.payment + " :semua Payment Method harus sama";
                errorItems.push(e)
            }
        }

        if (payments.length == 1) {
            this.error.items=[];
            this.service.create(this.data)
                .then(result => {
                    alert("Data berhasil dibuat");
                    this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                })
                .catch(e => {
                    this.error = e;
                })
        } else {
            this.error.items = errorItems;
        }
    }
}
