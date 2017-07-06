import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;

    isCorrection = false;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        if (this.data.division) {
            this.selectedDivision = this.data.division;
        }
        if (this.data.supplier) {
            this.selectedSupplier = this.data.supplier;
        }
        if (this.data.category) {
            this.selectedCategory = this.data.category;
        }
        if (this.data.currency) {
            this.selectedCurrency = this.data.currency;
        }
        if (this.data.vat) {
            this.selectedVat = this.data.vat;
        }

        if (this.data.items) {
            this.isCorrection = this.data.items
                .map((item) => {
                    return item.unitReceiptNote.items
                        .map((urnItem) => urnItem.correction.length > 0)
                        .reduce((prev, curr, index) => {
                            return prev || curr
                        }, false);
                })
                .reduce((prev, curr, index) => {
                    return prev || curr
                }, false);

            if (!this.isCorrection) {
                this.hasEdit = true;
                this.hasDelete = true;
            }
        }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete(event) {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }
}
