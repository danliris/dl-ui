import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { detail: {} };

        // this.data.code = '1tte';
        // this.data.name = 'name_1';
        // this.data.composition = 'comp_1';
        // this.data.construction = 'const_1';
        // this.data.thread = 'thread_1';
        // this.data.width = 5;
        // this.data.UoM = {};
        // this.data.UoM.category = "test-category";
        // this.data.UoM.default = {};
        // this.data.UoM.default.mainUnit = "M";
        // this.data.UoM.default.mainValue = 1;
        // this.data.UoM.default.convertedUnit = "M";
        // this.data.UoM.default.convertedValue = 1;
    }

    activate(params) { }

    list() {
        this.router.navigateToRoute('list');
    }

    save() {
        this.service.create(this.data).then(result => {
            this.list();
        }).catch(e => {
            this.error = e;
        })
    }
}
