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

