import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

var moment = require('moment');
var MachineLoader = require("../../../loader/machines-loader");
var KanbanLoader = require("../../../loader/kanban-loader");

@inject(Router, Service)
export class List {

    constructor(router, service) {

        this.service = service;
        this.router = router;
        
    }

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
        pagination: false
    }

    listDataFlag = false;
    zone = null;
    date = null;
    group = null;
    mutation = null;

    groups = ["","PAGI", "SIANG"];
    mutations = ["","AWAL","MASUK","KELUAR","ADJ MASUK", "ADJ KELUAR"];
    zones = ["","IM", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIP", "AWAL", "LAB"]

    columns = [
        {
            field: "date", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "group", title: "Group" },
        { field: "unitName", title: "Unit" },
        { field: "sourceArea", title: "Masuk Dari" },
        { field: "productionOrderNo", title: "No. SPP" },
        { field: "cartNo", title: "No. Kereta" },
        { field: "materialName", title: "Material" },
        { field: "materialConstructionName", title: "Konstruksi Material" },
        { field: "materialWidth", title: "Lebar Material" },
        { field: "status", title: "Keterangan" },
        { field: "grade", title: "Grade" },
        { field: "motif", title: "Motif" },
        { field: "color", title: "Warna" },
        { field: "meterLength", title: "Mtr" },
        { field: "yardsLength", title: "Yds" }
    ];

    // activate() {
    // }

    bind(context) {
        this.context = context;
        this.data = context.data;
    }

    // searching() {
    //     this.service.getReport(this.dateFrom, this.dateTo, this.machine, this.kanban)
    //         .then(result => {
    //             this.data = result;
    //             for (var daily of this.data) {
    //                 daily.timeInput = daily.dateInput ? moment(daily.timeInput).format('HH:mm') : '-';
    //                 daily.timeOutput = daily.timeOutput ? moment(daily.timeOutput).format('HH:mm') : '-';
    //             }
    //         })
    // }

    rowFormatter(data, index) {
        // if (index === 12) {
        //     return { classes: "weight" }
        // } else {
        //     return {};
        // }
        return {};
    }

    loader = (info) => {

        this.info = {};
        var searchDate = this.date ? moment(this.date).format("DD MMM YYYY HH:mm") : null;
        return this.listDataFlag ? (

            // this.service.getReport(this.dateFrom, this.dateTo, this.Machine, this.Kanban)
            this.service.getReport(searchDate, this.zone, this.group, this.mutation)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    searching() {
        this.listDataFlag = true;

        this.table.refresh();
    }


    reset() {
        this.listDataFlag = false;
        this.dateFrom = null;
        this.dateTo = null;
        this.Machine = null;
        this.Kanban = null;
        this.filterKanban = null;
        this.kanbanId = null;
        this.error = '';
    }

    ExportToExcel() {
        //    var htmltable= document.getElementById('myTable');
        //    var html = htmltable.outerHTML;
        //    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        // var searchDate = this.searchDate ? moment(this.searchDate).format("DD MMM YYYY HH:mm") : null;
        var searchDate = this.date ? moment(this.date).format("DD MMM YYYY HH:mm") : null;
        this.service.generateExcel(searchDate, this.zone, this.group, this.mutation);
    }

    get machineLoader() {
        return MachineLoader;
    }

    get kanbanLoader() {
        return KanbanLoader;
    }

}