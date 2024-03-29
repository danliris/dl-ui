import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    activate(params) {
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    // saveCallback(event) {
    //     this.service.create(this.data)
    //         .then(result => {
    //             this.list();
    //         })
    //         .catch(e => {
    //             this.error = e;
    //         })
    // }

    saveCallback(event) {
        this.service.create(this.data)
        .then(result => {
            alert("Data berhasil dibuat");
            this.list();
        })
        .catch(e => {
            if (e.statusCode == 500) {
                alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
            } else {
                if(e.DebitCreditNote != null){
                    alert("Data Sudah Ada")
                }
                console.log(e.DebitCreditNote);
                this.error = e;
            }
        })
    }
}
