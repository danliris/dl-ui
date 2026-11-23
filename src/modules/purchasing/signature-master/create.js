import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    isCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {

    }
    bind() {
        this.data = {};
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    save(event) 
    {
        this.service.create(this.data)
        .then(result => 
            {
            alert("Data berhasil dibuat");
            this.router.navigateToRoute('list');
        })
        .catch(e =>
             {
            if (e.statusCode === 500) 
            {
                alert("Gagal menyimpan, silakan coba lagi!");
            } else 
            {
                this.error = e;
            }
        })
    }
}