import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

var PackingLoader = require('../../../../../loader/packing-loader');

@inject(Router, Service)
export class List {


    info = {
        code: "",
        productionOrderNo: "",
        dateFrom: "",
        dateTo: "",

    };
    code = {};
    productionOrderNo = {};
    dateFrom = "";
    dateTo = "";

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    searching() {

        if (this.filter) {
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo._id : null;
            this.info.code = this.filter.code ? this.filter.code._id : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                var tempData;
                this.no = 0;
                this.newData = [];

                for (var i = 0; i < result.data.length; i++) {
                    for (var j = 0; j < result.data[i].items.length; j++) {
                        tempData = {};
                        this.no += 1;
                        tempData.no = this.no;
                        tempData.code = result.data[i].code;
                        tempData.construction = result.data[i].construction;
                        tempData.buyer = result.data[i].buyer;
                        tempData.productionOrderNo = result.data[i].productionOrderNo;
                        tempData.construction = result.data[i].construction;
                        tempData.motif = result.data[i].motif;
                        tempData.colorName = result.data[i].colorName;
                        tempData.date = result.data[i].date;

                        tempData.lot = result.data[i].items[j].lot;
                        tempData.grade = result.data[i].items[j].grade;
                        tempData.weight = result.data[i].items[j].weight;
                        tempData.length = result.data[i].items[j].length;
                        tempData.quantity = result.data[i].items[j].quantity;
                        tempData.remark = result.data[i].items[j].remark;
                        this.newData.push(tempData);
                    }
                }
            })
    }


    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    ExportToExcel() {
        if (this.filter) {
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo._id : null;
            this.info.code = this.filter.code ? this.filter.code._id : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        }
        else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    get packingLoader() {
        return PackingLoader;
    }

    reset() {
        this.filter = {};
        this.data = [];
    }

}