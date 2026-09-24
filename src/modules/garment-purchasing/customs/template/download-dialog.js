
import { inject, useView, bindable } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import {Router} from 'aurelia-router';
import { Service } from '../service';
var moment = require("moment");
@useView('./download-dialog.html')
@inject(DialogController, Router, Service)
export class DownloadDialog {
    @bindable dateFrom;
    @bindable dateTo;
    constructor(controller, router, service) {
        this.controller = controller;
        this.router = router;
        this.service = service;
    }

    activate(model) {
        this.dateFrom = moment(model.dateFrom).format("YYYY-MM-DD");
        this.dateTo = moment(model.dateTo).format("YYYY-MM-DD");
        this.navigationSubscription = this.router.events.subscribe(
            "router:navigation:processing",
            () => {
                this.controller.cancel();
            }
        );
        console.log(this.navigationSubscription);
    }

    dateFromChanged(newValue, oldValue) {
        this.dateFrom = moment(newValue).format("YYYY-MM-DD");
    }

    dateToChanged(newValue, oldValue) {
        this.dateTo = moment(newValue).format("YYYY-MM-DD");
    }

    deactivate() {
        if (this.navigationSubscription) {
            this.navigationSubscription.dispose();
            this.navigationSubscription = null;
        }
    }

    downloadReport() {
        this.service.downloadExcelReport({ dateFrom: this.dateFrom, dateTo: this.dateTo });
    }
}