import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service; 
    }

    activate(params) {
        var id = params.id;
        this.service.getById(id)
            .then(data => {
                this.data = data;
            })
    }

    view() {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        console.log(this.data);
        this.service.update(this.data)
            .then(result => {
                this.view();
            })
            .catch(e => {
                this.error = e;
            })
    }
}
