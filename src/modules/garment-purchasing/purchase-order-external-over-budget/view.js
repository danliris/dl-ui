import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    hasCancel = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    // async activate(params) {

    //     var id = params.id;
    //     this.poExId = id;
    //     this.data = await this.service.getById(id);

    //     var getUsedBudget = [];
    //     var getPRById = [];
    //     var listPR = this.data.items.map((item) => {
    //         return item.prId.toString()
    //     });
    //     var listPrIds = listPR.filter(function (elem, index, self) {
    //         return index == self.indexOf(elem);
    //     })
    //     listPrIds.map((id) => {
    //         (getPRById.push(this.service.getPRById(id, ["no", "items.refNo", "items.quantity", "items.budgetPrice", "items.product.code"])))
    //     });

    //     for (var item of this.data.items) {
    //         (getUsedBudget.push(this.service.getListUsedBudget(item.prNo, item.prRefNo, item.product.code, this.data.no)))
    //     }

    //     var poIds = this.data.items.map(function (item) {
    //         return item.poId;
    //     });
    //     poIds = poIds.filter(function (elem, index, self) {
    //         return index == self.indexOf(elem);
    //     })

    //     var getStatusPo = [];
    //     for (var poId of poIds) {
    //         (getStatusPo.push(this.service.getPoId(poId, ["status.value"])))
    //     }

    //     return new Promise((resolve, reject) => {
    //         Promise.all(getStatusPo)
    //             .then((listStatusPo) => {
    //                 return Promise.all(getPRById)
    //                     .then((listPR) => {
    //                         return Promise.all(getUsedBudget)
    //                             .then((listUsedBudget) => {
    //                                 listUsedBudget = [].concat.apply([], listUsedBudget);
    //                                 for (var item of this.data.items) {
    //                                     var pr = listPR.find((pr) => pr.no.toString() == item.prNo.toString());
    //                                     var prItem = pr.items.find((prItem) => prItem.product.code.toString() === item.product.code.toString() && prItem.refNo === item.prRefNo)

    //                                     var budgetUsed = 0;
    //                                     if (listUsedBudget.length > 0) {
    //                                         var prevAmount = listUsedBudget.find((budget) => budget.prNo == item.prNo && budget.refNo == item.refNo && budget.product == item.product.code);
    //                                         if (prevAmount) {
    //                                             budgetUsed = budgetUsed + prevAmount.totalAmount;
    //                                         }
    //                                     }
    //                                     item.budgetUsed = budgetUsed;
    //                                     item.totalBudget = prItem.quantity * prItem.budgetPrice;
    //                                 }

    //                                 if (this.data.supplier) {
    //                                     this.selectedSupplier = this.data.supplier;
    //                                 }
    //                                 if (this.data.currency) {
    //                                     this.selectedCurrency = this.data.currency;
    //                                 }
    //                                 if (this.data.vat) {
    //                                     this.selectedVat = this.data.vat;
    //                                 }

    //                                 return resolve(this.data);
    //                             })
    //                     })
    //             })
    //     })
    // }



    async activate(params) {

                var id = params.id;
                this.poExId = id;
                this.data = await this.service.getById(id);
                // var items=[];

                // this.data.items=this.data.items;

                // for (var data of  this.data.items) {

                //             items.push({
                //                 poNo: data.poNo,
                //                 poId: data.poId,
                //                 prNo: data.prNo,
                //                 prId: data.prId,
                //                 prRefNo: data.prRefNo,
                //                 roNo: data.roNo,
                //                 productId: data.productId,
                //                 product: data.product,
                //                 categoryId: data.categoryId,
                //                 category: data.category,
                //                 defaultQuantity: Number(data.defaultQuantity),
                //                 defaultUom: data.defaultUom,
                //                 dealQuantity: Number(data.defaultQuantity),
                //                 dealUom: data.defaultUom,
                //                 budgetPrice: Number(data.budgetPrice),
                //                 priceBeforeTax: Number(data.budgetPrice),
                //                 pricePerDealUnit: Number(data.budgetPrice),
                //                 isOverBudget: data.isOverBudget,
                //                 uomConversion: data.uomConversion.unit,
                //                 quantityConversion: Number(data.defaultQuantity),
                //                 conversion: data.conversion,
                //                 useIncomeTax: data.useIncomeTax,
                //                 remark: data.remark
                //             });
                //         }
                //         this.data.items=items;
        
                // var getUsedBudget = [];
                // var getPRById = [];
                // var listPR = this.data.items.map((item) => {
                //     return item.prId.toString()
                // });
                // var listPrIds = listPR.filter(function (elem, index, self) {
                //     return index == self.indexOf(elem);
                // })
                // listPrIds.map((id) => {
                //     (getPRById.push(this.service.getPRById(id, ["no", "items.refNo", "items.quantity", "items.budgetPrice", "items.product.code"])))
                // });
        
                // for (var item of this.data.items) {
                //     (getUsedBudget.push(this.service.getListUsedBudget(item.prNo, item.prRefNo, item.product.code, this.data.no)))
                // }
        
                // var poIds = this.data.items.map(function (item) {
                //     return item.poId;
                // });
                // poIds = poIds.filter(function (elem, index, self) {
                //     return index == self.indexOf(elem);
                // })
        
                // var getStatusPo = [];
                // for (var poId of poIds) {
                //     (getStatusPo.push(this.service.getPoId(poId, ["status.value"])))
                // }
        
                // return new Promise((resolve, reject) => {
                //     Promise.all(getStatusPo)
                //         .then((listStatusPo) => {
                //             return Promise.all(getPRById)
                //                 .then((listPR) => {
                //                     return Promise.all(getUsedBudget)
                //                         .then((listUsedBudget) => {
                //                             listUsedBudget = [].concat.apply([], listUsedBudget);
                //                             for (var item of this.data.items) {
                //                                 var pr = listPR.find((pr) => pr.no.toString() == item.prNo.toString());
                //                                 var prItem = pr.items.find((prItem) => prItem.product.code.toString() === item.product.code.toString() && prItem.refNo === item.prRefNo)
        
                //                                 var budgetUsed = 0;
                //                                 if (listUsedBudget.length > 0) {
                //                                     var prevAmount = listUsedBudget.find((budget) => budget.prNo == item.prNo && budget.refNo == item.refNo && budget.product == item.product.code);
                //                                     if (prevAmount) {
                //                                         budgetUsed = budgetUsed + prevAmount.totalAmount;
                //                                     }
                //                                 }
                //                                 item.budgetUsed = budgetUsed;
                //                                 item.totalBudget = prItem.quantity * prItem.budgetPrice;
                //                             }
        
                //                             if (this.data.supplier) {
                //                                 this.selectedSupplier = this.data.supplier;
                //                             }
                //                             if (this.data.currency) {
                //                                 this.selectedCurrency = this.data.currency;
                //                             }
                //                             if (this.data.vat) {
                //                                 this.selectedVat = this.data.vat;
                //                             }
        
                //                             return resolve(this.data);
                //                         })
                //                 })
                //         })
                // })
                // return data;
            }
        
    cancel(event) {
        this.router.navigateToRoute('list');
    }

}