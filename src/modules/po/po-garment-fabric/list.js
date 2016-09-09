import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];
    dataToBePosting = [];
    dataToBePrinting = [];
    
    keyword = '';
    isPrint = false;
    isPosting = false;

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
                console.log(e);
                alert('Data PO tidak ditemukan');
            })
    }
    
    pushDataToBePrinting(item) {
        
        if (item.isPrint) {
            this.dataToBePrinting.push(item);
        }
        else {
            var index = this.dataToBePrinting.indexOf(item);
            this.dataToBePrinting.splice(index, 1);
        }
    }
    
    pushDataToBePosting(item) {
        if (item.isPosting) {
            this.dataToBePosting.push(item.PONo);
        }
        else {
            var index = this.dataToBePosting.indexOf(item.PONo);
            this.dataToBePosting.splice(index, 1);
        }
    }
    
    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }
    
    print() {
        this.ppn = this.ppn * this.totalPrice;
        this.nominal = this.totalPrice - this.ppn;
        
        window.print();
    }
    
    posting() {
        this.service.createGroup(this.dataToBePosting)
            .then(result => {
                this.gotoListPODL();
            })
            .catch(e => {
                console.log(e);
                this.error = e;
            })
    }
    
    create() {
        this.router.navigateToRoute('create');
    }

    gotoListPODL() {
        this.router.navigateToRoute('listPODL');
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

    tooglePrintTrue() {
        this.isPosting = false;
        this.isPrint = true;

        this.newStatus();
    }

    tooglePrintFalse() {
        this.isPosting = false;
        this.isPrint = false;

        this.newStatus();
    }

    newStatus() {
        this.dataToBePosting = [];
        this.dataToBePrinting = [];
        
        for (var item of this.data) {
            item.isPosting = false;
            item.isPrint = false;
        }
    }
}