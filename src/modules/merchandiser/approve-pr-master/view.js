import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';


@inject(Router, Service, CoreService)
export class View {
    hasApprove = false;
    hasUnApprove = false;


    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedPreSalesContract = {
                Id: this.data.SCId,
                SCNo: this.data.SCNo
            };

            if (this.data.PRType === "MASTER") {
                this.data.Unit = null;
            }

            if (this.data.Items) {
                let fabricItemsProductIds = this.data.Items
                    .filter(i => i.Category.Name === "FABRIC")
                    .map(i => i.Product.Id);

                if (fabricItemsProductIds.length) {
                    await this.coreService.getGarmentProductsByIds(fabricItemsProductIds)
                        .then(result => {
                            this.data.Items
                                .filter(i => i.Category.Name === "FABRIC")
                                .forEach(i => {
                                    const product = result.find(d => d.Id == i.Product.Id);

                                    i.Composition = product;
                                    i.Const = product;
                                    i.Yarn = product;
                                    i.Width = product;
                                });
                        });
                }
            }
            if(this.data.IsValidate){
                this.hasUnApprove=true;
            } else {
                this.hasApprove=true;
            }

            // if (this.data.IsPosted) {
            //     this.editCallback = null;
            //     this.deleteCallback = null;
            // }
        }
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
            this.service.approve({ Id: this.data.Id })
                .then(result => {
                    this.backToList();
                });
    }

    unapproveCallback(event) {
        if (confirm(`UnApprove Data?`))
            this.service.unapprove({ Id: this.data.Id })
                .then(result => {
                    this.backToList();
                });
    }
}