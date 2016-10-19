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
        this.service.search(this.no ? this.no : "", this.unitId ? this.unitId._id : "", this.categoryId ? this.categoryId._id : "", this.supplierId ? this.supplierId._id : "", this.dateFrom, this.dateTo)
            .then(data => {
                var counter=1;
                this.data = data;
                for(var unitReceiptNote of this.data){
                    for(var item of unitReceiptNote.items)
                    {
                        item.index=counter;
                        counter++;
                    }
                }
            })
    }
    reset() {
        this.no = "undefined";
        this.unitId = "undefined";
        this.supplierId = "undefined";
        this.categoryId = "undefined";
        this.dateFrom = null;
        this.dateTo = null;
    }
    
    ExportToExcel(myTable){
       var htmltable= document.getElementById('myTable');
       var html = htmltable.outerHTML;
       window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
    }

}