import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    // @bindable DateReport;
    // @bindable zone;  

    @bindable error = {};
    // context = ["detail"]
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };
    detailOptions = {
        searchable: false
    };
    zoneList = ["INSPECTION MATERIAL", "TRANSIT", "PACKING", "GUDANG JADI", "GUDANG AVAL", "SHIPPING"];
    columns = [
        // {
        //     field: "date", title: "Tanggal", formatter: function (value, data, index) {
        //         return moment(value).format("DD MMM YYYY");
        //     }
        // },
        { field: "noSpp", title: "No. SPP" },
        { field: "contruction", title: "Material" },
        { field: "unit", title: "Unit" },
        { field: "motif", title: "Motif" },
        { field: "color", title: "Warna" },
        { field: "grade", title: "Grade" },
        { field: "jenis", title: "Jenis" },
        { field: "keterangan", title: "Ket" },
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
            dateReport: moment(this.dateReport).format("YYYY-MM-DD"),
            zona: this.zona,
        }

        return this.service.search(arg)
            .then((result) => {
                var data = {};
                data.data = result;
                data.total = result.length;

                return data;
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "print":
                this.service.getPdfById(data.id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "print":
                return data;
            default:
                return true;
        }
    }

    export() {
        this.service.generateExcel(moment(this.dateReport).format("YYYY-MM-DD"), this.zona);

    }
    search() {
        this.listDataFlag = true;
        // if (this.zona == "GUDANG AVAL") {
        //     this.avalTable.refresh();
        // } else {
        this.table.refresh();
        // }
    }

    @bindable dateReport;
    dateReportChanged(n, o) {
        // if (n!=o){
        //     // this.dateReport = n;
        //     this.data.dateReport = n;
        // }
        console.log(this);
    }
    @bindable zona;
    zonaChanged(n, o) {
        this.listDataFlag = false;
        if (this.zona == "GUDANG AVAL") {
            this.isAval = true;
        } else {
            this.isAval = false;
        }
    }
    reset() {
        this.listDataFlag = false;
        this.dateReport = null;
        this.zona = null;
        // if (this.zona == "GUDANG AVAL") {
        //     this.avalTable.refresh();
        // } else {
        this.table.refresh();
        this.error = {};
        // }
    }

    isAval = false;

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    listDataFlag = false;

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
        if (this.dateReport) {
            this.error = {};
            var arg = {
                searchDate: moment(this.dateReport).format("DD MMM YYYY HH:mm"),
            }

            return this.listDataFlag ? this.service.searchAval(arg)
                .then((result) => {
                    console.log(result);
                    return {
                        data: result.data
                    }
                }) : { data: [] };
        } else {
            this.error.DateReport = "Tanggal Harus Diisi";
            return { data: [] };
        }

    }

    exportAval() {
        var searchDate = this.dateReport ? moment(this.dateReport).format("DD MMM YYYY HH:mm") : null;
        this.service.generateExcelAval(searchDate);

    }
}

