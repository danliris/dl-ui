import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class List {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    dateFrom = null;
    dateTo = null;
    machine = null;
    
    activate() {
    }

    searching() {
            this.service.getReport(this.dateFrom, this.dateTo, this.machine)
                .then(result => {
                    this.data = result;
                    for (var daily of this.data)
                    {
                        daily.timeInput = moment(daily.timeInput).format('HH:mm');
                        daily.timeOutput = daily.timeOutput ? moment(daily.timeOutput).format('HH:mm') : '-';
                    }
                })
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.machine = null;
        this.error = '';
    }

    ExportToExcel() {
        //    var htmltable= document.getElementById('myTable');
        //    var html = htmltable.outerHTML;
        //    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        this.service.generateExcel(this.dateFrom, this.dateTo, this.machine);
    }
}