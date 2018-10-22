import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    hasCancel = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    
    async activate(params) {

                var id = params.id;
                this.poExId = id;
                this.data = await this.service.getById(id);
                if(this.data.Currency){
            this.selectedCurrency=this.data.Currency;
        }

        if(this.data.Supplier){
            this.selectedSupplier=this.data.Supplier;
        }

        if(this.data.IncomeTax){
            this.selectedIncomeTax=this.data.IncomeTax.Name+" - "+this.data.IncomeTax.Rate;
        }
            }
        
    cancel(event) {
        this.router.navigateToRoute('list');
    }

}