import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class Create {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind(){
    this.data = { items:[] };
  }

    get back() {
        return (event) => {
            this.router.navigateToRoute('list');
        }
    }

    get save() {
        return (event) => {
            if (this.data.expectedDeliveryDate == "undefined") {
                this.data.expectedDeliveryDate == "";
            }
            this.service.create(this.data)
                .then(result => {
                    this.back();
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }
}