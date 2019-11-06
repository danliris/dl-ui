import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    isEdit=true;
    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedRO={
                RONo:this.data.RONo
            };
            this.selectedUnitTo=this.data.UnitTo;
            this.selectedUnit=this.data.Unit;
            this.data.BuyerView= this.data.Buyer.Code + ' - '+ this.data.Buyer.Name;
            for(var a of this.data.Items){
                var SewingIn=await this.service.GetSewingInById(a.SewingInId );
                console.log(SewingIn);
                var sewIn= SewingIn.Items.find(x=>x.Id==a.SewingInItemId);
                if(sewIn){
                    a.Quantity+= sewIn.RemainingQuantity;
                    a.SewingInQuantity=a.Quantity;
                }
            }
        }
    }

    bind() {
        this.error = {};
        this.checkedAll = true;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        if(this.data && this.data.IsDifferentSize){
            if(this.data.Items){
                for(var item of this.data.Items){
                    if(item.IsSave){
                        item.TotalQuantity=0;
                        for(var detail of item.Details){
                            item.TotalQuantity += detail.Quantity;
                            detail.Uom=item.Uom;
                        }
                        item.RemainingQuantity=item.TotalQuantity;
                    }
                }
            }
        }
        else if(this.data){
            if(this.data.Items){
                for(var item of this.data.Items){
                    if(item.IsSave){
                        item.RemainingQuantity=item.Quantity;
                    }
                }
            }
        }
        console.log(this.data)
        this.service.update(this.data)
            .then(result => {
                this.cancelCallback();
            })
            .catch(e => {
                this.error = e;
            })
    }
}