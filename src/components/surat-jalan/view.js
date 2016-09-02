import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class View {
    totalQty=0;
    totalAmount=0;
    showProductDetail = false;
    index=4;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate(params) {
        var id = params.id;
        this.service.getById(id)
        .then(data=>{
            this.data = data;
            this.sumSJ();
        })
    }
    
    showDetail(index) {
        this.showProductDetail=true;
        this.index=index;
   }
   
   hideDetail(index) {
        this.index=index;
        this.showProductDetail=false;
   }
   
    list()
    {
        this.router.navigateToRoute('list');
    }

    edit()
    {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete()
    {
        this.service.delete(this.data)
        .then(result=>{
            this.list();
        });
    }
    
    sumSJ()
    {
        var qty = 0;
        var amount = 0;
        for(var po of this.data.items)
        {
            for(var poItem of po.items)
            {
                qty = qty + poItem.realizationQuantity
                amount = amount + (poItem.realizationQuantity * poItem.price)
            }
        }
        this.totalQty=qty
        this.totalAmount=amount
    }
}
