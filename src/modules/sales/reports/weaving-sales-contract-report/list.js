import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

var BuyersLoader = require('../../../../loader/buyers-loader');
var ComodityLoader = require('../../../../loader/comodity-loader');
var WeavingSalesContractLoader = require('../../../../loader/weaving-sales-contract-loader');

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
            this.info.dateFrom = this.data.dateFrom ? his.data.dateFrom : "";
            this.info.dateTo = this.data.dateTo ? his.data.dateTo : "";
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

    weavingSalesContractLoaderChanged(e) {
        console.log('weavingSalesContractLoader changed')
    }

    get buyersLoader() {
        return BuyersLoader;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get weavingSalesContractLoaderLoader() {
        return WeavingSalesContractLoader;
    }

    reset() {
        this.info.salesContractNo = '';
        this.info.buyerId = '';
        this.info.comodityId = '';
        this.info.dateFrom = '';
        this.info.dateTo = '';

        this.info.salesContractNo = {};
        this.buyer = {};
        this.comodity = {};
        this.dateFrom = null;
        this.dateTo = null;
    }



}