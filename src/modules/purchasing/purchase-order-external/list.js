import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];
    dataToBePrinting = [];
    keyword = '';

    today = new Date();

    isPrint = false;
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
                this.addIsPrint();
            })

        this.keyword = ''
    }

    searching() {
        this.service.search(this.keyword)
            .then(data => {
                this.data = data;
                this.addIsPrint();
            })
            .catch(e => {
                console.log(e);
                alert('Data PO tidak ditemukan');
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

    print() {

        window.print();

        this.addIsPrint();
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
            if (poExternal.usePPn)
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
        console.log(data);
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
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
}