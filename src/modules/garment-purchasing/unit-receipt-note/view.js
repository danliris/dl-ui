import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, Dialog)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        var id = params.id;
        var orderQty=0;
        this.data = await this.service.getById(id);
        if (this.data.Items) {
            this.data.Items.forEach(item => {
                item.showDetails = false;
                orderQty += item.OrderQuantity;
            });
            if (orderQty==0){
                this.hasDelete=true;
            }
        }

        this.unit = this.data.Unit;
        this.supplier = {Id: this.data.Supplier.Id, code: this.data.Supplier.Code, name: this.data.Supplier.Name};
        this.deliveryOrder = { Id: this.data.DOId, doNo: this.data.DONo };
        this.storage = this.data.Storage;

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
        this.dialog.show(AlertView,this.data)
        .then(response => {
            this.data.DeletedReason = response.output.Remark;

            this.service.delete(this.data).then(result => {
                this.cancel();
            });
        });
    }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
}
