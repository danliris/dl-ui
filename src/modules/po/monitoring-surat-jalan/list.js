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

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    search() { 
            this.service.search(this.no, this.supplierId? this.supplierId_id:"", this.dateFrom, this.dateTo)  
            .then(data => {
                this.data = data;
                for( var SJ of data) { 
                    this.SJ=SJ;
                    SJ=SJ;
                    for( var item of SJ.items) {  
                    }
                }
            })  
    }

}