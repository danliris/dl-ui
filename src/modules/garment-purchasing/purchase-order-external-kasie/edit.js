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

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.kurs = await this.service.getKurs(this.data.currency.code, this.data.date);
        
        var getUsedBudget = [];
        var getPRById = [];
        var listPR = this.data.items.map((item) => {
            return item.prId.toString()
        });
        var listPrIds = listPR.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        })
        listPrIds.map((id) => {
            getPRById.push(this.service.getPRById(id, ["no", "items.refNo", "items.quantity", "items.budgetPrice", "items.product.code"]))
        });

        for (var item of this.data.items) {
            getUsedBudget.push(this.service.getListUsedBudget(item.prNo, item.prRefNo, item.product.code, this.data.no))
        }

        return Promise.all(getPRById)
            .then((listPR) => {
                return Promise.all(getUsedBudget)
                    .then((listUsedBudget) => {
                        listUsedBudget = [].concat.apply([], listUsedBudget);
                        for (var item of this.data.items) {
                            var pr = listPR.find((pr) => pr.no.toString() == item.prNo.toString());
                            var prItem = pr.items.find((prItem) => prItem.product.code.toString() === item.product.code.toString() && prItem.refNo === item.prRefNo)

                            var budgetUsed = 0;
                            if (listUsedBudget.length > 0) {
                                var prevAmount = listUsedBudget.find((budget) => budget.prNo == item.prNo && budget.refNo == item.refNo && budget.product == item.product.code);
                                if (prevAmount) {
                                    budgetUsed = budgetUsed + prevAmount.totalAmount;
                                }
                            }
                            item.budgetUsed = budgetUsed;
                            item.totalBudget = prItem.quantity * prItem.budgetPrice;
                        }

                        if (this.data.supplier) {
                            this.selectedSupplier = this.data.supplier;
                        }
                        if (this.data.currency) {
                            this.selectedCurrency = this.data.currency;
                        }
                        if (this.data.vat) {
                            this.selectedVat = this.data.vat;
                        }
                        return this.data;
                    })
            })
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save(event) {
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}

