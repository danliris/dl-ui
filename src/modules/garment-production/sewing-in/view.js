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
        if (this.data) {

            this.selectedLoading = await this.service.getLoadingById(this.data.LoadingId)

            if (this.data.Items) {
        //         let dataRemainingQuantity = 0, dataCuttingInQuantity = 0;

                this.data.Items.forEach(
                    item => { 
                        if(item.RemainingQuantity < item.Quantity){
                            this.deleteCallback = null;
                        }
                    }
                );
                
        //         if(dataRemainingQuantity < dataCuttingInQuantity) {
        //             this.editCallback = null;
        //             this.deleteCallback = null;
        //         }
            }
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    // editCallback(event) {
    //     this.router.navigateToRoute('edit', { id: this.data.Id });
    // }

    deleteCallback(event) {
        if (confirm(`Hapus ${this.data.SewingInNo}?`))
            this.service.delete(this.data)
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