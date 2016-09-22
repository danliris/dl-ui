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
        var supplierId;
        if (this.supplierId !=null) 
            supplierId=this.supplierId._id;   
        else
            supplierId=this.supplierId;
            this.service.search(this.no, supplierId, this.dateFrom, this.dateTo)  
            .then(data => {
                this.data = data;
            }) 
         
       
    }

}