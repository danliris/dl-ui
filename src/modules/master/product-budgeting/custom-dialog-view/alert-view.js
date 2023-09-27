import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("./alert-view.html")
export class AlertView {
    constructor(controller) {
        this.controller = controller;
    }

    activate(data) {

        this.data = data;
        this.error = {};
        this.data.EditRemark = "";
    }

    save(context) {
        this.data.context = context;
        if (this.data.EditRemark == undefined || this.data.EditRemark == "") {
                this.error.EditRemark = "alasan harus di isi"
        } else {
            this.error = {};
        }

        if (this.error.EditRemark == "" || this.error.EditRemark == undefined) {
            this.controller.ok(this.data);
        }
    }
}