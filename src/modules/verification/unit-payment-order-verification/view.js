import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

var moment = require("moment");

@inject(Router, Service, Dialog)
export class View {

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    Submit(context) {

        this.submitContext.verifiedAlert = context == "VerifiedAlert" ? true : false;

        this.dialog.show(AlertView, this.submitContext)
            .then(response => {
                if (!response.wasCancelled) {
                    this.service.delete(this.data).then(result => {
                        alert(`delete data success`);
                        this.cancelCallback();
                    });
                }
            });
    }

}