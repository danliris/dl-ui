import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    keyword = '';
    dataToBePosting = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    activate() {
        this.showAll();

    }

    showAll() {
        this.service.search('')
            .then(data => {
                this.data = data;
            })
        this.keyword = ''
    }


    tooglePostingTrue() {
        this.isPosting = true;
        this.isPrint = false;

        this.newStatus();
    }

    tooglePostingFalse() {
        this.isPosting = false;
        this.isPrint = false;

        this.newStatus();
    }

    pushDataToBePosting(item) {
        if (item.isPosting) {
            this.dataToBePosting.push(item);
        }
        else {
            var index = this.dataToBePosting.indexOf(item);
            this.dataToBePosting.splice(index, 1);
        }
    }

    searching() {
        this.service.search(this.keyword)
            .then(data => {
                this.data = data;
                this.newStatus();
            })
            .catch(e => {
                alert('Data purchase request tidak ditemukan');
            })
    }

    posting() {
        if (this.dataToBePosting.length > 0) {
            this.service.post(this.dataToBePosting).then(result => {
                this.activate();
                this.back();
            }).catch(e => {
                this.error = e;
            })
        }
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    exportPDF(data) {
        this.service.getPdfById(data._id);
    }
}