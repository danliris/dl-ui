
import { inject, useView, bindable } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import {Router} from 'aurelia-router';
import { ServiceSupport } from './service';
var moment = require("moment");
@useView('./download-dialog.html')
@inject(DialogController, Router, ServiceSupport)
export class DownloadDialog {
    @bindable dateFrom;
    @bindable dateTo;
    @bindable type;
    typeOptions = ["", "BC 40", "BC 23", "BC 261", "BC 262", "BC 30", "BC 27", "BC 41", "BC 25","BC 33"];
    constructor(controller, router, serviceSupport) {
        this.controller = controller;
        this.router = router;
        this.service = serviceSupport;
    }

    activate(model) {
        this.dateFrom = moment(model.dateFrom).format("YYYY-MM-DD");
        this.dateTo = moment(model.dateTo).format("YYYY-MM-DD");
        this.type = "";
        this.navigationSubscription = this.router.events.subscribe(
            "router:navigation:processing",
            () => {
                this.controller.cancel();
            }
        );
    }

    dateFromChanged(newValue, oldValue) {
        this.dateFrom = moment(newValue).format("YYYY-MM-DD");
    }

    dateToChanged(newValue, oldValue) {
        this.dateTo = moment(newValue).format("YYYY-MM-DD");
    }

    typeChanged(newValue, oldValue) {
        this.type = newValue;
        console.log(this.type);
    }

    deactivate() {
        if (this.navigationSubscription) {
            this.navigationSubscription.dispose();
            this.navigationSubscription = null;
        }
    }

    downloadReport() {
        console.log({ type: this.type, dateFrom: this.dateFrom, dateTo: this.dateTo });
        this.service.downloadExcelReport({ typeBC: this.type, dateFrom: this.dateFrom, dateTo: this.dateTo });
    }
}