import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Create {
    @bindable error = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    attached() {
    }

    activate(params) {
    }

    list() {
        this.router.navigateToRoute('list');
    }

    download() {
        this.service.getExcel(this.dateFrom,this.dateTo)
        .then(response => {
            if (response)
            {
                alert("Downloaad Data Berhasil ... ");
            }
        })
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    }

}
