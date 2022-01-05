import { inject, bindable } from 'aurelia-framework';
import {Service,CoreService} from "./service";
import moment from 'moment';
import "bootstrap-table";
import "bootstrap-table/dist/bootstrap-table.css";
import "bootstrap-table/dist/locale/bootstrap-table-id-ID.js";

import "../../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns";
import "../../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns.css";

@inject(Service, CoreService)
export class List {
    @bindable selectedUnit;

    constructor(service,coreService) {
        this.service = service;
        this.coreService = coreService;
    }
    controlOptions = {
        label: {
        length: 4
        },
        control: {
        length: 5
        }
    }
    search() {
        this.args.page = 1;
        this.args.total = 0;
        this.searching();
    }
   async bind(context) {
        this.context = context;
      
    }
    searching() {
        var info = {
           
            receivedDateFrom : this.receivedDateFrom ? moment(this.receivedDateFrom).format("YYYY-MM-DD") : "",
            receivedDateTo : this.receivedDateTo ? moment(this.receivedDateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data = result.data;
                console.log(result)
                var temp = [];
                this.args.total = result.info.total;
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
        fillTable() {
            const columns =[
            [
                {
                    field: "sampleRequestNo", rowspan: "2", title: "No.<br/>No Surat Sample<br/>Order",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "roNoSample", rowspan: "2", title: "RO Sample<br/>",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "sampleCategory", rowspan: "2", title: "Kategori<br/>Sample",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "sampleType", rowspan: "2", title: "Jenis<br/>Sample",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "buyer", rowspan: "2", title: "Buyer<br/>",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "style", rowspan: "2", title: "Article<br/>",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "color", rowspan: "2", title: "Color<br/>",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "sizeName", rowspan: "2", title: "Size<br/>",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "sizeDescription", rowspan: "2", title: "Keterangan<br/>Size",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "quantity", rowspan: "2", title: "Quantity<br/>",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "sentDate", rowspan: "2", title: "Tgl<br/>Shipment",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "receivedDate", rowspan: "2", title: "Tgl Terima<br/>Surat Sample",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "garmentSectionName", rowspan: "2", title: "MD<br/>",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                {
                    field: "sampleRequestDate", rowspan: "2", title: "Tgl Pembuatan<br/>Surat Sample",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent" } };
                    },
                },
                
            ]];
    
            var bootstrapTableOptions = {
                undefinedText: '',
                columns: columns,
                data: this.data,
                rowStyle:this.rowFormatter
            };
    
            bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
            $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
            for (const rowIndex in this.data) {
                if(this.data[rowIndex].bookingOrderNo) {
                    var rowSpan=this.data[rowIndex].row_count;
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sampleRequestNo", rowspan: rowSpan, colspan: 1, rowFormatter:"red" });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "roNoSample", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sampleCategory", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sampleType", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "buyer", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sentDate", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "receivedDate", rowspan: rowSpan, colspan: 1 });
                     $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "garmentSectionName", rowspan: rowSpan, colspan: 1 });
                     $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sampleRequestDate", rowspan: rowSpan, colspan: 1 });
                }
            }
    
        }
    
        changePage(e) {
            var page = e.detail;
            this.args.page = page;
            this.searching();
        }
    
    
    ExportToExcel() {
        var info = {
           
            receivedDateFrom : this.receivedDateFrom ? moment(this.receivedDateFrom).format("YYYY-MM-DD") : "",
            receivedDateTo : this.receivedDateTo ? moment(this.receivedDateTo).format("YYYY-MM-DD") : ""
      
        }
        this.service.generateExcel(info);
    }

     
    reset() {
        this.receivedDateFrom = null;
        this.receivedDateTo = null;
         
    }
  
    
}