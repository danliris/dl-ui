import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {

    supplierApiUri = require('../../../host').core + "/v1/core/suppliers";

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    attached() {
    }

    activate() {
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    search() {
        this.service.search(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.PODLNo, this.PRNo, this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo)
            .then(data => {
                this.data = data;
                var counter = 1;
                for (var PO of data) {
                    for (var item of PO.items) {
                        item.index = counter++;
                    }
                }
            })
    }

    reset() {
        this.unit = "undefined";
        this.category = "undefined";
        this.PODLNo = "";
        this.PRNo = "";
        this.supplier = "undefined";
        this.dateFrom = null;
        this.dateTo = null;
    }

}