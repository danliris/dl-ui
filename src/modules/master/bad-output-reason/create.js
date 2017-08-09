import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    activate(params) {

    }

    cancel() {
        this.router.navigateToRoute('list');
    }

    save(event) {
        if(this.data.machines.length > 0){
            this.item = "";
            this.service.create(this.data)
                .then(result => {
                    this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
                })
                .catch(e => {
                    this.error = e;
                    
                })
        }else{
            this.item = "machine is required";
        }
    }
}