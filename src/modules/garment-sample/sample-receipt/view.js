import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    isView = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
        if (this.data.IsPosted) {
            this.deleteCallback = null;
            this.editCallback = null;
            this.hasUnpost = true;
            this.hasReceived = true;
        }
        if (this.data.IsReceived) {
            this.unpostCallback = null;
            this.hasUnpost = false;
            this.hasReceived = false;
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    receivedCallback(event) {
        if (confirm(`Terima ${this.data.SampleRequestNo}?`)) {
            var dataToBeReceived = {
                Id: this.data.Id,
                IsReceived: true,
            }
            this.service.receivedSample(dataToBeReceived)
                .then(result => {
                    this.cancelCallback();
                })
                .catch(e => {
                    this.error = e;
                    if (typeof (this.error) == "string") {
                        alert(this.error);
                    } else {
                        alert("Missing Some Data");
                    }
                })
        }

    }

}