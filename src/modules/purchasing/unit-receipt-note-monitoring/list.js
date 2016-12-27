import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

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
                this.data = data;
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

    ExportToExcel() {
        this.service.generateExcel(this.no ? this.no : "", this.unitId ? this.unitId._id : "", this.categoryId ? this.categoryId._id : "", this.supplierId ? this.supplierId._id : "", this.dateFrom, this.dateTo);
    }
    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}