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
    salesContractNo = '';
    orderNo = '';
    orderType = null;
    processType = null;
    buyer = null;
    account = null;
    filterAccount = {};
    filter = {};
    info = { page: 1, keyword: '' };

    activate() {
        this.data = [];
        this.filterAccount = {
            "roles": {
                "$elemMatch": {
                    "permissions": {
                        "$elemMatch": {
                            "unit.name": "PENJUALAN FINISHING & PRINTING"
                        }
                    }
                }
            }
        };
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.salesContractNo = '';
        this.orderNo = '';
        this.orderType = null;
        this.processType = null;
        this.buyer = null;
        this.account = null;
        this.filter = {};
        this.data = [];
    }

    searching() {
        var data = [];
        this.setFilter();
        this.filter = this.info.filter;
        this.service.getReport(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.data;
                this.info.filter = this.filter;
            })
    }

    ExportToExcel() {
        this.setFilter();
        this.service.generateExcel(this.info);
    }

    buyerChanged(e) {
        var selectedBuyer = e.detail || null;
        if (!selectedBuyer) {
            this.buyer = null;
        }
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

    processTypeChanged(e) {
        var selectedProcessType = e.detail || null;
        if (!selectedProcessType) {
            this.processType = null;
        }
    }

    accountChanged(e) {
        var selectedAccount = e.detail || null;
        if (!selectedAccount) {
            this.account = null;
        }
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    setFilter() {
        this.info.filter = {};
        if (this.dateFrom) {
            Object.assign(this.filter, { sdate: this.dateFrom });
        }
        if (this.dateTo) {
            Object.assign(this.filter, { edate: this.dateTo });
        }
        if (this.salesContractNo) {
            Object.assign(this.filter, { salesContractNo: this.salesContractNo });
        }
        if (this.orderNo) {
            Object.assign(this.filter, { orderNo: this.orderNo });
        }
        if (this.orderType) {
            Object.assign(this.filter, { orderTypeId: this.orderType._id });
        }
        if (this.processType) {
            Object.assign(this.filter, { processTypeId: this.processType._id });
        }
        if (this.buyer) {
            Object.assign(this.filter, { buyerId: this.buyer._id });
        }
        if (this.account) {
            Object.assign(this.filter, { accountId: this.account._id });
        }
        if (Object.getOwnPropertyNames(this.filter).length > 0) {
            this.info.filter = JSON.stringify(this.filter);
        }
    }

    detail(data) {
        this.router.navigateToRoute('view', { id: data.salesContractNo });
    }
}