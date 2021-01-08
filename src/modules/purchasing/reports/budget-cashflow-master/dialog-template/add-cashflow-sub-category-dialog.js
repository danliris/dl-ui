import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from "../service";

@inject(DialogController)
@useView("./add-cashflow-sub-category-dialog.html")
export class AddCashflowSubCategoryDialog {
    constructor(controller, service) {
        this.controller = controller;
        this.service = service;
    }

    activate(data) {

        this.data = data;
        this.error = {};
        this.data.Remark = "";
    }

    save() {
        this.service.createCashflowType(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.controller.ok(this.data);
            })
            .catch(e => {
                this.error = e;
            });
    }
}