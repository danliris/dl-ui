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
        this.data = {};
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    bind() {
        this.error = {};
    }

    save() {

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

        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
