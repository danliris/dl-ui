import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasUnpost = false;

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
        var kurs = await this.service.getKurs(this.data.Currency.Code, new Date(this.data.OrderDate).toLocaleDateString());
        this.kurs=kurs[0];

        if(this.data.Currency){
            this.selectedCurrency=this.data.Currency;
        }

        if(this.data.Supplier){
            this.selectedSupplier=this.data.Supplier;
        }

        if(this.data.IncomeTax){
            this.selectedIncomeTax=this.data.IncomeTax;
        }

        if (!this.data.IsPosted) {
            this.hasDelete = true;
            this.hasEdit = true;
        }
        if (this.data.IsPosted) {
            this.hasUnpost = true;
        }

        var getUsedBudget = [];
        for(var item of this.data.Items){
            getUsedBudget.push(this.service.getPoId(item.POId));
        }
        var pr=[];
        var initial=[];
        var remaining=[];
        return Promise.all(getUsedBudget)
            .then((listUsedBudget) => {
                for(var item of this.data.Items){
                    var Ipo= listUsedBudget.find(a=>a.Id==item.POId);
                    var po= Ipo.Items[0];
                    if(!initial[item.PRNo + item.Product.Id]){
                        initial[item.PRNo + item.Product.Id]=po.RemainingBudget + item.UsedBudget;
                    }
                    else{
                        initial[item.PRNo + item.Product.Id]+= item.UsedBudget;
                    }
                }
                for(var a of this.data.Items){
                    var filter= a.PRNo + a.Product.Id;
                    a.Initial=initial[a.PRNo + a.Product.Id];
                    if(pr.length==0){
                        pr.push(a);
                        //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                        remaining[a.PRNo + a.Product.Id]=a.Initial;
                        a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.UsedBudget;
                        remaining[a.PRNo + a.Product.Id]=a.remainingBudget;
                    }
                    else{
                        var dup=pr.find(b=> b.PRNo == a.PRNo && b.Product.Id==a.Product.Id);
                        if(dup){
                            //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                            a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.UsedBudget;
                            remaining[a.PRNo + a.Product.Id]=a.remainingBudget;
                        }
                        else{
                            pr.push(a);
                            //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                            a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.UsedBudget;
                            remaining[a.PRNo + a.Product.Id]=a.Initial;
                        }
                    }
                }
                

            });
        
        // var getUsedBudget = [];
        // var getPRById = [];
        // var listPR = this.data.items.map((item) => {
        //     return item.prId.toString()
        // });
        // var listPrIds = listPR.filter(function (elem, index, self) {
        //     return index == self.indexOf(elem);
        // })
        // listPrIds.map((id) => {
        //     getPRById.push(this.service.getPRById(id, ["no", "items.refNo", "items.quantity", "items.budgetPrice", "items.product.code"]))
        // });

        // for (var item of this.data.items) {
        //     getUsedBudget.push(this.service.getListUsedBudget(item.prNo, item.prRefNo, item.product.code, this.data.no))
        // }

        // var poIds = this.data.items.map(function (item) {
        //     return item.poId;
        // });
        // poIds = poIds.filter(function (elem, index, self) {
        //     return index == self.indexOf(elem);
        // })

        // var getStatusPo = [];
        // for (var poId of poIds) {
        //     getStatusPo.push(this.service.getPoId(poId, ["status.value"]))
        // }
        // return Promise.all(getStatusPo)
        //     .then((listStatusPo) => {
        //         return Promise.all(getPRById)
        //             .then((listPR) => {
        //                 return Promise.all(getUsedBudget)
        //                     .then((listUsedBudget) => {
        //                         listUsedBudget = [].concat.apply([], listUsedBudget);
        //                         for (var item of this.data.items) {
        //                             var pr = listPR.find((pr) => pr.no.toString() == item.prNo.toString());
        //                             var prItem = pr.items.find((prItem) => prItem.product.code.toString() === item.product.code.toString() && prItem.refNo === item.prRefNo)

        //                             var budgetUsed = 0;
        //                             if (listUsedBudget.length > 0) {
        //                                 var prevAmount = listUsedBudget.find((budget) => budget.prNo == item.prNo && budget.refNo == item.refNo && budget.product == item.product.code);
        //                                 if (prevAmount) {
        //                                     budgetUsed = budgetUsed + prevAmount.totalAmount;
        //                                 }
        //                             }
        //                             item.budgetUsed = budgetUsed;
        //                             item.totalBudget = prItem.quantity * prItem.budgetPrice;
        //                         }

        //                         if (this.data.status.value === 0) {
        //                             isVoid = true;
        //                         }
        //                         if (listStatusPo.find(po => { return po.status.value > 3 }) != undefined) {
        //                             isArriving = true;
        //                         }
                                
        //                         if (this.data.isPosted && !isVoid && !isArriving && !this.data.isClosed) {
        //                             this.hasUnpost = true;
        //                         }

        //                         

        //                         return this.data;
        //                     })
        //             })
        //     })
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
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