import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        // var id = params.id;
        // this.data = await this.service.getById(id);
        // console.log(params);
        this.data = {
            sopNo: "1",
            tglsp: new Date(),
            periode: {
                bulan: "Januari",
                tahun: "2018"
            },
            unit: "Weaving 1",
            konstruksi: {
                jenis: "CD 133",
                tipe: "72",
                lusi: "63",
                pakan: "Rf Rf",
                lebar: "B B",
            },
            kodebenang: {
                jenislusi: "AC",
                asallusi: "A",
                jenispakan: "BC",
                asalpakan: "B"
            },
            blended: {
                poly: "60%",
                cotton: "30%",
                lainnya: "10%"
            },
            delivery: new Date(),
            jenismesin: "AJL",
            jenisbenang: "CT",
            allgrade: "AG"
        }
    }

    cancelCallback(event) {
        // this.router.navigateToRoute('view', { id: this.data._id });
        this.router.navigateToRoute('view', { id: this.data.sopNo });
    }

    saveCallback(event) {
        this.service.update(this.data)
            .then(result => {
                // this.router.navigateToRoute('view', { id: this.data._id });
                this.router.navigateToRoute('view', { id: this.data.sopNo });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
