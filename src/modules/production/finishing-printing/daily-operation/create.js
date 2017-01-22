import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() {
        var dateInput = `${this.data.dateInput} ${this.data.hourInput}:${this.data.minuteInput}:00`;
        this.data.dateInput = dateInput;
        this.data.dateOutput = "1900-01-01 00:00:00";
        var color = this.data.color;
        this.data.color = color.color
        this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                this.data.color = color;
                this.error = e;
            })
    }
}