import { inject } from 'aurelia-framework'
import { Service } from "./service";

const BuyerLoader = require("../../../../loader/buyers-loader");
const DOSalesLoader = require('../../../../loader/do-sales-loader');
const POLoader = require("../../../../loader/production-order-loader");

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }

    statusList = [
        null,
        "OK",
        "NOT OK"
    ]

    costCalculationFilter = {}

    get doSalesLoader() {
        return DOSalesLoader;
    }
    get poLoader() {
        return POLoader;
    }
    get buyerLoader() {
        return BuyerLoader;
    }

    tableData = []

    get filter() {
        return {
            doSalesNo: (this.selectedDOSalesNo || {}).DOSalesNo,
            buyerName: (this.selectedBuyer || {}).Name,
            productionOrderNo: (this.selectedPONo || {}).OrderNo,
            salesName: this.salesName,
            dateStart: this.selectedDateStart,
            dateEnd: this.selectedDateEnd,
        };
    }

    search() {
        this.tableData = [];
        this.service.search({ filter: JSON.stringify(this.filter) })
            .then(result => {
                this.tableData = result.data;
            });
    }

    clear() {
        this.selectedDOSalesNo = null;
        this.selectedBuyer = null;
        this.selectedPONo = null;
        this.salesName=null;
        this.selectedDateStart = undefined;
        this.selectedDateEnd = undefined;
        this.tableData = [];
    }

    xls() {
        this.service.xls({ filter: JSON.stringify(this.filter) });
    }
}