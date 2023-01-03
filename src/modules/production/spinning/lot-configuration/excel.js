import { inject,bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../../loader/unit-loader');
var MaterialTypeLoader = require('../../../../loader/spinning-material-types-loader');

@inject(Router, Service)
export class excel {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.title = "Laporan Lot Configuration";
    }

    listDataFlag = false;

    dateFrom = null;
    dateTo = null;

    rowFormatter(data, index) {
        return {};
    }

    columns = [
        [
            {field: "Unit", title: "Unit"},
            {
                field: "LotDate", title: "Tanggal", formatter: function (value, data, index) {
                    return value ? moment(value).format("DD MMM YYYY") : "-";
                }
            },
            {field: "LotNo", title: "Lot"},
            {field: "YarnType.Name", title: "Tipe Benang"},
            {field: "Product.Code", title: "Kode Serat"},
            {field: "Product.Name", title: "Nama Serat"},
            {field: "CottonCompositions.Composition", title: "Komposisi"},
        ]
    ];

    bind(context){
        this.context = context;
        this.data = context.data;
    }

    searching() {
        this.listDataFlag = true;
        this.lotTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if(info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            Unit: this.unit ? this.unit.Id : "",
            Yarn: this.yarn ? this.yarn.Id : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : ""
        };

        return this.listDataFlag ?
            (
                this.service.searching(args)
                    .then(result => {
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }


    // fillValues() {
    //     this.info.Unit = this.unit ? this.unit.Id : "";
    //     this.info.YarnTypeIdentity = this.yarn ? this.yarn.Id : "";
    //     this.info.dateFrom = this.dateFrom ? this.dateFrom : "";
    //     this.info.dateTo = this.dateTo ? this.dateTo : "";    }

    // exportExcel() {
    //     this.fillValues();  
    //     this.service.generateExcel(this.info);
    // }

    reset(){
        this.listDataFlag = false;
        this.selectedUnit = null;
        this.dateFrom = "";
        this.dateTo = "";
        this.selectedYarn = null;
        this.info = {};
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 8
        }
    }

    get unitLoader(){
        return UnitLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    } 

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }
}