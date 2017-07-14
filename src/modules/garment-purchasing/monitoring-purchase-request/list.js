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
            "name": "Belum diterima Pembelian",
            "value": 2
        }, {
            "name": "Sudah diterima Pembelian",
            "value": 7
        }, {
            "name": "Sudah diorder ke Supplier",
            "value": 3
        }, {
            "name": "Barang sudah datang sebagian",
            "value": 4
        }, {
            "name": "Barang sudah datang semua",
            "value": 9
        }
    ];
    purchaseRequest = {};
    filter = { isPosted: true };
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.prStates = this.prStates.map(prState => {
            prState.toString = function () {
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
        if (!this.prState)
            this.prState = this.prStates[0];


        this.service.search(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.purchaseRequest._id ? this.purchaseRequest.no : "", this.dateFrom, this.dateTo, this.prState.value)
            .then(data => {
                this.data = data;
                this.data = [];
                var counter = 1;
                for (var pr of data) {
                    for (var item of pr.items) {
                        var _data = {};
                        var status = pr.status ? pr.status.label : "-";

                        if (pr.status.value === 4 || pr.status.value === 9) {
                            status = item.deliveryOrderNos.length > 0 ? `${status} (${item.deliveryOrderNos.join(", ")})` : status;
                        }

                        _data.prDate = moment(new Date(pr.date)).format(dateFormat);
                        _data.shipmentDate = moment(new Date(pr.shipmentDate)).format(dateFormat);
                        _data.roNo = pr.roNo;
                        _data.buyer = pr.buyer;
                        _data.artikel = pr.artikel;
                        _data.prNo = pr.no;
                        _data.refNo = pr.refNo;
                        _data.productName = item.product.name;
                        _data.unit = `${pr.unit.division.name} - ${pr.unit.name}`;
                        _data.category = pr.category.name;
                        _data.productCode = item.product.code;
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
        this.purchaseRequest = {};
        this.category = null;
        this.unit = null;
        this.budget = null;
        this.dateFrom = null;
        this.dateTo = null;
        this.prState = this.prStates[0];
    }

    ExportToExcel() {
        if (!this.prState)
            this.prState = this.prStates[0];
        debugger
        this.service.generateExcel(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.budget ? this.budget._id : "", this.purchaseRequest._id ? this.purchaseRequest.no : "", this.dateFrom, this.dateTo, this.prState.value);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}