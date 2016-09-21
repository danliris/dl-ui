import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];
    dataToBePosting = [];
    isPosting = false;


    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.sparepartId = "";
        this.spareparts = [];
    }

    activate() {
        this.service.search('')
            .then(data => {
                this.data = data;
                this.newStatus();
            })
        this.keyword = ''
    }


    searching() {
        this.service.getByCode(this.data.code)
            .then(data => {
                this.data = data;
                this.newStatus();
            })
            .catch(e => {
                console.log(e);
                alert('Data surat jalan tidak ditemukan');
            })
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
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

    posting() {
        for (var item of this.dataToBePosting) {
            this.service.post(item)
                .then(result => {
                    this.activate();
                })
                .catch(e => {
                    console.log(e);
                    this.error = e;
                })
        }
    }
    newStatus() {
        this.dataToBePosting = [];

        for (var item of this.data) {
            item.isPosting = false;
        }
    }

}