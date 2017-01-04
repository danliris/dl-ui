import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {

    prStates = [
        {
            "name": "",
            "value": -1
        },
        {
            "name": "Dibatalkan",
            "value": 0
        }, {
            "name": "Purchase request dibuat",
            "value": 1
        }, {
            "name": "Belum diterima Pembelian",
            "value": 2
        }, {
            "name": "Sudah diterima Pembelian",
            "value": 7
        }, {
            "name": "Sudah diorder ke Supplier",
            "value": 3
        }, {
            "name": "Barang sudah datang",
            "value": 4
        }, {
            "name": "Complete",
            "value": 9
        }
    ];
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.prStates = this.prStates.map(prState=>{
            prState.toString = function(){
                return this.name;
            }
            return prState;
        })
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
        if (this.prState instanceof Object)
            this.prState = -1;

        this.service.search(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.budget ? this.budget._id : "", this.PRNo ? this.PRNo : "", this.dateFrom, this.dateTo, this.prState)
            .then(data => {
                this.data = data;
                this.data = [];
                var counter = 1;
                for (var pr of data) {
                    for (var item of pr.items) {
                        var _data = {};
                        var status = pr.status ? pr.status.label : "-";

                        if (pr.status.value === 4 || pr.status.value === 9) {
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
        this.category = null;
        this.unit = null;
        this.budget = null;
        this.dateFrom = null;
        this.dateTo = null;
        this.prState = -1;
    }

    ExportToExcel() {
        if (this.prState instanceof Object)
            this.prState = -1;
        this.service.generateExcel(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.budget ? this.budget._id : "", this.PRNo ? this.PRNo : "", this.dateFrom, this.dateTo, this.prState);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}