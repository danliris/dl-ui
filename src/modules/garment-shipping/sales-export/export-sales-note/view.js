import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Base64Helper } from '../../../../utils/base-64-coded-helper';
import { StatusHelper } from '../../../../utils/disable-update';

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        let decoded = Base64Helper.decode(id);
        id = decoded;
        this.data = await this.service.getById(id);
        // console.log(this.data)
        this.selectedTransactionType = this.data.transactionType;
        if (this.data.isUsed) {
            this.editCallback = null;
            this.deleteCallback = null;
        }
        if (this.data.isRejectedShipping) {
            this.alertInfo = "<strong>Alasan Reject oleh Shipping:</strong> " + this.data.rejectedReason;
        }
        else if (this.data.isRejectedFinance) {
            this.alertInfo = "<strong>Alasan Reject oleh Finance:</strong> " + this.data.rejectedReason;
        }
        else {
            this.alertInfo = "";
        }
        const isSuccess = (this.data.statusPSD365 === "Success" || this.data.statusINVD365 === "Success");
        StatusHelper.disableEditDelete(this, isSuccess);
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        const encoded = Base64Helper.encode(this.data.id);
        this.router.navigateToRoute('edit', { id: encoded });
    }

    deleteCallback(event) {
        if (confirm("Hapus?")) {
            this.service.delete(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

}
