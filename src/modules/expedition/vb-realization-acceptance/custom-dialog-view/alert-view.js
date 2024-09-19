import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("./alert-view.html")
export class AlertView {
    constructor(controller) {
        this.controller = controller;
    }

    activate(data) {
        this.error = {};
        this.data = {};
    }

    save(context) {
        this.data.context = context;
        if (this.data.Date == undefined ) {
            this.error.Date = "Tanggal harus di isi";
        } else {
            this.error = {};
            this.controller.ok(this.data);
        }
    }
}