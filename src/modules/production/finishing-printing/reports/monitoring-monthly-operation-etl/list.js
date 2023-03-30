import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';


import moment from 'moment';
 var MachineLoader = require("../../../../../loader/machines-loader");
var KanbanLoader = require("../../../../../loader/kanban-loader");

@inject(Router, Service)
export class List {

    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
        this.flag = false;

        let yearList = []

        for (var i = 2021; i <= new Date().getFullYear() + 9; i++) {
            yearList.push({ text:i, value:i });
        }
        this.yearOptions = yearList
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    areaOptionsHard = [
        { text: "DIGITAL PRINT", value: 1 },
        { text: "DYEING", value: 2 },
        { text: "FINISHING", value: 3 },
        { text: "PRETREATMENT", value: 4 },
        { text: "PRINTING", value: 5 },
    ];

    monthOptions = [
        { text: "Januari", value: 1 },
        { text: "Februari", value: 2 },
        { text: "Maret", value: 3 },
        { text: "April", value: 4 },
        { text: "Mei", value: 5 },
        { text: "Juni", value: 6 },
        { text: "Juli", value: 7 },
        { text: "Agustus", value: 8 },
        { text: "September", value: 9 },
        { text: "Oktober", value: 10 },
        { text: "November", value: 11 },
        { text: "Desember", value: 12 },
    ];

    columns = [
            { field: "index", title: "No", valign: "top" },
            { field: "area", title: "Area", valign: "top" },
            { field: "mesin", title: "Mesin", valign: "top" },
            { field: "tgl", title: "Tanggal",  valign: "top", 
                    formatter: function (value, data, index) {
                        return moment(value).format("DD MMM YYYY"); 
                    } 
            },
            { field: "periode", title: "Periode",  valign: "top" },
            { field: "qtyin", title: "Panjang_IN", valign: "top" },
            { field: "pjgoutbq", title: "Panjang_OUT_BQ", valign: "top" },
            { field: "pjgoutbs", title: "Panjang_OUT_BS", valign: "top" },
            { field: "totalOutput", title: "Total Output", valign: "top" },
            { field: "monthlycapacity", title: "Kapasitas Mesin", valign: "top" },
    ];

    

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.infoAreaHard="";
        this.infoShift="";
        this.month = this.monthOptions[new Date().getMonth()];
        this.year = new Date().getFullYear();
    }

    rowFormatter(data, index) {
        return {};
    }

    search() {
        this.error = {};
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.Table.refresh();
        }
    }

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
    
        console.log(this.month)
        var args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            area: this.infoAreaHard.text,
            month: this.month.value,
            year: this.year.value,
            idmesin:this.Machine ? this.Machine.Id : 0,
          };
        return this.flag ?
            (
            this.service.search(args)
                .then(result => {
                    var index=0;
                    for(var data of result.data){
                        index++;
                        data.index=index;
                        data.totalOutput= data.pjgoutbq+data.pjgoutbs;
                    }
                    return {
                        total: result.total,
                        data: result.data
                    };
                })
            ) : { total: 0, data: [] };
      }

    ExportToExcel() {
        var args = {
            area: this.infoAreaHard.text,
            month: this.month.value,
            year: this.year.value,
            idmesin:this.Machine ? this.Machine.Id : 0,
          };
        this.service.generateExcel(args);
    }

    get machineLoader() {
        return MachineLoader;
    }

    get kanbanLoader() {
        return KanbanLoader;
    }
}