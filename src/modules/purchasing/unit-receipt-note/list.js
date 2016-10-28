import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';


@inject(Router, Service)
export class List {
    servicePdfUri = require('../../../host').core + '/v1/purchasing/receipt-note/unit/pdf/';
    data = [];
    dataToBePrinting = [];
    keyword = '';

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    activate() {
        this.showAll()
    }

    showAll() {
        this.service.search('')
            .then(data => {
                this.data = data;
            })

        this.keyword = ''
    }

    searching() {
        this.service.search(this.keyword)
            .then(data => {
                this.data = data;
            })
            .catch(e => {
                alert('Data purchase order eksternal tidak ditemukan');
            })
    }

    back() {
        this.router.navigateToRoute('list');
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    getPDF(data) {
        this.service.getPdfById(data._id);
    }
}