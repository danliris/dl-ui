import { inject, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

let YearLoader = require('../../../loader/garment-master-plan-weekly-plan-year-loader');
var WeekLoader = require('../../../loader/garment-master-plan-weekly-plan-by-year-loader');

import "bootstrap-table";
import "bootstrap-table/dist/bootstrap-table.css";
import "bootstrap-table/dist/locale/bootstrap-table-id-ID.js";

import "../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns";
import "../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns.css";

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    controlOptions = {
        label: {
        length: 4
        },
        control: {
        length: 5
        }
    }


    get yearLoader() {
        return YearLoader;
    }
    yearView = (year) => {
        return `${year.year}`
    }
    get weekLoader() {
        return WeekLoader;
    }
    
    weekView = (week) => {
        var returnData = "";
        if (week.WeekNumber) {
        var endDate = moment(week.EndDate).format("DD MMM YYYY");
        var startDate = moment(week.StartDate).format("DD MMM YYYY");
        returnData = `W${week.WeekNumber} - ${startDate} s/d ${endDate}`;
        }
        return returnData;
    }

    @computedFrom("year")
    get filterWeek() {
        if (this.year) {
        this.week = "";
        return { "Year": this.year.year }
        }
        else {
        return { "Year": "" }
        }
    }

    args = { page: 1, size: 25 };

    search() {
        this.args.page = 1;
        this.args.total = 0;
        this.searching();
    }

    async searching() {
        this.data=[];
        var locale = 'id-ID';
        if (!this.year) {
        alert("Tahun Harus Diisi");
        }
        else {
        let info = {
            year: this.year.year
        }
        if (this.week) {
            info.week = this.week.WeekNumber
        }
        
        let yr = {
            Year:this.year.year
        };
      
      
    this.service.search(JSON.stringify(info))
        .then(result => {
        this.data = result;
        var temp = [];
                var count = 0;
                for (var item of this.data) {
                    if (!temp[item.bookingOrderNo]) {
                        count = 1;
                        temp[item.bookingOrderNo] = count;
                    }
                    else {
                        count++;
                        temp[item.bookingOrderNo] = count;
                        item.bookingOrderNo = null;
                    }
                }

                for (var item of this.data) {
                    if (item.bookingOrderNo != null) {
                        item.row_count = temp[item.bookingOrderNo];
                    }
                   // item.confirmQuantity=item.confirmQuantity==0? "" : item.confirmQuantity;
                    //item.confirmDeliveryDate =  moment(item.confirmDeliveryDate).locale(locale).format("DD MMMM YYYY")=="01 Januari 0001" ? "": moment(item.confirmDeliveryDate).locale(locale).format("DD MMMM YYYY");
                    item.bookingOrderDate = moment(item.bookingOrderDate).locale(locale).format("DD MMMM YYYY");
                    item.deliveryDate =moment(item.deliveryDate).locale(locale).format("DD MMMM YYYY");
                    item.workingDeliveryDate = moment(item.workingDeliveryDate).locale(locale).format("DD MMMM YYYY");
                }
                this.fillTable();
            });
        }
    }

    fillTable() {

        const columns = [
            { field: 'bookingOrderNo', title: 'No. Booking Order' },
            { field: 'bookingOrderDate', title: 'Tgl Booking'  },
            { field: 'buyer', title: 'Buyer' },
            { field: 'orderQuantity', title: 'Jumlah<br>Order<br>(Booking)' },
            { field: 'confirmQty', title: 'Jumlah<br>Confirm' },
            { field: 'deliveryDate', title: 'Tgl Pengiriman<br>(Booking)'},
            //{ title: 'Detail Confirm', colspan:3 },
            // { field: 'confirmComodity', title: 'Komoditi' },
            // { field: 'confirmQuantity', title: 'Jumlah<br>Confirm' },
            // { field: 'confirmDeliveryDate', title: 'Tgl Pengiriman(Booking)' },
            //{ title: 'Jadwal Pengerjaan', colspan:9 },
            { field: 'workingComodity', title: 'Komoditi' },
            { field: 'smv', title: 'SMV' },
            { field: 'unit', title: 'Unit' },
            { field: 'year', title: 'Tahun' },
            { field: 'week', title: 'Week<br>(Pengerjaan)' },
            { field: 'quantity', title: 'Jumlah' },
            { field: 'remark', title: 'Ket' },
            { field: 'workingDeliveryDate', title: 'Tgl Pengiriman<br>(Pengerjaan)' },
            { field: 'status', title: 'Status<br/>Confirm' }
        ];

        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data,
        };

        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        for (const rowIndex in this.data) {
            if(this.data[rowIndex].bookingOrderNo) {
                var rowSpan=this.data[rowIndex].row_count;
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "bookingOrderNo", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "bookingOrderDate", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "buyer", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "orderQuantity", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "deliveryDate", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "confirmQty", rowspan: rowSpan, colspan: 1 });
                // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "confirmComodity", rowspan: rowSpan, colspan: 1 });
                // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "confirmQuantity", rowspan: rowSpan, colspan: 1 });
                // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "confirmDeliveryDate", rowspan: rowSpan, colspan: 1 });
            }
        }

        // console.log(this.data)
        // var bootstrapTableOptions = {
        //     undefinedText: '',
        // };
        // bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;

        // $(this.table).bootstrapTable({ data: this.data });
        // $(this.table).bootstrapTable('refreshOptions', bootstrapTableOptions);

        // let mergedRows = [];
        // for (const rowIndex in this.data) {
        //     if (this.data[rowIndex] && this.data[rowIndex].bookingOrderNo) {
        //         mergedRows.push({
        //             rowIndex: rowIndex,
        //             rowSpan: 1
        //         });
        //     }
        //     else {
        //         mergedRows[mergedRows.length - 1].rowSpan += 1;
        //     }
        // }

        // for (const mergedRow of mergedRows) {
        //     $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "bookingOrderNo", rowspan: mergedRow.rowSpan, colspan: 1 });
        //     $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "bookingOrderDate", rowspan: mergedRow.rowSpan, colspan: 1 });
        //     $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "buyer", rowspan: mergedRow.rowSpan, colspan: 1 });
        //     $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "orderQuantity", rowspan: mergedRow.rowSpan, colspan: 1 });
        //     $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "deliveryDate", rowspan: mergedRow.rowSpan, colspan: 1 });
        //     $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "confirmComodity", rowspan: mergedRow.rowSpan, colspan: 1 });
        //     $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "confirmQuantity", rowspan: mergedRow.rowSpan, colspan: 1 });
        //     $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "confirmDeliveryDate", rowspan: mergedRow.rowSpan, colspan: 1 });
        // }
    }

    changePage(e) {
        var page = e.detail;
        this.args.page = page;
        this.searching();
    }

    ExportToExcel() {
        if (!this.year) {
        alert("Tahun Harus Diisi");
        }
        else {
        let info = {
            year: this.year.year
        }
        if (this.week) {
            info.week = this.week.WeekNumber
        }
        this.service.generateExcel(JSON.stringify(info));
        }
    }

    reset() {
        this.year = "";
        this.week = "";
    }
}
