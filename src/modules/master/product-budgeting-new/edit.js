import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service, Dialog)
export class Edit {
    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        const decoded = Base64Helper.decode(params.id);
        var id = decoded;
        this.data = await this.service.getById(id);
    }

    cancelCallback(event) {
        const encoded = Base64Helper.encode(this.data.Id);
        this.router.navigateToRoute('view', { id: encoded });
    }

    saveCallback(event) {
        if (this.data.Price != this.data.originPrice) {
            this.dialog.show(AlertView, this.data)
                .then(response => {
                    this.data.EditReason = response.output.EditRemark;
                    this.data.IsPriceChange = true;

                    this.service.updateProduct(this.data)
                        .then(result => {
                            const encoded = Base64Helper.encode(this.data.Id);
                            this.router.navigateToRoute('view', { id: encoded });
                        })
                        .catch(e => {
                            this.error = e;
                        });
                });
        } else {
            this.data.IsPriceChange = false;
            this.service.updateProduct(this.data)
                .then(result => {
                    alert("Data berhasil di ubah");
                    const encoded = Base64Helper.encode(this.data.Id);
                    this.router.navigateToRoute('view', { id: encoded });
                })
                .catch(e => {
                    this.error = e;
                });
        }
    }
}