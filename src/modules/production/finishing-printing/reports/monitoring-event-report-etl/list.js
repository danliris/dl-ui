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
    shiftOptionsHard = [
        { text: "SEMUA SHIFT", value: 0 },
        { text: "PAGI", value: 1 },
        { text: "SIANG", value: 2 },
        { text: "MALAM", value: 3 },
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
            { field: "shift", title: "Shift",  valign: "top" },
            { field: "grup", title: "Group", valign: "top" },
            { field: "kasubsie", title: "Kasubsie", valign: "top" },
            { field: "keterangan", title: "Keterangan", valign: "top" },
            { field: "grup", title: "No Order", valign: "top" },
            { field: "speed", title: "Kecepatan", valign: "top" },
            { field: "qtyin", title: "Panjang_IN", valign: "top" },
            { field: "pjgoutbq", title: "Panjang_OUT_BQ", valign: "top" },
            { field: "pjgoutbs", title: "Panjang_OUT_BS", valign: "top" },
            { field: "durasi", title: "Durasi (Menit)", valign: "top" },
    ];

    

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.infoAreaHard="";
        this.infoShift="";
      
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
    
      
        var args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            area: this.infoAreaHard.text,
            startdate : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            finishdate : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,
            shift: this.infoShift.text,
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
                        data.durasi= parseInt(data.durasi * 1440);
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
            startdate : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            finishdate : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,
            shift: this.infoShift.text,
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