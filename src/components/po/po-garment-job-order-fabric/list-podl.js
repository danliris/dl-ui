import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class ListPodl {
    data = [];
    dataToBePrinting = [];
    keyword = '';
    
    today = new Date();
    
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
        this.service.searchPODL('')
            .then(data => {
                this.data = data;
                this.addIsPrint();
            })

        this.keyword = ''
    }

    searching() {
        this.service.searchPODL(this.keyword)
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
        for (var podl of this.data) {
            podl.isPrint = false;
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
        
        for (var podl of this.dataToBePrinting) {
            this.total = 0;
            this.ppn = 0;
            this.nominal = 0;
            
            for (var po of podl.items) {
                for (var item of po.items) {
                    this.total = this.total + (Number(item.price) * Number(item.dealQuantity));  
                } 
            } 
            if (podl.usePPn)
                this.ppn = 10/100 * this.total;
            else
                this.ppn = 0;
            this.nominal = this.total - this.ppn;
                
            podl.total = this.total;
            podl.ppn = this.ppn;
            podl.nominal = this.nominal;
        }
        
    }
    
    // create() {
    //     this.router.navigateToRoute('create-podl');
    // }
}