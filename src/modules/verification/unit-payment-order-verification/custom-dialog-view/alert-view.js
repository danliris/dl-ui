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
    }

    bind() {
        this.error = "";
    }

    save(context) {
        debugger
        this.data.context = context;
        if (this.data.context == "NotVerified") {
            if (this.data.Remark == undefined || this.data.Remark == "") {
                this.error = "alasan harus di isi"
            }
        }
        if (this.error == "") {
            this.controller.ok(this.data);
        }

    }
}