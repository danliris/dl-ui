import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    bind() {
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    save() {
        this.data.ReceiptDate = new Date(new Date().setHours(0, 0, 0, 0));
        this.data.Items=[];
        if(this.data.URNType=="PROSES"){
            for(var a of this.data.DRItems){
                this.data.Items.push(a);
            }
        }
        //this.data.Items=this.data.DRItems;
console.log(this.data)
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
