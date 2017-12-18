import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasCancelPo = false;
    hasUnpost = false;
    hasClosePo = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    async activate(params) {
        var isVoid = false;
        var isArriving = false;
        var id = params.id;
        this.poExId = id;
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

        var poIds = this.data.items.map(function (item) {
            return item.poId;
        });
        poIds = poIds.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        })

        var getStatusPo = [];
        for (var poId of poIds) {
            getStatusPo.push(this.service.getPoId(poId, ["status.value"]))
        }
        return Promise.all(getStatusPo)
            .then((listStatusPo) => {
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

                                if (this.data.status.value === 0) {
                                    isVoid = true;
                                }
                                if (listStatusPo.find(po => { return po.status.value > 3 }) != undefined) {
                                    isArriving = true;
                                }
                                if (!this.data.isPosted) {
                                    this.hasDelete = true;
                                    this.hasEdit = true;
                                }
                                if (this.data.isPosted && !isVoid && !isArriving && !this.data.isClosed) {
                                    this.hasUnpost = true;
                                    this.hasCancelPo = true;
                                }
                                if (this.data.isPosted && !isVoid && isArriving && !this.data.isClosed) {
                                    this.hasClosePo = true;
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
            })
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

    cancelPO(e) {
        this.service.cancel(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

    unpostPO(e) {
        this.service.unpost(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

    closePO(e) {
        this.service.close(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

}