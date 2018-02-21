import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../../loader/unit-loader');

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    columns =[
        { field: "NomorInputProduksi", title: "Nomor Input Produksi" },
        { field: "YarnName", title: "Yarn Name" },
        {
            field: "Date", title: "Date", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "UnitName", title: "Unit Name" },
        { field: "MachineName", title: "Machine Name" },
        { field: "Lot", title: "Lot" },
        { field: "Shift", title: "Shift" },
    ];

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false,
        sortable:false,
    }

    listDataFlag = false;
    spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };

    filter() {
        this.arg = {};
        this.arg.Filter = {
            "UnitName": this.unit.name,
            "DateFrom": moment(this.dateFrom).format("DD MMM YYYY"),
            "DateTo":  moment(this.dateTo).format("DD MMM YYYY")
        };
    }

    ExportToExcel(){
        this.filter()
        this.service.generateExcel(this.arg)
    }

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        }

        return this.listDataFlag ? (
            this.filter(),
            this.service.search(this.arg).then((result) => {
                return {
                    // total: result.info.total,
                    data: result
                }
            })
        ) : { total: 0, data: {} };
    }

    search() {
        var e = {};
        if (!this.unit) {
            e.unit = "unit harus di isi";
            this.error = e;
        }

        if (this.dateFrom == undefined) {
            e.dateFrom = "tanggal awal harus di isi";
            this.error = e;
        }

        if (this.dateTo == undefined) {
            e.dateTo = "tanggal akhir harus di isi";
            this.error = e;
        }

        if (Object.getOwnPropertyNames(e) == 0) {

            this.listDataFlag = true;
            this.table.refresh();
        }
    }

    reset() {
        this.unit = null;
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.error = "";
    }

    unitChanged(newValue, oldValue) {
        if (this.unit && this.unit._id) {
            this.data.Unit = this.unit
        }
        else {
            this.unit = null;
        }
    }

    get unitLoader() {
        return UnitLoader;
    }
}
