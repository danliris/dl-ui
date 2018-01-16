import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

import moment from 'moment';
var PackingReceiptLoader = require('../../../../loader/packing-receipt-loader');
var ProductionOrderLoader = require('../../../../loader/production-order-loader');
var BuyerLoader = require('../../../../loader/buyers-loader');
var AccountLoader = require('../../../../loader/account-loader');



@inject(Router, Service)

export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.month = this.monthList[new Date().getMonth()];
        this.year = this.yearList[0];
        this.data = [];
        // this.info;
    }

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    info = {};

    data = [];

    monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    yearList = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2];

    // areaList = ["Area Pre Treatment", "Area Printing", "Area Dyeing", "Area Finishing", "Area Inspecting"];

    searchStatus = false;

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false,
        sortable:false,
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
    }

    columns = [

        { field: "no", title: "No" },
        // { field: "year", title: "Tahun" },
        // { field: "month", title: "Bulan" },
        {
            field: "date", title: "Tanggal",
            formatter: (value, data) => {
                    return value != "Total Jumlah" ?moment(value).format("DD-MMM-YYYY") : value;         
            }
        },
        // { field: "date", title: "Tanggal" },
        { field: "printingQty", title: "Printing (M)" },
        { field: "whiteQty", title: "Solid - White (M)" },
        { field: "dyeingQty", title: "Solid - Dyeing (M)" },
        { field: "total", title: "Jumlah (M)" },

    ];

    // loader = (info) => {
    //     return this.searchStatus ? (
    //         this.dataInfo(info),
    //         this.service.search(this.info)
    //             .then((result) => {
    //                 // setTimeout(() => {
    //                 //     this.table.__table("append", [{ no: "", year: "", month: "", day: "Total Jumlah", printingQty: max.maxPrinting, whiteQty: max.maxWhite, dyeingQty: max.maxDyeing, total: max.maxTotal }]);
    //                 // }, 1);

    //                 return {
    //                     data: result.info,
    //                 }

    //             })
    //     ) : { total: 0, data: {} };
    // }


    // dataInfo(info) {

    //     var order = {};
    //     if (info.sort)
    //         order[info.sort] = info.order;

    //     this.info.year = this.year;
    //     this.info.month = this.monthList.indexOf(this.month) + 1;
    //     this.info.order = order;

    //     this.searchStatus = true;
    // }

    searchData(info) {
        this.data = [];

        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        this.info.year = this.year;
        this.info.month = this.monthList.indexOf(this.month) + 1;
        this.info.order = order;

        this.service.search(this.info)
            .then((result) => {

                for (var i of result.info) {
                    i.date=new Date(i.year +"-"+i.month+"-"+i.day);
                    this.data.push(i)
                }
                this.getTotal(this.data);
                return this.data;
                // this.table.__table("append", [{}]);
                // this.table.refresh();
                // this.getTotal(this.data);
            })
    }

    getTotal(data) {
        var max = {
            maxPrinting: 0,
            maxWhite: 0,
            maxDyeing: 0,
            maxTotal: 0,
        }
        for (var i of data) {
            max.maxPrinting += i.printingQty;
            max.maxWhite += i.whiteQty;
            max.maxDyeing += i.dyeingQty;
            max.maxTotal += i.total;
        }

        var grandTotal = {
            no: "",
            // year: "",
            // month: "",
            date: "Total Jumlah",
            dyeingQty: max.maxDyeing,
            whiteQty: max.maxWhite,
            printingQty: max.maxPrinting,
            total: max.maxTotal,
        }
        this.data.push(grandTotal);
        // this.table.__table("append", [{ no: "", year: "", month: "", day: "Total Jumlah", printingQty: max.maxPrinting, whiteQty: max.maxWhite, dyeingQty: max.maxDyeing, total: max.maxTotal }]);
        this.table.refresh();
    }

    exportToExcel() {

        this.searchStatus = true;

        this.info.year = this.year;
        this.info.month = this.monthList.indexOf(this.month) + 1;

        this.service.generateExcel(this.info);


    }

    reset() {
        // this.area = this.areaList[0];
        this.month = this.monthList[new Date().getMonth()];
        this.year = this.yearList[0];
        this.searchStatus = false;
    }

}
