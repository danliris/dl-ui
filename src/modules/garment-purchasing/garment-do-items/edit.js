import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    hasView = false;
    isEdit = true;
    hasCreate = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
        this.checkedAll = true;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.isEdit = true;

    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    save(event) {
        var itemQtySUm = 0;



        this.data.Items.forEach(x => {
            itemQtySUm += x.Quantity;

        });

        if (parseFloat(this.data.RemainingQuantity) != parseFloat(itemQtySUm).toFixed(2)) {
            alert("Jumlah Quantity Item harus sama dengan Quantity Sebelumnya")
        } else {
            this.service.update(this.data).then(result => {
                alert("Data berhasil diubah");
                this.router.navigateToRoute('list');
            }).catch(e => {
                this.error = e;
            })
        }
    }
}