import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
// import { Service } from './services/service';

@inject(Router )
export class Create {
    constructor(router) {
        this.router = router;
        // this.service = service;
        this.data = {};
        this.error = {};
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    // saveCallback() {
    //     this.service.create(this.data)
    //         .then(result => {
    //             this.list();
    //         })
    //         .catch(e => {
    //             this.error = e;
    //         })
    // }
}
