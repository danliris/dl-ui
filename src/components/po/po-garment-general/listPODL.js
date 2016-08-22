import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];
    dataToBePrinting = [];
    keyword = '';

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
    }
    
    back() {
        this.router.navigateToRoute('list');
    }
    
    print() {
        window.print();
    }
}