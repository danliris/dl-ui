import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import { Dialog } from '../../../components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, Dialog)
export class Edit {
    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        // this.dataOrigin = this.data;
        // console.log("data asli", this.data);
        
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {

        // this.dataOrigin = this.service.getById(this.data.Id);
        console.log("data edit", this.data);
        // console.log("data Asli 2", this.dataOrigin);
        if( this.data.Price != this.data.originPrice){
            this.dialog.show(AlertView,this.data)
                .then(response => {
                    this.data.EditReason = response.output.EditRemark;
                    this.data.IsPriceChange = true;
                    // this.service.delete(this.data).then(result => {
                    //     this.cancel();
                    // });

                    this.service.updateProduct(this.data)
                    .then(result => {
                        this.router.navigateToRoute('view', { id: this.data.Id });
                    })
                    .catch(e => {
                        this.error = e;
                    });
                });
        }else{
            this.data.IsPriceChange = false;
            this.service.updateProduct(this.data)
            .then(result => {
                alert("data berhasil di ubah");
                this.router.navigateToRoute('view', { id: this.data.Id });
                
            })
            .catch(e => {
                this.error = e;
            });

        }
        

        
        
    }
}
 