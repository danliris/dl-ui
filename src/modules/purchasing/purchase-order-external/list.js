import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];
    dataToBePosting = [];
    dataToBePrinting = [];
    keyword = '';

    today = new Date();

    isPrint = false;
    isPosting = false;
    totalKwantum = 0;
    totalHargaSatuan = 0;
    total = 0;
    ppn = 0;
    nominal = 0;

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

    pushDataToBePosting(item) {
        if (item.isPosting) {
            this.dataToBePosting.push(item);
        }
        else {
            var index = this.dataToBePosting.indexOf(item);
            this.dataToBePosting.splice(index, 1);
        }
    }

    back() {
        this.router.navigateToRoute('list');
    }

    print() {
        window.print();
        this.addIsPrint();
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

    calculateTotal() {
        for (var poExternal of this.dataToBePrinting) {
            this.total = 0;
            this.ppn = 0;
            this.nominal = 0;

            for (var po of poExternal.items) {
                for (var item of po.items) {
                    this.total = this.total + (Number(item.pricePerDealUnit) * Number(item.dealQuantity));
                }
            }
            if (poExternal.useIncomeTax)
                this.ppn = 10 / 100 * this.total;
            else
                this.ppn = 0;
            this.nominal = this.total - this.ppn;

            poExternal.total = this.total;
            poExternal.ppn = this.ppn;
            poExternal.nominal = this.nominal;
        }

    }

    view(data) { 
        this.router.navigateToRoute('view', { id: data._id });
    }
    
    create() {
        this.router.navigateToRoute('create');
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

     exportPDF(data) {
         this.service.getPdfById(data._id );
     }    
}