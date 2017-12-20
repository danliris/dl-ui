import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
        // this.month = this.monthList[new Date().getMonth()];
        // this.year = this.yearList[0];
        this.area = this.areaList[0];
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

    // monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // yearList = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2];

    areaList = ["Area Pre Treatment", "Area Printing", "Area Dyeing", "Area Finishing", "Area Inspecting"];

    searchStatus = false;

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
        // { field: "_id.date", title: "Tanggal" },
        // { field: "_id.month", title: "Bulan" },
        // { field: "_id.day", title: "Tanggal" },
        {
            field: "_id.date", title: "Tanggal", formatter: function (value, data, index) {
                return moment(new Date(value)).format("DD MMM YYYY");
            }
        },
        { field: "_id.processArea", title: "Area" },
        { field: "_id.machineName", title: "Nama Mesin" },
        { field: "totalGoodOutput", title: "Good Output" },
        { field: "totalBadOutput", title: "Bad Output" },

    ];

    loader = (info) => {

        return this.searchStatus ? (
            this.dataInfo(info),
            this.service.search(this.info)
                .then((result) => {
                    return {
                        data: result.info
                    }
                })
        ) : { total: 0, data: {} };
    }

    dataInfo(info) {

        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        this.info.dateFrom = this.dateFrom.toString();
        this.info.dateTo = this.dateTo.toString();
        this.info.area = this.area ? this.area : null;
        this.info.order = order;

        this.searchStatus = true;
    }

    searchData() {

        var e = {};

        if (!this.dateFrom) {
            e.dateFrom = "tanggal awal harus di isi";
            this.error = e;
        }

        if (!this.dateTo) {
            e.dateTo = "tanggal akhir harus di isi";
            this.error = e;
        }

        if (Object.getOwnPropertyNames(e) == 0) {

            this.searchStatus = true;
            this.table.refresh();
        }

    }

    exportToExcel() {
        var e = {};

        if (!this.dateFrom) {
            e.dateFrom = "tanggal awal harus di isi";
            this.error = e;
        }

        if (!this.dateTo) {
            e.dateTo = "tanggal akhir harus di isi";
            this.error = e;
        }

        if (Object.getOwnPropertyNames(e) == 0) {

            this.searchStatus = true;
        }

        this.info.dateFrom = this.dateFrom.toString();
        this.info.dateTo = this.dateTo.toString();
        this.info.area = this.area ? this.area : null;


        if (this.searchStatus == true) {
            this.service.generateExcel(this.info);
        }

    }

    reset() {
        this.area = this.areaList[0];
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.searchStatus = false;
    }

}