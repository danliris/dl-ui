import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date(); 
    }
    attached() {
    }

    activate() {

    }
 

    search() {
        this.service.search(this.no ? this.no : "", this.unitId ? this.unitId._id : "", this.supplierId ? this.supplierId._id : "", this.dateFrom, this.dateTo)
            .then(data => {
                this.data = data;
            })
    }
    reset() {
        this.no = "undefined";
        this.unitId = "undefined";
        this.supplierId = "undefined";
        this.dateFrom = null;
        this.dateTo = null;
    }

}