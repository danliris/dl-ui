import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];
    // dataToBePosting = [];
    // dataToBePrinting = [];

    keyword = '';
    // isPrint = false;
    // isPosting = false;

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
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
                alert('Data purchase order internal tidak ditemukan');
            })
    }


    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }
}