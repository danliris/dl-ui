import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save(event) {
        var conf=false;
        if(this.data.items){
            for(var a of this.data.items){
                if(a.isConfirmed){
                    conf=true;
                    break;
                }
            }
        }
        if(conf){
            var today=new Date();
            var a = new Date(this.data.deliveryDate);
            var b = today;
            var timeDiff = Math.abs(a.getTime() - b.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if(diffDays<=45){
                if (confirm('Tanggal Confirm <= 45 hari ('+diffDays+' hari) dari Tanggal Pengiriman. Tetap Confirm?')) {
                    this.service.update(this.data)
                        .then(result => {
                        alert("Data Confirmed");
                        this.cancel();
                        });
                } else {
                    this.cancel();
                }
            }
            else{
                this.service.update(this.data).then(result => {
                    this.cancel();
                }).catch(e => {
                    this.error = e;
                })
            }
        }
        else{
            this.service.update(this.data).then(result => {
                this.cancel();
            }).catch(e => {
                this.error = e;
            })
        }


        
    }
}