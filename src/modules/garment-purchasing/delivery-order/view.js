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
    isReceived = false;

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.supplier = this.data.supplier;
        this.isReceived = this.data.items
            .map((item) => {
                var _isReceived = item.fulfillments
                    .map((fulfillment) => fulfillment.realizationQuantity.length > 0)
                    .reduce((prev, curr, index) => {
                        return prev || curr
                    }, false);
                return _isReceived
            })
            .reduce((prev, curr, index) => {
                return prev || curr
            }, false);

        var hasInvoiceBeaCukai = this.data.hasInvoice ? true : this.data.customsId ? true : false;
        if (!this.isReceived && !hasInvoiceBeaCukai) {
            this.hasDelete = true;
            this.hasEdit = true;
        }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete(event) {
        this.service.delete(this.data)
        .then(result => {
            this.cancel();
        })
        .catch(e => {
            if (e.statusCode == 500) {
                alert("Terjadi Kesalahan Pada Sistem!\nData tidak terhapus secara sempurna!");
                this.cancel();
            } else {
                this.error = e;
            }
        });
    }
}
