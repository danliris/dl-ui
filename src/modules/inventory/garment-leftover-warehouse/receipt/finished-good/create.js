import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {

    isCreate = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = { Items: [] };
        this.error = {};
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        console.log(this.data);
        this.data.Items=[];
        if(this.data.DataItems){
            for(var exGood of this.data.DataItems){
                if(exGood.details){
                    for(var detail of exGood.details){
                        var dataItem={};
                        dataItem.ExpenditureGoodId=exGood.ExpenditureGoodId;
                        dataItem.ExpenditureGoodNo = exGood.ExpenditureGoodNo;
                        dataItem.RONo = exGood.RONo;
                        dataItem.Article = exGood.Article;
                        dataItem.Comodity = exGood.Comodity;
                        dataItem.Buyer = exGood.Buyer;
                        dataItem.ExpenditureGoodItemId= detail.ExpenditureGoodItemId;
                        dataItem.Size=detail.Size;
                        dataItem.Quantity= detail.Quantity;
                        dataItem.Uom= detail.Uom;
                        dataItem.Remark= detail.Remark;
                        var d= exGood.dataDetails.find(a=>a.Size.Id==detail.Size.Id && a.Uom.Id==detail.Uom.Id);
                        dataItem.LeftoverComodity=d.LeftoverComodity;
                        this.data.Items.push(dataItem);
                    }
                }
            }
        }
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(error => {
                this.error = error;
            });
    }
}