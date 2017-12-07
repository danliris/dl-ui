import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyersLoader = require('../../../../loader/buyers-loader');
var ComodityLoader = require('../../../../loader/comodity-loader');
var SpinningSalesContractLoader = require('../../../../loader/spinning-sales-contract-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;

        var yearNow = moment().format('YYYY')
        for (var i = parseInt(yearNow); i > 2011; i--) {
            this.yearList.push(i.toString());
        }

        this.title = "Laporan Status Order Berdasarkan Delivery";
        this.contextTable = ["Detail"];
    }

    info = {};

    data = [];
   

    yearList = [];
    orderTypeList = ["", "WHITE", "DYEING", "PRINTING", "YARN DYED"];

    listDataFlag = false;

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
    }

    columns = [
        [
            { title: "Status Order", colspan: "6" },
        ],
        [
            { field: "name", title: "Bulan" },
            { field: "preProductionQuantity", title: "Belum Produksi\n(m)" },
            { field: "onProductionQuantity", title: "Sudah Produksi\n(m)" },
            { field: "orderQuantity", title: "Target Kirim Ke Buyer\n(m)" },
            { field: "storageQuantity", title: "Sudah Dikirim Ke Gudang\n(m)" },
            { field: "shipmentQuantity", title: "Sudah Dikirim Ke Buyer\n(m)" }
        ]
    ];

    loader = (info) => {

        this.info = {};

        return this.listDataFlag ? (
            this.fillValues(),
            this.service.search(this.info)
                .then((result) => {
                    this.selectedYear = this.year;
                    this.selectedOrderType = this.orderType;
                    
                    return {
                        data: result.data
                    }
                })
        ) : { total: 0, data: {} };
    }

    fillValues() {
        this.info.orderType = this.orderType ? this.orderType : "";
        this.info.year = this.year ? this.year : moment().format('YYYY');
    }

    searching() {
        this.listDataFlag = true;
        this.orderStatusTable.refresh();
    }

    exportToExcel() {
        this.fillValues();
        this.service.generateExcel(this.info);
    }

    reset() {
        this.listDataFlag = false;
        this.info = {};
        this.year = moment().format("YYYY");
        this.orderStatusTable.refresh();
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                if(data.name != "Total")
                    window.open(`${window.location.origin}/#/sales/order-status-report/view/${this.selectedYear}/${data.name}/${this.selectedOrderType}`);
                break;
        }
    }
}