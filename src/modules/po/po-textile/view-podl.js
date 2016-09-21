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
        
        this.service.getPODLById(id).then(data => {
            this.data = data;
            
             if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })
        }
        })
    }

    list() {
        this.router.navigateToRoute('list-podl');
    }

    edit() {
        this.router.navigateToRoute('edit-podl', { id: this.data._id });
    }

    delete() {
        this.service.delete(this.data).then(result => {
            this.list();
        });
    }
    
    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
}
