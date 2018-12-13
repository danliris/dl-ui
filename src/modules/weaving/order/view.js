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
