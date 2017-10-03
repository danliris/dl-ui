import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {CoreService} from "./core-service";
import {Router} from 'aurelia-router';
import moment from 'moment';

// var purchaseOrders = require('../../../loader/garment-product-loader');
// var purchaseOrders = require('../../../loader/garment-purchase-orders-loader');
// var Unit = require('../../../loader/unit-loader');
// var Buyer = require('../../../../../loader/garment-buyers-loader');
// var Category = require('../../../loader/garment-category-loader');
var machineLoader = require('../../../../../loader/machine-loader');
var Unit = require('../../../../../loader/unit-loader');


@inject(Router, Service, CoreService)
export class List {

    constructor(router, service, coreService) {
        this.service = service;
        this.coreService = coreService;
        this.router = router;

    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    Values() {
        // debugger
        // this.arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : undefined;
        // this.arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : undefined;
        // this.arg.machine = this.machine ? this.machine.code : undefined;
        // this.arg.buyer = this.buyer ? this.buyer._id : undefined;
        // this.arg.category = this.category ? this.category._id : undefined;
        // this.arg.unit = this.unit ? this.unit._id : undefined;

        this.arg.filter = JSON.stringify({
            $and: [{ "machine.code": this.machine.code },
                { "type": "input" },
                {
                    "dateInput": {
                        $gte: new Date(this.dateFrom),
                        $lte: new Date(this.dateTo)
                    }
                }]
        });
        // this.arg.filter = JSON.stringify({$and:[{"machine.name":this.machine.code},{"type":"input"},{$where:"this.dateInput.getMonth()==6 && this.dateInput.getFullYear()==2017"}]});
    }

    filter = {};
    listDataFlag = false;

    columns = [
        { field: "name", title: "name" },
        { field: "capacity", title: "capacity" },
        { field: "monthlyCapacity", title: "input" },
        { field: "date", title: "date" },
        // {
        //     field: "date", title: "period",
        //     formatter: (value, data) => {
        //         return moment(value).format("DD-MMM-YYYY");
        //     }
        // },

    ]

    loader = (info) => {
        // var order = {};

        // if (info.sort)
        //     order[info.sort] = info.order;
        this.arg = {
            // page: parseInt(info.offset / info.limit, 10) + 1,
            // size: info.limit,
            // keyword: info.search,
            // order: order,

        };

        return this.listDataFlag ? (
            this.Values(),
            this.service.search(this.arg).then((result) => {
                var data;
                if (result.data.length == 0) {
                    data = {};
                } else {
                    var sum = 0;
                    for (var i of result.data) {
                        sum += i.input;
                    }

                    data = [{
                        name: result.data[0].machine.name,
                        capacity: result.data[0].machine.monthlyCapacity,
                        monthlyCapacity: sum,
                        date: this.dateFrom + " " + this.dateTo,
                    }];

                }

                return {
                    // total: result.info.total,
                    data: data
                }
            })
            // this.service.search(this.arg)
            //     .then(result => {

            //         var datas = [];
            //         var i = ((result.info.page - 1) * result.info.size) + 1;
            //         for (var data of result.data) {
            //             for (var item of data.items) {
            //                 Object.assign(item, {
            //                     index: i++,
            //                     no: data.refNo,
            //                     date: data.date,
            //                     shipmentDate: data.shipmentDate,
            //                     roNo: data.roNo,
            //                     buyer: data.buyer.name,
            //                     artikel: data.artikel,
            //                     unit: data.unit.name,
            //                     _createdBy: data._createdBy
            //                 })
            //                 datas.push(item)
            //             }

            //         }
            //         return {
            //             total: result.info.total,
            //             data: datas,
            //         }
            //     })
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

        if (e == {}) {
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