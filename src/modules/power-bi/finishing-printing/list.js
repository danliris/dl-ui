import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "bd66ecf6-0640-495c-b711-03e43ea405cb",//Top Ten Event Monitoring
        "0fe3b658-2633-4b8d-94fe-36e811b9a72c",//Kapasitas Mesin VS Total Input Produksi
        "b6f0a484-01c5-4be2-8f5d-73be4cc05a82",//Good Output VS Bad Output
        "0c1fedcc-58d8-4246-8878-0487b4b387c4",//Perbandingan Hasil QC
        "9298dba0-c58b-4d1c-bde7-81e16097c9cd",//Top Ten Defect

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
