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

    save() {
        for (var d of this.data.indicators) {
            if (d.dataType == "numeric") {
                if (d.defaultValue == "" || !d.defaultValue || d.defaultValue == 0) {
                    d.defaultValue = 0;
                }
            }

        }

        this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                this.error = e;
            })

    }
}