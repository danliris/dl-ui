import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    isCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }


    back() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save() {        
        //validation for checked
        var validation = [];
        this.data.packagingProductionOrders.forEach(element => {
            var ischecked = element.isCheckedSPP;
            var qtyKeluar = element.qtyOut;
            var nomorSpp = element.productionOrderNo;

            if(ischecked && qtyKeluar <=0){
                // alert("Qty Keluar harus diisi jika di pilih, No SPP : "+nomorSpp);
                // return 0;
                validation.push({
                    NomorSpp : nomorSpp
                });
            }
        });
        if(validation.length!=0){
            alert("Qty Keluar harus diisi jika di pilih, No SPP : "+validation[0].NomorSpp);
        }else{
            var packagingProductionOrdersSelected =[]
            this.data.packagingProductionOrders.forEach(element =>{
                if(element.isCheckedSPP){
                    packagingProductionOrdersSelected.push(element)
                }
            });
            this.data.packagingProductionOrders = packagingProductionOrdersSelected;
            // console.log(this.data);
            
            this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
        }
    }
}