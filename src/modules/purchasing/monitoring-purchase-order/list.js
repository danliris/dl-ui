import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {

    supplierApiUri = require('../../../host').core + "/v1/core/suppliers";
    data = [];
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
        var dateFormat = "DD MMM YYYY";
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        this.service.search(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.PODLNo, this.PRNo, this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo)
            .then(data => {
                this.data = data;
            })
    }

    reset() {
        this.unit = "undefined";
        this.category = "undefined";
        this.PODLNo = "";
        this.PRNo = "";
        this.supplier = "undefined";
        this.dateFrom = null;
        this.dateTo = null;
    }

    exportToXls() {
        this.service.generateExcel(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.PODLNo, this.PRNo, this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}