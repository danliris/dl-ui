import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
var ProductionOrderLoader = require('../../../loader/production-order-azure-loader');
var BuyerLoader = require('../../../loader/buyers-loader');
var ConstructionLoader = require('../../../loader/production-order-construction-loader');

@inject(Router, Service)
export class List {
    @bindable dateFrom;
    @bindable dateTo;
    @bindable error = {};
    @bindable dateReport;
    @bindable zona;
    @bindable selectedBuyer;
    @bindable unit;
    @bindable packingType;
    @bindable selectedConstruction;
    @bindable selectedProductionOrder;
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

    units = ["", "DYEING", "PRINTING"];
    packingTypes = ["", "WHITE", "DYEING", "BATIK", "TEXTILE", "DIGITAL PRINT", "TRANFER PRINT"];
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

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    get constructionLoader() {
        return ConstructionLoader;
    }


    construction = null;
    buyer = null;
    productionOrder = null;
    selectedConstructionChanged(n, o) {
        if (n) {
            this.construction = n;
        } else {
            this.construction = null;
        }
    }

    selectedBuyerChanged(n, o) {
        if (n) {
            this.buyer = n;
        } else {
            this.buyer = null;
        }
    }

    selectedProductionOrderChanged(n, o) {
        if (n) {
            this.productionOrder = n;
        } else {
            this.productionOrder = null;
        }
    }

    loader = (info) => {
        // var order = {};
        // if (info.sort)
        //     order[info.sort] = info.order;
        var arg = {
            dateFrom: moment(this.dateFrom).format("YYYY-MM-DD"),
            dateTo: moment(this.dateTo).format("YYYY-MM-DD"),
            zona: this.zona,
            unit: this.unit,
            packingType: this.packingType,
            construction: this.construction ? this.construction.Code : null,
            buyer: this.buyer ? this.buyer.Name : null,
            productionOrderId: this.productionOrder ? this.productionOrder.Id : null
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

    zonaChanged(n, o) {
        if (this.zona) {
            this.listDataFlag = false;
        }
    }

    export() {
        if (this.dateFrom && this.dateTo) {
            this.error = {};
            var arg = {
                dateFrom: moment(this.dateFrom).format("YYYY-MM-DD"),
                dateTo: moment(this.dateTo).format("YYYY-MM-DD"),
                zona: this.zona,
                unit: this.unit,
                packingType: this.packingType,
                construction: this.construction ? this.construction.Code : null,
                buyer: this.buyer ? this.buyer.Name : null,
                productionOrderId: this.productionOrder ? this.productionOrder.Id : null
            }
            this.service.generateExcel(arg);
        } else {
            if (!this.dateFrom) {
                this.error.dateFrom = "Tanggal Harus Diisi";
            }
            if (!this.dateTo) {
                this.error.dateTo = "Tanggal Harus Diisi";
            }
        }
        
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
        this.unit = undefined;
        this.packingType = undefined;
        this.selectedConstruction = null;
        this.selectedBuyer = null;
        this.selectedProductionOrder = null;
        this.listDataFlag = false;
        this.dateReport = null;
        this.zona = "INSPECTION MATERIAL";
        this.table.refresh();
        this.error = {};
    }

    get isAval() {
        return this.zona && this.zona == "GUDANG AVAL";
    }

    get isPackingType() {
        return this.zona && (this.zona == "GUDANG JADI" || this.zona == "SHIPPING");
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

