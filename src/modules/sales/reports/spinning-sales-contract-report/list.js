import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
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

        if (this.data) {
            this.info.salesContractNo = this.data.salesContractNo ? this.data.salesContractNo._id : null;
            this.info.buyerId = this.data.buyer ? this.data.buyer._id : null;
            this.info.comodityId = this.data.comodity ? this.data.comodity._id : null;
            this.info.dateFrom = this.data.dateFrom ? moment(this.data.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.data.dateTo ? moment(this.data.dateTo).format("YYYY-MM-DD") : "";
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
        this.data.salesContractNo = '';
        this.data.buyerId = '';
        this.data.comodityId = '';
        this.data.dateFrom = '';
        this.data.dateTo = '';

        this.data.salesContractNo = {};
        this.data.buyer = {};
        this.data.comodity = {};
        this.data.dateFrom = "";
        this.data.dateTo = "";
    }



}