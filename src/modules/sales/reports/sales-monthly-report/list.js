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
    dateFrom = null;
    dateTo = null;
    orderType = null;
    filterAccount = {};
    filter = {};
    info = { page: 1, keyword: '' };

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.orderType = null;
        this.filter = {};
        this.info = { page: 1, keyword: '' };
        this.data = [];
    }

    searching() {
        var data = [];
        this.setFilter();
        this.service.getSalesMonthlyReport(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
            })
    }

    ExportToExcel() {
        this.setFilter();
        this.service.generateExcel(this.info);
    }


    orderTypeChanged(e) {
        var selectedOrderType = e.detail || null;
        if (selectedOrderType) {
            this.filterOrder = {
                "orderType.code": selectedOrderType.code
            }
        } else {
            this.orderType = null;
            this.processType = null;
            this.filterOrder = {};
        }
    }

    setFilter() {
        this.info.filter = {};
        if (this.dateFrom) {
            Object.assign(this.filter, { sdate: this.dateFrom });
        }
        if (this.dateTo) {
            Object.assign(this.filter, { edate: this.dateTo });
        }
        if (this.orderType) {
            Object.assign(this.filter, { orderTypeId: this.orderType._id });
        }
        if (Object.getOwnPropertyNames(this.filter).length > 0) {
            this.info.filter = JSON.stringify(this.filter);
        }
    }
}
