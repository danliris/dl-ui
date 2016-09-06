import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class View {
    totalQty=0;
    totalAmount=0;
    showProductDetail = false;
    index=4;
    konfeksi="";
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        await this.service.getById(id)
        .then(data=>{
            this.data = data;
            this.sumSJ();
            this.data.items.forEach(item=>{
            item.showDetails = false
        })
        })
    }
    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
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
    
    setKonfeksi(RONo) {
        var ro = RONo.substr(2, 1);
        console.log(ro);
        if (ro == "1")
            return "K2A"
        else if (ro == "2")
            return "K2B"
        else if (ro == "3")
            return "K1A"
        else if (ro == "4")
            return "K1B"
        else if (ro == "5")
            return "K1C"
        else
            return ro
    }

}
