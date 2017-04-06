import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "d14d8dd4-bce2-4330-9727-04db70ccd6b5",//Top Ten Konstruksi
        "f9a6b9a5-ef85-44b1-9af2-b14a72e5c2a5",//Top Ten Buyer
        "dd1c8a47-f78d-47a7-a31a-13612442ecaa"//Total Order Produksi
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
