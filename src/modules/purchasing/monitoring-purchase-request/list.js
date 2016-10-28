import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
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
       var dateFormat = "DD MMM YYYY";
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        this.service.search(this.unitId ? this.unitId._id : "", this.categoryId ? this.categoryId._id : "",this.budget ? this.budget._id : "",this.PRNo ? this.PRNo : "", this.dateFrom, this.dateTo)
            .then(data => {
                this.data = data;
                this.data = [];
                var counter = 1;
                for (var pr of data) {
                    for (var item of pr.items) {
                        var _data = {};
                        _data.no = counter;
                        _data.prDate = moment(new Date(pr.date)).format(dateFormat);
                        _data.prNo = pr.no;
                        _data.productName = item.product.name;
                        _data.unit = pr.unit.subDivision;
                        _data.category = pr.category.name;
                        _data.productCode = item.product.code;
                        _data.budget=pr.budget.name;
                        _data.productQty = item.quantity ? item.quantity : 0;
                        _data.productUom = item.uom.unit ? item.uom.unit : "-";
                        _data.expected = pr.expectedDeliveryDate;
                        this.data.push(_data);
                    }
                }
            })
    }
    reset() {
        this.PRNo = "";
        this.categoryId = "undefined";
        this.unitId = "undefined";
        this.budget = "undefined";
        this.dateFrom = null;
        this.dateTo = null;
    }

    ExportToExcel() {
        // var htmltable = document.getElementById('doReport');
        // var html = htmltable.outerHTML;
        // window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        this.service.generateExcel(this.unitId ? this.unitId._id : "", this.categoryId ? this.categoryId._id : "",this.budget ? this.budget._id : "",this.PRNo ? this.PRNo : "", this.dateFrom, this.dateTo);
    }

}