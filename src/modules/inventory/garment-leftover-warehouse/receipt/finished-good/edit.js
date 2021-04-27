import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
    isEdit = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.error = {};
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        this.data.Items=[];
        if(this.data.DataItems){
            for(var exGood of this.data.DataItems){
                if(exGood.details){
                    for(var detail of exGood.details){
                        var dataItem={};
                        dataItem.Id=detail.Id;
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
                        dataItem.LeftoverComodity=d.LeftoverComodity || null;
                        this.data.Items.push(dataItem);
                    }
                }
                else{
                    this.data.Items.push({});
                }
            }
        }
        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.Id });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
