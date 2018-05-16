import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, Dialog)
export class Create {

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.data = {};
        this.submitContext = { verifiedAlert: false };
    }

    list() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    Submit(context) {
        var Data = this.data;
        this.submitContext.verifiedAlert = context == "VerifiedAlert" ? true : false;
        this.dialog.show(AlertView, this.submitContext)
            .then(response => {
                debugger
                if (!response.wasCancelled) {
                    debugger
                    if (response.output.Remark == "Finance") {
                        Data.SubmitPosition = 8;
                    } else if (response.output.Remark == "Cashier") {
                        Data.SubmitPosition = 7;
                    } else {
                        Data.SubmitPosition = 6;
                        Data.Remark = response.output.Remark;
                    }
                    this.service.delete(Data).then(result => {
                        alert(`delete data success`);
                        this.cancelCallback();
                    });
                }
            });
    }
}
