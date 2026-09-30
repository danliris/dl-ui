import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, ServiceFinance } from './service';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service, ServiceFinance)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasUnpost = false;
    hasView=true;

    constructor(router, service, serviceFinance) {
        this.router = router;
        this.service = service;
        this.serviceFinance = serviceFinance;
    }
    async activate(params) {
        var isVoid = false;
        var isArriving = false;
        var id = params.id;
        let decoded = Base64Helper.decode(id);
        id = decoded;
        this.poExId = decoded;
        this.data = await this.service.getById(id);
        this.isVBWithPO = await this.serviceFinance.getVbWithPO(id);
        var kurs = await this.service.getKurs(this.data.Currency.Code, new Date(this.data.OrderDate).toLocaleDateString());

        var arg = {
            keyword: this.data.EPONo,
        }

        var dispo= await this.service.searchDispo(arg);
        var isDispo= dispo.data.Data.length; 
        
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
            this.data.IncomeTaxRate= this.data.IncomeTax.Rate;
            this.data.IncomeTaxName= this.data.IncomeTax.Name;
        }

        if(this.data.Vat){
            this.selectedVatTax=this.data.Vat;
            this.data.VatRate= this.data.Vat.Rate;
        }

        if (!this.data.IsPosted && !isUsedSJ && !this.data.IsApprovedManager && !this.data.IsApprovedOther) {
            this.hasDelete = true;
            this.hasEdit = true;
        }
        if (this.data.IsPosted && !isUsedSJ) {
            this.hasUnpost = true;
        }
        if (this.data.IsCanceled || this.data.IsClosed || this.data.IsUnpost || this.isVBWithPO || this.data.IsApprovedManager || this.data.IsApprovedOther) {
            this.hasUnpost = false;
        }
        if (!isUsedSJ && !this.data.IsApprovedManager && !this.data.IsApprovedOther) {
            this.hasEdit = true;
            if(this.data.IsPosted){
                this.hasUnpost = true;
                this.hasEdit = false;
            }
        }
        if(isDispo>0){
            this.hasUnpost =false;
        }
        this.hasEdit = true;
       
    }

    cancel(event) {
        var r = confirm("Apakah Anda yakin akan keluar?")
        if (r == true) {
            this.router.navigateToRoute('list');
        }
        // this.router.navigateToRoute('list');
    }

    edit(event) {
        const encoded = Base64Helper.encode(this.data.Id);
        var r = confirm("Apakah Anda yakin akan Mengubah data ini?");
        if (r == true) {
            this.router.navigateToRoute('edit', { id: encoded });
        }
        // this.router.navigateToRoute('edit', { id: this.data.Id });
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
