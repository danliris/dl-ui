import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var orderNo = params.no;
        var id=params.id;
        var dataSales=await this.service.getById(id);
        for(var i of dataSales.productionOrders){
            if(i.orderNo==orderNo)
            {
                i.dataId=id;
                this.data=i;
                this.data.material={
                    _id:i.material
                };
                break;
            }
            
        }
    }

    view(data,no) {
        this.router.navigateToRoute('view', { id: this.data.dataId, no: `${this.data.orderNo}` });
    }

    save() {
        this.service.update(this.data,this.data.dataId).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }

    
}