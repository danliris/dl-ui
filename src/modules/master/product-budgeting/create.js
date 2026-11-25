import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { "import": true };
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
      this.list();
    }

    saveCallback(event) {
        if (this.data.UnitProduct == 'TEKSTIL') {
            this.service.createTextile(this.data)
                .then(result => {
                    this.list();
                })
                .catch(e => {
                    this.error = e;
                });
            return;
        }else{
            this.service.create(this.data)
                .then(result => {
                    this.list();
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }
}
