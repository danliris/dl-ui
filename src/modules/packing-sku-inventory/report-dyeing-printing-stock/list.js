import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    @bindable dateFrom;
    @bindable dateTo;
    @bindable error = {};
    @bindable dateReport;
    @bindable zona;
    listDataFlag = false;

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false,
        sortable: false
    }

    zoneList = ["INSPECTION MATERIAL", "TRANSIT", "PACKING", "GUDANG JADI", "GUDANG AVAL", "SHIPPING"];
    columns = [
        // {
        //     field: "date", title: "Tanggal", formatter: function (value, data, index) {
        //         return moment(value).format("DD MMM YYYY");
        //     }
        // },
        { field: "noSpp", title: "No. SPP" },
        { field: "construction", title: "Material" },
        { field: "unit", title: "Unit" },
        { field: "motif", title: "Motif" },
        { field: "color", title: "Warna" },
        { field: "grade", title: "Grade" },
        { field: "jenis", title: "Jenis" },
        { field: "ket", title: "Ket" },
        { field: "awal", title: "Awal" },
        { field: "masuk", title: "Masuk" },
        { field: "keluar", title: "Keluar" },
        { field: "akhir", title: "Akhir" },
        { field: "satuan", title: "Satuan" }
    ];

    loader = (info) => {
        // var order = {};
        // if (info.sort)
        //     order[info.sort] = info.order;
        var arg = {
            dateFrom: moment(this.dateFrom).format("YYYY-MM-DD"),
            dateTo: moment(this.dateTo).format("YYYY-MM-DD"),
            zona: this.zona,
        }

        return this.listDataFlag ? this.service.search(arg)
            .then((result) => {
                var data = {};
                data.data = result;
                data.total = result.length;

                return data;
            }) : { data: [] };;
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    zonaChanged(n, o){
        if(this.zona){
            this.listDataFlag = false;
        }
    }

    export() {
        this.service.generateExcel(moment(this.dateReport).format("YYYY-MM-DD"), this.zona);
    }

    search() {
        if (this.zona == "GUDANG AVAL") {
            if (this.dateReport) {
                this.listDataFlag = true;
                this.error = {};
                this.table.refresh();
            } else {
                this.error.dateReport = "Tanggal Harus Diisi";
            }
        } else {
            if (this.dateFrom && this.dateTo) {
                this.listDataFlag = true;
                this.error = {}
                this.table.refresh();
            } else {
                if (!this.dateFrom) {
                    this.error.dateFrom = "Tanggal Harus Diisi";
                }
                if (!this.dateTo) {
                    this.error.dateTo = "Tanggal Harus Diisi";
                }
            }
        }
    }

    reset() {
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.listDataFlag = false;
        this.dateReport = null;
        this.zona = null;
        this.table.refresh();
        this.error = {};
    }

    get isAval() {
        return this.zona && this.zona == "GUDANG AVAL";
    }

    avalColumns = [
        { field: "avalType", title: "Nama Barang" },
        {
            field: "startAvalQuantity", title: "Awal Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "startAvalWeightQuantity", title: "Awal Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "inAvalQuantity", title: "Masuk Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "inAvalWeightQuantity", title: "Masuk Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "outAvalQuantity", title: "Keluar Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "outAvalWeightQuantity", title: "Keluar Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "endAvalQuantity", title: "Akhir Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        },
        {
            field: "endAvalWeightQuantity", title: "Akhir Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.0');
            }
        }
    ];

    avalLoader = (info) => {
        var arg = {
            searchDate: moment(this.dateReport).format("DD MMM YYYY HH:mm"),
        }
        return this.listDataFlag ? this.service.searchAval(arg)
            .then((result) => {
                return {
                    data: result.data
                }
            }) : { data: [] };
    }

    exportAval() {
        var searchDate = this.dateReport ? moment(this.dateReport).format("DD MMM YYYY HH:mm") : null;
        this.service.generateExcelAval(searchDate);

    }
}

