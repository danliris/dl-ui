import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {

    info = {
        machineId: '',
        dateFrom: '',
        dateTo: ''

    };


    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    searching() {

        this.info.dateFrom = this.dateFrom;
        this.info.dateTo = this.dateTo;
        this.info.machineId = this.info.machineId ? this.machine._id : '';

        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
            })
    }


    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    ExportToExcel() {
        this.service.generateExcel(this.info);
    }

    reset() {
        this.info.machineId = '';
        this.info.dateFrom = '';
        this.info.dateTo = '';

        this.machine = {};
        this.dateFrom = null;
        this.dateTo = null;
    }



}