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


    search() {
        this.SJ = [];
        this.service.search(this.no ? this.no : "", this.supplierId ? this.supplierId._id : "", this.dateFrom, this.dateTo)
            .then(data => {
                this.data = data;
                for (var SJ of this.data) {
                    this.SJ = SJ;
                    for (var item of SJ.items) {
                        this.item = item;
                        for (var fulfillment of item.fulfillments) {
                            this.fulfillment = fulfillment;
                        }
                    }
                }
            })
    }
    reset() {
        this.no = "undefined";
        this.supplierId = "undefined";
        this.dateFrom = null;
        this.dateTo = null;
    }

    ExportToExcel() {
        // var htmltable = document.getElementById('doReport');
        // var html = htmltable.outerHTML;
        // window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        this.service.generateExcel(this.no ? this.no : "", this.supplierId ? this.supplierId._id : "", this.dateFrom, this.dateTo);
    }

}