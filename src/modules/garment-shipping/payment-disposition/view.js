import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        var type = params.type; 
        if(type == "EMKL")
        {
            this.data = await this.service.getByIdEMKL(id);
        }else{
            this.data = await this.service.getById(id);
        }
       
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.id,type:this.data.paymentType });
    }

    deleteCallback(event) {
        if (confirm("Hapus Data?")) {
            this.service.delete(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }

}
