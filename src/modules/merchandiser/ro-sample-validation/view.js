import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    readOnly = true;
    hasApprove = true;
    // hasUnApprove = false;


    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
    }

    backToList() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.backToList();
    }

    // editCallback(event) {
    //     this.router.navigateToRoute('edit', { id: this.data.Id });
    // }

    // deleteCallback(event) {
    //     if (confirm(`Hapus Data?`))
    //         this.service.delete(this.data)
    //             .then(result => {
    //                 this.backToList();
    //             });
    // }

    approveCallback(event) {
        if (confirm(`Approve Data?`))
            this.service.approve({ Id: this.data.CostCalculationGarment.Id })
                .then(result => {
                    this.backToList();
                });
    }

    // unapproveCallback(event) {
    //     if (confirm(`UnApprove Data?`))
    //         this.service.unapprove({ Id: this.data.Id })
    //             .then(result => {
    //                 this.backToList();
    //             });
    // }
}