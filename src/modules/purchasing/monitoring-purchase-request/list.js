import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

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
        this.service.search(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.budget ? this.budget._id : "", this.PRNo ? this.PRNo : "", this.dateFrom, this.dateTo, -1)

            .then(data => {
                this.data = data;
                this.data = [];
                var counter = 1;
                for (var pr of data) {
                    for (var item of pr.items) {
                        var _data = {};
                        var status = pr.status ? pr.status.label : "-";

                        if(pr.status.value === 4 || pr.status.value === 9){
                            status = `${status} (${item.deliveryOrderNos.join(", ")})`;
                        }

                        _data.no = counter;
                        _data.prDate = moment(new Date(pr.date)).format(dateFormat);
                        _data.prNo = pr.no;
                        _data.productName = item.product.name;
                        _data.unit = `${pr.unit.division.name} - ${pr.unit.name}`;
                        _data.category = pr.category.name;
                        _data.productCode = item.product.code;
                        _data.budget = pr.budget.name;
                        _data.productQty = item.quantity ? item.quantity : 0;
                        _data.productUom = item.product.uom.unit ? item.product.uom.unit : "-";
                        _data.expected = pr.expectedDeliveryDate;
                        _data.status = status;
                        this.data.push(_data);
                    }
                }
            })
    }
    reset() {
        this.PRNo = "";
        this.category = "undefined";
        this.unit = "undefined";
        this.budget = "undefined";
        this.dateFrom = null;
        this.dateTo = null;
    }

    ExportToExcel() {
        this.service.generateExcel(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.budget ? this.budget._id : "", this.PRNo ? this.PRNo : "", this.dateFrom, this.dateTo, -1);
    }
    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}