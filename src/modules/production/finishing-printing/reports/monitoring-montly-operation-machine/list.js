import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

// var purchaseOrders = require('../../../loader/garment-product-loader');
// var purchaseOrders = require('../../../loader/garment-purchase-orders-loader');
// var Unit = require('../../../loader/unit-loader');
// var Buyer = require('../../../../../loader/garment-buyers-loader');
// var Category = require('../../../loader/garment-category-loader');
var machineLoader = require('../../../../../loader/machine-loader');
var Unit = require('../../../../../loader/unit-loader');


@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false,
    }

    Values() {

        this.arg = {
            page: 1,
            size: Number.MAX_SAFE_INTEGER,
            select: ["machine.name", "input", "machine.monthlyCapacity", "machine.code", "dateInput"],
        };

        // this.arg.filter = JSON.stringify({ "$and": [{ "machine.code": this.machine.code }, { "type": "input" }, { "$where": "this.dateInput >=new Date('" + this.dateFrom.toString() + "') && this.dateInput <= new Date('" + this.dateTo.toString() + "')" }] });

        this.arg.filter = JSON.stringify({
            "machineCode": this.machine.code,
            "type": "input",
            "dateFrom": new Date(this.dateFrom),
            "dateTo": new Date(this.dateTo),
        });
    }

    filter = {};
    listDataFlag = false;

    columns = [
        { field: "name", title: "Nama Mesin" },
        { field: "capacity", title: "Kapasitas" },
        { field: "monthlyCapacity", title: "Input" },
        { field: "date", title: "Periode" },
    ]

    loader = (info) => {
        // var order = {};

        // if (info.sort)
        //     order[info.sort] = info.order;


        return this.listDataFlag ? (
            this.Values(),
            this.service.search(this.arg).then((result) => {
                var data;
debugger
                if (result.info.length == 0) {
                    data = {};
                } else {
                    var sum = 0;
                    for (var i of result.info) {
                        sum += i.input;
                    }

                    data = [{
                        name: result.info[0].machine.name,
                        capacity: result.info[0].machine.monthlyCapacity,
                        monthlyCapacity: sum,
                        date: moment(this.dateFrom).format("DD-MMM-YYYY") + " hingga " + moment(this.dateTo).format("DD-MMM-YYYY"),
                    }];

                }
                return {
                    total: result.info.total,
                    data: data
                }
            })
        ) : { total: 0, data: {} };
    }

    ExportToExcel() {
        this.Values();
        this.service.generateExcel(this.arg);
    }

    search() {
        var e = {};
        if (!this.machine) {
            e.machine = "machine harus di isi";
            this.error = e;
        }

        if (!this.dateFrom) {
            e.dateFrom = "tanggal awal harus di isi";
            this.error = e;
        }

        if (!this.dateTo) {
            e.dateTo = "tanggal akhir harus di isi";
            this.error = e;
        }

        if (Object.getOwnPropertyNames(e) == 0) {

            this.listDataFlag = true;
            this.table.refresh();
        }

    }

    get MachineLoader() {
        return machineLoader;
    }

    get unitLoader() {
        return Unit;
    }

    reset() {
        this.no = "";
        this.unit = "";
        this.category = "";
        this.buyer = "";
        this.dateFrom = null;
        this.dateTo = null;
        this.listDataFlag = false;
        this.movementTable.refresh();
    }

}