import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {

    supplierApiUri = require('../../../host').core + "/v1/core/suppliers";

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
        this.SJ=[];
        this.service.search(this.no ? this.no : "", this.supplierId ? this.supplierId._id : "", this.dateFrom, this.dateTo)
            .then(data => {
                this.data = data;
                for (var SJ of data) { 
                    this.SJ = SJ;
                    SJ = SJ;
                    for (var item of SJ.items) {
                    }
                }
            })
    }
    reset() {
        this.no = "undefined";
        this.supplier = "undefined";
        this.dateFrom = null;
        this.dateTo = null;
    }

}