import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { ServiceAccounting } from './service-accounting';


@inject(Router, Service, ServiceAccounting)
export class View {
    constructor(router, service, serviceAccounting) {
        this.router = router;
        this.service = service;
        this.serviceAccounting = serviceAccounting;
    }

    isLocked = false;
    async activate(params) {
        var id = params.id;

        var activeLockingTransaction = await this.serviceAccounting.getLastActiveLockingTransaction();

        this.data = await this.service.getById(id);
        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })
        }

        // console.log(activeLockingTransaction);
        if (this.data.date <= activeLockingTransaction.LockDate)
            this.isLocked = true;


        this.unit = this.data.unit;
        this.supplier = this.data.supplier;
        this.deliveryOrder = this.data.deliveryOrder;
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
