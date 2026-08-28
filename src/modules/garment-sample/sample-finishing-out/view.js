import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Base64Helper } from '../../../utils/base-64-coded-helper';
import { StatusHelper } from '../../../utils/disable-update';

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
        this.selectedRO={
            RONo:this.data.RONo
        };
        this.selectedUnitTo=this.data.UnitTo;
        this.selectedUnit=this.data.Unit;
        this.selectedFinishingTo=this.data.FinishingTo;
        for(var a of this.data.Items){
            if(a.RemainingQuantity != a.Quantity){
                this.deleteCallback = null;
                this.editCallback=null;
                break;
            }
        }
        this.editCallback=null;
        if(this.data.FinishingTo=="SEWING"){
            var filter = {};
            filter[`GarmentSampleSewingInItem.Any(FinishingOutItemId.ToString()=="${this.data.Items[0].Id.toString()}")`] = true;
            var sewIn= await this.service.searchSewingIn({ filter: JSON.stringify(filter),size:1});
        
            if(sewIn.data.length>0){
                if(sewIn.data[0].TotalRemainingQuantity!=sewIn.data[0].TotalQuantity){
                    this.deleteCallback = null;
                }
            }
        }
        const isSuccess = (this.data.StatusITFD365 === "Success" || this.data.StatusBOMD365 === "Success");
        StatusHelper.disableEditDelete(this, isSuccess);
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        const encoded = Base64Helper.encode(this.data.Id);
        this.router.navigateToRoute('edit', { id: encoded });
    }

    deleteCallback(event) {
        if (confirm(`Hapus ${this.data.FinishingOutNo}?`))
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