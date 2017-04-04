import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "9401ddc4-47e3-49a3-9a8e-8ff59043cdb5",//Top Ten Event Monitoring
        "507891a8-daa8-4b2f-bc69-d37e631ab499",//Kapasitas Mesin VS Total Input Produksi
        "0d7d1879-bb1e-4282-a690-5454ddec91c1",//Perbandingan Kualitas Produksi
    ];
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate() {
        this.service.search('')
            .then(data => {
                debugger
                for (var report of this.listReport) {
                    var _data = data.find((_data) => _data.id === report);
                    if (_data) {
                        this.data.push(_data);
                    }
                }
            })
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data.id });
    }
}
