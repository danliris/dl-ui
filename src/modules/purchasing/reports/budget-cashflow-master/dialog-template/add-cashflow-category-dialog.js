import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from "../service";

@inject(DialogController, Service)
@useView("./add-cashflow-category-dialog.html")
export class AddCashflowCategoryDialog {
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
        this.service.createCashflowCategory(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.controller.ok(this.data);
            })
            .catch(e => {
                this.error = e;
            });
    }
}