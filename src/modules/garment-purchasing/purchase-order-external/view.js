import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasUnpost = false;
    hasView=true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    async activate(params) {
        var isVoid = false;
        var isArriving = false;
        var id = params.id;
        this.poExId = id;
        this.data = await this.service.getById(id);
        var kurs = await this.service.getKurs(this.data.Currency.Code, new Date(this.data.OrderDate).toLocaleDateString());
        this.kurs=kurs[0];
        var isUsedSJ=false;
        for(var item of this.data.Items){
            if(item.DOQuantity>0){
                isUsedSJ=true;break;
            }
        }

        if(this.data.Currency){
            this.selectedCurrency=this.data.Currency;
        }

        if(this.data.Supplier){
            this.selectedSupplier=this.data.Supplier;
            this.data.SupplierId=this.data.Supplier.Id;
            this.data.Supplier.usevat=this.data.IsUseVat ;
           
            if(this.data.IsIncomeTax){
                this.data.Supplier.usetax=true;
            }
            
        }

        if(this.data.IncomeTax){
            this.selectedIncomeTax=this.data.IncomeTax;
        }

        if (!this.data.IsPosted && !isUsedSJ) {
            this.hasDelete = true;
            this.hasEdit = true;
        }
        if (this.data.IsPosted && !isUsedSJ) {
            this.hasUnpost = true;
        }
        if (this.data.IsCanceled || this.data.IsClosed) {
            this.hasUnpost = false;
        }

       
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete(event) {
        var r = confirm("Apakah Anda yakin akan menghapus data ini?");
        if (r == true) {
            this.service.delete(this.data).then(result => {
                this.cancel();
            });
        } 
        
    }

    cancelPO(e) {
        this.service.cancel(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

    unpostPO(e) {
        this.service.unpost(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

    closePO(e) {
        this.service.close(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

}