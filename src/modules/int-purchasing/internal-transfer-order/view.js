import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        if (!this.data.isPosted) {
            this.hasEdit = true;
            this.hasDelete = true;
        }
     
        this.data.transferRequest=this.data;
        this.data.transferRequest.UnitName=this.data.DivisionName +"-"+ this.data.UnitName
         
        console.log(this.data);
        // this.data.transferRequest.UnitName=this.data.DivisionName +"-"+ this.data.UnitName;
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
}