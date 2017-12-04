import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyersLoader = require('../../../../loader/buyers-loader');
var ComodityLoader = require('../../../../loader/comodity-loader');
var SpinningSalesContractLoader = require('../../../../loader/spinning-sales-contract-loader');

@inject(Router, Service)
export class List {

    info = {};

    data = [];

    yearList = [];
    orderTypeList = ["", "WHITE", "DYEING", "PRINTING", "YARN DYED"];

    constructor(router, service) {
        this.service = service;
        this.router = router;

        var yearNow = moment().format('YYYY')
        for (var i = parseInt(yearNow); i > 2011; i--) {
            this.yearList.push(i.toString());
        }

    }

    bind(context) {
        this.context = context;
        this.data = context.data;
    }

    // itemColumns = [
    //     { field: "monthName", title: "Bulan" },

    //     { field: "preProductionQuantity", title: "Belum Produksi\n(m)" },
    //     { field: "onProductionQuantity", title: "Sudah Produksi\n(m)" },
    //     { field: "storageQuantity", title: "Sudah Dikirim Ke Gudang\n(m)" },
    //     { field: "shipmentQuantity", title: "Sudah Dikirim Ke Buyer\n(m)" }
    // ];

    searching() {

        this.info.orderType = this.orderType ? this.orderType : "";
        this.info.year = this.year ? this.year : moment().format('YYYY');

        return this.service.search(this.info)
            .then((result) => {
                this.data = result.data;
            })
    }

    exportToExcel() {

        this.info.orderType = this.orderType ? this.orderType : "";
        this.info.year = this.year ? this.year : moment().format('YYYY');

        this.service.generateExcel(this.info);
    }

    reset() {
        this.orderType = "";
        this.year = moment().format("YYYY");
        this.data = [];
        this.info = {}
    }

}