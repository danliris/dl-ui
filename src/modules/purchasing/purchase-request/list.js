import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    keyword = '';
    data = [];
    dataToBePosting = [];
    dataToBePrinting = [];

    
    isPrint = false;
    isPosting = false;

    today = new Date();

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

    newStatus() {
        this.dataToBePosting = [];
        this.dataToBePrinting = [];

        for (var item of this.data) {
            item.isPosting = false;
            item.isPrint = false;
        }
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

    addIsPrint() {
        this.dataToBePrinting = [];
        for (var poExternal of this.data) {
            poExternal.isPrint = false;
        }
    }

    view(data) { 
        this.router.navigateToRoute('view', { id: data._id });
    }
    
    create() {
        this.router.navigateToRoute('create');
    }

    exportPDF(data) {
         this.service.getPdfById(data._id );
     }  
      print() {
        window.print();
        this.addIsPrint();
    }

}