import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyersLoader = require('../../../../loader/buyers-loader');
var ComodityLoader = require('../../../../loader/comodity-loader');
var SpinningSalesContractLoader = require('../../../../loader/spinning-sales-contract-loader');

@inject(Router, Service)
export class List {


    info = {
        salesContractNo: "",
        buyerId: "",
        comodityId: "",
        dateFrom: "",
        dateTo: "",

    };

    salesContractNo = {};
    buyer = {};
    comodity = {};
    dateFrom = '';
    dateTo = '';

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }

    searching() {

        if (this.filter) {
            this.info.salesContractNo = this.filter.salesContractNo ? this.filter.salesContractNo._id : null;
            this.info.buyerId = this.filter.buyer ? this.filter.buyer._id : null;
            this.info.comodityId = this.filter.comodity ? this.filter.comodity._id : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
            })
    }


    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    ExportToExcel() {
        if (this.filter) {
            this.info.salesContractNo = this.filter.salesContractNo ? this.filter.salesContractNo._id : null;
            this.info.buyerId = this.filter.buyer ? this.filter.buyer._id : null;
            this.info.comodityId = this.filter.comodity ? this.filter.comodity._id : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    buyersChanged(e) {
        console.log('buyer changed')
    }

    comodityChanged(e) {
        console.log('comodity changed')
    }

    spinningSalesContractLoaderChanged(e) {
        console.log('spinningSalesContractLoader changed')
    }

    get buyersLoader() {
        return BuyersLoader;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get spinningSalesContractLoaderLoader() {
        return SpinningSalesContractLoader;
    }

    reset() {
        this.filter = {};
        this.data = [];
    }



}