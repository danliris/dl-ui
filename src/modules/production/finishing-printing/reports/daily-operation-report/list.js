import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class List {

    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    listDataFlag = false;

    dateFrom = null;
    dateTo = null;
    machine = null;
    kanban = null;
    filterKanban = null;
    kanbanId = null;

    columns = [
        [
            {
                field: "no", title: "No", rowspan: "3", valign: "top", formatter: function (value, data, index) {
                    return index + 1;
                }
            },
            { field: "kanban.productionOrder.orderNo", title: "No. Order", rowspan: "3", valign: "top" },
            { field: "kanban.cart.cartNumber", title: "No. Kereta", rowspan: "3", valign: "top" },
            { field: "kanban.isReprocess", title: "Reproses", rowspan: "3", valign: "top" },
            { field: "machine.name", title: "Mesin", rowspan: "3", valign: "top" },
            { field: "step.process", title: "Step Proses", rowspan: "3", valign: "top" },
            { field: "kanban.productionOrder.material.name", title: "Material", rowspan: "3", valign: "top" },
            { field: "kanban.selectedProductionOrderDetail.colorRequest", title: "Warna", rowspan: "3", valign: "top" },
            { field: "kanban.productionOrder.finishWidth", title: "Lebar Kain (inch)", rowspan: "3", valign: "top" },
            { field: "kanban.productionOrder.processType.name", title: "Jenis Proses", rowspan: "3", valign: "top" },
            { title: "Panjang In (m)", colspan: "3", valign: "middle" },
            { title: "Panjang Out (m)", colspan: "4", valign: "middle" },
            { field: "badOutputDescription", title: "Keterangan BS", rowspan: "3", valign: "middle", classes: "newLine" },
        ],
        [
            {
                field: "dateInput", title: "Tgl", rowspan: "2", valign: "middle", formatter: function (value, data, index) {
                    return value ? moment(value).format("DD MMM YYYY") : "-";
                }
            },
            {
                field: "timeInput", title: "Jam", rowspan: "2", valign: "middle", formatter: function (value, data, index) {
                    return value ? moment(value).format('HH:mm') : '-';
                }
            },
            { field: "input", title: "In Qty", rowspan: "2", valign: "middle", },
            {
                field: "dateOutput", title: "Tgl", rowspan: "2", valign: "middle", formatter: function (value, data, index) {
                    return value ? moment(value).format("DD MMM YYYY") : "-";
                }
            },
            {
                field: "timeOutput", title: "Jam", rowspan: "2", valign: "middle", formatter: function (value, data, index) {
                    return value ? moment(value).format('HH:mm') : '-';
                }
            },
            { title: "Out Qty", colspan: "2", valign: "middle" },
        ],
        [
            { field: "goodOutput", title: "BQ", valign: "middle" },
            { field: "badOutput", title: "BS", valign: "middle" },
        ]
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

        return this.listDataFlag ? (
            this.service.getReport(this.dateFrom, this.dateTo, this.machine, this.kanban)
                .then((result) => {
                    return {
                        data: result
                    }
                })
        ) : { total: 0, data: {} };
    }

    searching() {
        this.listDataFlag = true;
        this.dailyTable.refresh();
    }

    // exportToExcel() {
    //     this.fillValues();
    //     this.service.generateExcel(this.info);
    // }

    // kanbanChanged(e){
    //     var selectedKanban = e.detail;
    //     if(selectedKanban){
    //         this.kanbanId = selectedKanban._id;
    //         if(selectedKanban.instruction){
    //             var steps = [];
    //             for(var step of selectedKanban.instruction.steps){
    //                 steps.push(step.process);
    //             }
    //             this.filterMachine = {
    //                 "step.process" : { "$in" : steps }
    //             };
    //         }
    //     }
    // }

    reset() {
        this.listDataFlag = false;
        this.dateFrom = null;
        this.dateTo = null;
        this.machine = null;
        this.kanban = null;
        this.filterKanban = null;
        this.kanbanId = null;
        this.error = '';
    }

    ExportToExcel() {
        //    var htmltable= document.getElementById('myTable');
        //    var html = htmltable.outerHTML;
        //    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        this.service.generateExcel(this.dateFrom, this.dateTo, this.machine, this.kanban);
    }
}