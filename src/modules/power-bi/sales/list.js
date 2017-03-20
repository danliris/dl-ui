import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "2072be69-b79e-496e-b872-959fd881970c",//Top Ten Konstruksi
        "7a433e2e-25fe-4b2e-8252-c806a4c1167a",//Top Ten Buyer
        "26d7b499-2350-4833-a4ff-ddaf01d3b4cd"//Total Order Produksi
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
