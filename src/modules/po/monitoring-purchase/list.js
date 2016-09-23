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
        var unitId, categoryId, supplierId;
        if (this.unit !=null) 
            unitId=this.unit._id; 
        else 
            unitId=this.unit; 
        if (this.category !=null) 
             categoryId=this.category._id; 
        else 
            categoryId=this.category 
        if (this.supplier !=null)  
             supplierId=this.supplier._id; 
        else
             supplierId=this.supplier;
        this.service.search(unitId, categoryId, this.PODLNo, this.PRNo, supplierId, this.dateFrom, this.dateTo)  
            .then(data => {
                this.data = data;
                 var counter = 1; 
                for( var PO of data) { 
                    for( var item of PO.items) {
                        item.index = counter++;
                    }
                }
            }) 
    }

}