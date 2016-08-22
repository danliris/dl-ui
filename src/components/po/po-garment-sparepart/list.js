import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.garmentSparepartId = "";
        this.garmentSpareparts = [];
    }

    activate() {
        this.service.search('').then(data => {
            this.data = data;
        })
    }

    search() {
        this.service.getById(this.data._id).then(data => {
            this.data = data;
        }).catch(e => {
            console.log(e);
            alert('PO Garment Sparepart tidak ditemukan.');
        })
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }
}