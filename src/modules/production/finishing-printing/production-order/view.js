import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    orderNo="";

    async activate(params) {
        var orderNo = params.no;
        var id=params.id;
        var dataSales=await this.service.getById(id);
        for(var i of dataSales.productionOrders){
            if(i.orderNo==orderNo)
            {
                i._id=id;
                this.data=i;break;
            }
            
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit(data, no) {
        this.router.navigateToRoute('edit', { id: this.data._id , no: `${data.orderNo}`});
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}