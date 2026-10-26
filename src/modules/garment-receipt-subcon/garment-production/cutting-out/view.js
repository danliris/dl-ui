import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Base64Helper } from '../../../../utils/base-64-coded-helper';
import { StatusHelper } from '../../../../utils/disable-update';

@inject(Router, Service)
export class View {
    isView = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        let decoded = Base64Helper.decode(id);
        id = decoded;
        this.data = await this.service.read(id);
        if (this.data) {
            this.selectedCuttingIn = {
                RONo: this.data.RONo
            };

            this.selectedUnit=this.data.Unit;
            this.selectedUnitFrom=this.data.UnitFrom;
          
            if (this.data.Items) {
                var i = 0;
                for(var sewingItem of this.data.Items){
                     for(var sewingDetail of sewingItem.Details){
                         if(sewingDetail.RealQtyOut != 0){
                            i++;
                        }
                     }
                }
            }
            if(i>0){
                this.deleteCallback = null;
            }
            const isSuccess = (this.data.StatusBOMD365 === "Success");
            StatusHelper.disableEditDelete(this, isSuccess);
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    // editCallback(event) {
    //     const encoded = Base64Helper.encode(this.data.Id);
    //     this.router.navigateToRoute('edit', { id: encoded });
    // }

    deleteCallback(event) {
        if (confirm(`Hapus ${this.data.CutOutNo}?`))
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