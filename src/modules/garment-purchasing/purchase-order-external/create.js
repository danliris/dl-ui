import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';
let moment = require("moment");

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {

    }
    bind() {
        this.data = { Items: [] };
        this.error = {};
    }

    cancel(event) {
        if (confirm(`Apakah Anda yakin akan kembali?`)){
            this.router.navigateToRoute('list');
        }
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
        // return activationStrategy.invokeLifecycle;
    }

    save(event) {
        var missing = (this.data.Items || []).filter(i => i.ConversionMissing);
        if (missing.length > 0) {
            alert(`Master Satuan Konversi harus diisi untuk ${missing.length} barang. Daftarkan dulu di menu Master Konversi Satuan.`);
            return;
        }
        //ubah typedata orderDate ke DateTime

        this.data.OrderDate = moment(this.data.OrderDate).format("YYYY-MM-DD HH:mm:ssZ");
        if(this.data.Items){
            for(var item of this.data.Items){
                //ubah typedata DealQuantity dan SmallQuantity ke double
                item.DealQuantity= parseFloat(item.DealQuantity);
                item.DefaultQuantity= parseFloat(item.DefaultQuantity);
            }
        }
        console.log(this.data)
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
            })
            .catch(e => {
                if (e.statusCode === 500) {
                    alert("Gagal menyimpan, silakan coba lagi!");
                } else {
                    this.error = e;
                }
            })
    }
}