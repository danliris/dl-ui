import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;

        this.data = await this.service.getById(id);
        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })
        }

        this.unit = this.data.Unit;
        this.supplier = {Id: this.data.Supplier.Id, code: this.data.Supplier.Code, name: this.data.Supplier.Name};
        this.deliveryOrder = { Id: this.data.DOId, doNo: this.data.DONo };

        let totalOrderQuantity = this.data.Items.reduce((acc, cur) => acc + cur.OrderQuantity, 0);
        if (!this.data.IsCorrection || totalOrderQuantity === 0) {
            this.hasEdit = true;
        }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete() {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
}
