import { inject, bindable, computedFrom, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    @bindable data = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    saveCallback(event) {
        this.data.Date =  this.data.Date ? moment(this.data.Date).format("DD MMM YYYY") : null;
        this.service.create(this.data)
            .then(result => {
                alert(`create data success`);
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {

                this.error = e;
                alert(this.error);
            })
    }

    // saveCallback(event) {
    //     this.data.Date =  this.data.Date ? moment(this.data.Date).format("DD MMM YYYY") : null;
    //     if(this.data.Date==null){   
    //         this.error.Date="Date Harus Diisi";
    //         console.log(this.error)
    //     } else {
    //         console.log(this.data)
    //         this.service.create(this.data)
    //             .then(result => {
    //                 console.log(result)
    //                 alert(`create data success`);
    //                 this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
    //             })
    //             .catch(e => {
    
    //                 this.error = e;
    //                 alert(this.error);
    //             })
    //     }
    // }
}

