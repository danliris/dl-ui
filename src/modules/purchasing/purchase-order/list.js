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
    
    // pushDataToBePrinting(item) {
        
    //     if (item.isPrint) {
    //         this.dataToBePrinting.push(item);
    //     }
    //     else {
    //         var index = this.dataToBePrinting.indexOf(item);
    //         this.dataToBePrinting.splice(index, 1);
    //     }
        
    //     this.calculateTotal();
    // }
    
    // pushDataToBePosting(item) {
    //     if (item.isPosting) {
    //         this.dataToBePosting.push(item._id);
    //     }
    //     else {
    //         var index = this.dataToBePosting.indexOf(item._id);
    //         this.dataToBePosting.splice(index, 1);
    //     }
    // }
    
    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }
    
    // print() {
    //     window.print();
    // }
    
    // posting() {
        
    //     if (this.dataToBePosting.length > 0) {
    //         this.router.navigateToRoute('create-podl', { items: this.dataToBePosting });
    //     }
    // }
    
    create() {
        this.router.navigateToRoute('create');
    }

    // gotoListPODL() {
    //     this.router.navigateToRoute('list-podl');
    // }

    // tooglePostingTrue() {
    //     this.isPosting = true;
    //     this.isPrint = false;

    //     this.newStatus();
    // }

    // tooglePostingFalse() {
    //     this.isPosting = false;
    //     this.isPrint = false;

    //     this.newStatus();
    // }

    // tooglePrintTrue() {
    //     this.isPosting = false;
    //     this.isPrint = true;

    //     this.newStatus();
    // }

    // tooglePrintFalse() {
    //     this.isPosting = false;
    //     this.isPrint = false;

    //     this.newStatus();
    // }

    // newStatus() {
    //     this.dataToBePosting = [];
    //     this.dataToBePrinting = [];
        
    //     for (var item of this.data) {
    //         item.isPosting = false;
    //         item.isPrint = false;
    //     }
    // }
    
    // calculateTotal() {
        
    //     for (var po of this.dataToBePrinting) {
    //         this.total = 0;
    //         this.ppn = 0;
    //         this.nominal = 0;
            
    //         for (var item of po.items) {
    //             this.total = this.total + (Number(item.price) * Number(item.dealQuantity));  
                 
    //         } 
    //         if (po.usePPn)
    //             this.ppn = 10/100 * this.total;
    //         else
    //             this.ppn = 0;
    //         this.nominal = this.total - this.ppn;
                
    //         po.total = this.total;
    //         po.ppn = this.ppn;
    //         po.nominal = this.nominal;
    //     }
        
    // }
}