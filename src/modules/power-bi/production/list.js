import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "9401ddc4-47e3-49a3-9a8e-8ff59043cdb5",//Top Ten Event Monitoring
        "fb6a964c-ba35-4333-82ee-dc17ee96f593",//Kapasitas Mesin VS Total Input Produksi
        "0887c632-d838-4772-8c6e-f29032abdc11",//Good Output VS Bad Output Produksi
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
