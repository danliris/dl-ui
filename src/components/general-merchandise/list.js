import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.generalmerchandiseId = "";
        this.generalmerchandises = [];
    }

    activate() {
        this.service.search('').then(data => {
            this.data = data;
        })
    }

    search() {
        this.service.getByCode(this.data.code).then(data => {
            this.data = data;
        }).catch(e => {
            console.log(e);
            alert('General Merchandise not found.');
        })
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }
}