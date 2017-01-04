import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {

    poStates =[
        {
            "name": "",
            "value": -1
        },{
            "name": "Dibatalkan",
            "value": 0
        }, {
            "name": "PO Internal belum diorder",
            "value": 1
        }, {
            "name": "Sudah dibuat PO Eksternal",
            "value": 2
        }, {
            "name": "Sudah diorder ke Supplier",
            "value": 3
        },{
            "name": "Barang sudah datang parsial",
            "value": 4
        },{
            "name": "Barang sudah datang",
            "value": 5
        },{
            "name": "Barang sudah diterima Unit parsial",
            "value": 6
        },{
            "name": "Barang sudah diterima Unit",
            "value": 7
        },{
            "name": "Sebagian sudah dibuat SPB",
            "value": 8
        },{
            "name": "Complete",
            "value": 9
        }];

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.poStates = this.poStates.map(poState=>{
            poState.toString = function(){
                return this.name;
            }
            return poState;
        })
    }
    attached() {
    }

    activate() {
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    search() {
        var dateFormat = "DD MMM YYYY";
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        if(this.poState instanceof Object)
            this.poState = -1;
        this.service.search(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.PODLNo, this.PRNo, this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo, this.poState)
            .then(data => {
                this.data = data;
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
        this.poState = -1;
    }

    exportToXls() {
        if(this.poState instanceof Object)
            this.poState = -1;
        this.service.generateExcel(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.PODLNo, this.PRNo, this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo, this.poState);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}