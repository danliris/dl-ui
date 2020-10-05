import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("modules/merchandiser/packing-list-approval/template/dialog/reject.html")
export class RejectDialog {
    constructor(controller) {
        this.controller = controller;
        this.reason = null;
    }
}