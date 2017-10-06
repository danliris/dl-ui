import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.currency = this.data.currency;
        this.supplier = this.data.supplier;
    }

    bind() {
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        if (typeof this.data.date === 'object') {
            this.data.date.setHours(this.data.date.getHours() - this.data.date.getTimezoneOffset() / 60);
        }
        var listStatus = this.data.items.map((invoiceNote) => {
            var invoiceNoteItems = invoiceNote.items.map((invoiceNoteItem) => {
                var doItems = invoiceNoteItem.items.map((doItem) => {
                    return doItem.hasUnitReceiptNote
                })
                return doItems;
            })
            invoiceNoteItems = [].concat.apply([], invoiceNoteItems);
            return invoiceNoteItems;
        })

        listStatus = [].concat.apply([], listStatus);

        this.data.hasUnitReceiptNote = listStatus.map((item) => item)
            .reduce((prev, curr, index) => {
                return prev && curr
            }, true);

        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}
