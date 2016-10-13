import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';


@inject(Router, Service)
export class List {
    servicePdfUri = require('../../../host').core + '/v1/purchasing/receipt-note/unit/pdf/';
    data = [];
    dataToBePrinting = [];
    keyword = '';

    today = new Date();

    isPrint = false;

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
                this.newStatus();
            })

        this.keyword = ''
    }

    searching() {
        this.service.search(this.keyword)
            .then(data => {
                this.data = data;
                this.newStatus();
            })
            .catch(e => {  
                alert('Data purchase order eksternal tidak ditemukan');
            })
    }

    addIsPrint() {
        this.dataToBePrinting = [];
        for (var poExternal of this.data) {
            poExternal.isPrint = false;
        }
    }

    pushDataToBePrinting(item) {

        if (item.isPrint) {
            this.dataToBePrinting.push(item);
        }
        else {
            var index = this.dataToBePrinting.indexOf(item);
            this.dataToBePrinting.splice(index, 1);
        }

        this.calculateTotal();
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

    tooglePrintTrue() {
        this.isPrint = true;

        this.newStatus();
    }

    tooglePrintFalse() {
        this.isPrint = false;

        this.newStatus();
    }

    newStatus() {
        this.dataToBePrinting = [];

        for (var item of this.data) {
            item.isPrint = false;
        }
    }
}