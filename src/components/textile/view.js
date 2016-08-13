import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate(params) {
        var id = params.id;
        this.service.getById(id)
        .then(data=>{
            this.data = data;
        })
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
}
