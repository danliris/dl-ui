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

    async activate(params) {
        // var id = params.id;
        // this.data = await this.service.getById(id);

        // console.log(params);
        this.data = {
            sopNo: "1",
            tglsp: new Date(),
            periodebulan: "Januari",
            periodetahun: 2018,
            unit: "Weaving 1",
            konstruksijenis: "CD",
            konstruksitipe: "AYM",
            konstruksilusi: 133,
            konstruksipakan: 72,
            konstruksilebar: 63,
            jenislusi: "RfRf",
            asallusi: "Rf",
            jenispakan: "BC",
            asalpakan: "B",
            blendedpoly: 60,
            blendedcotton: 30,
            blendedlainnya: 10,
            delivery: new Date(),
            jenismesin: "AJL",
            jenisbenang: "Benang A",
            allgrade: 3500
        }
    }

    //Dipanggil ketika tombol "Kembali" ditekan
    list() {
        this.router.navigateToRoute('list');
    }

    //Tombol "Kembali", panggil list()
    cancelCallback(event) {
        this.list();
    }

    //Tombol "Ubah", routing ke 'edit'
    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.sopNo });
    }

    //Tombol "Hapus", hapus this.data, redirect ke list
    deleteCallback(event) {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}
