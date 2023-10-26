import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
var moment = require("moment");
import numeral from "numeral";

@inject(Service)
export class List {
    itemYears = [];
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.error = {};
        this.itemMonths = [
            { text: "January", value: 1 },
            { text: "February", value: 2 },
            { text: "March", value: 3 },
            { text: "April", value: 4 },
            { text: "May", value: 5 },
            { text: "June", value: 6 },
            { text: "July", value: 7 },
            { text: "August", value: 8 },
            { text: "September", value: 9 },
            { text: "October", value: 10 },
            { text: "November", value: 11 },
            { text: "Desember", value: 12 },
        ];
        this.currentYear = moment().format("YYYY");
    
        this.month = { text: "January", value: 1 };
        this.year = this.currentYear;
    
        for (var i = parseInt(this.currentYear); i >= 2018; i--) {
        this.itemYears.push(i.toString());
        }
    }
    
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    activate() {
       
    }

    async searching() {
        this.data=[];
        var order = {};
        let args = {
            order: order,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""           
        };
        this.service.search(args)
        .then(result => {
            this.data = result.data;

            this.fillTable();
        });
        
    }

    fillTable() {
        const columns = [
            { field: "AccountName", title: "Nama Perkiraan", sortable: false}  ,
            { field: "AccountNo", title: "No Akun", sortable: false},
            { field: "Debit", title: "Debet", sortable: false, align: "right"},
            { field: "Credit", title: "Kredit", sortable: false, align: "right"},
        ];
        for(var _data of this.data){
            _data.Debit=_data.Debit>0 ? numeral(_data.Debit).format("0,000.00") : "";
            _data.Credit=_data.Credit>0 ? numeral(_data.Credit).format("0,000.00") : "";
        }
        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data,
            rowStyle:this.rowFormatter
        };

        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

    }

    ExportToExcel() {
        if (!this.dateFrom) {
            alert("Tanggal Mulai Harus Diisi");
        }
        else if(!this.dateTo){
            alert("Tanggal Akhir Harus Diisi");
        }

        let args = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        };
        this.service.generateExcel(args);
    }

    ExportDetailToExcel() {
        if (!this.dateFrom) {
            alert("Tanggal Mulai Harus Diisi");
        }
        else if(!this.dateTo){
            alert("Tanggal Akhir Harus Diisi");
        }
        let args = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        };
        this.service.generateDetailExcel(args);
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.error = {};

        this.flag = false;
        this.table.refresh();
    }

    search() {
        if (!this.dateFrom) {
            alert("Tanggal Mulai Harus Diisi");
        }
        else if(!this.dateTo){
            alert("Tanggal Akhir Harus Diisi");
        }

        this.searching();
    }
}