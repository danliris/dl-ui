import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "bd66ecf6-0640-495c-b711-03e43ea405cb",//Top Ten Event Monitoring
        "5f40a4b5-3c20-4332-9cc2-cb3b9dfd9266",//Kapasitas Mesin VS Total Input Produksi
        "160f644b-259c-4750-8271-c0e14e4ef390"//Perbandingan Kualitas Order Produksi

    ];
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate() {
        this.service.search('')
            .then(data => {
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
