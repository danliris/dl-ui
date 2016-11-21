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

    activate() {
    }

    searching() {
        var data = [];
        this.service.getByDate(this.dateFrom, this.dateTo)
            .then(data => {
                this.data = data;
            })
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.data = null;
    }

    ExportToExcel() {
        //    var htmltable= document.getElementById('myTable');
        //    var html = htmltable.outerHTML;
        //    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        this.service.generateExcel(this.dateFrom, this.dateTo);
    }
}