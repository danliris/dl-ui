import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';
const SupplierLoader = require('../../../../loader/supplier-loader');

@inject(Service)
export class List {
    itemYears = [];
    columns = [
        {
            field: 'Date', title: 'Tanggal', formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        { field: 'COAName', title: 'Nama Akun' },
        { field: 'COACode', title: 'No Akun' },
        { field: 'Remark', title: 'Keterangan' },
        {
            field: 'Debit', title: 'Debit', formatter: function (value, data, index) {
                return value ? numeral(value).format('0,0.0000') : '0';
            }
        },
        {
            field: 'Credit', title: 'Kredit', formatter: function (value, data, index) {
                return value ? numeral(value).format('0,0.0000') : '0';
            }
        }
    ];

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        showColumns: false,
        search: false,
        showToggle: false,
        sortable: false
    };

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};
        this.data = [];

        this.itemMonths = [
            { text: 'January', value: 1 },
            { text: 'February', value: 2 },
            { text: 'March', value: 3 },
            { text: 'April', value: 4 },
            { text: 'May', value: 5 },
            { text: 'June', value: 6 },
            { text: 'July', value: 7 },
            { text: 'August', value: 8 },
            { text: 'September', value: 9 },
            { text: 'October', value: 10 },
            { text: 'November', value: 11 },
            { text: 'Desember', value: 12 }
        ];
        this.currentYear = moment().format('YYYY');

        for (var i = parseInt(this.currentYear); i >= 2018; i--) {
            this.itemYears.push(i.toString());
        }
    }


    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit
        };

        if (this.info.month.value)
            arg.month = this.info.month.value;

        if (this.info.year)
            arg.year = this.info.year;

        return this.flag ? (
            this.service.search(arg)
                .then((result) => {

                    return {
                        total: result.info.Count,
                        data: result.data
                    };
                })
        ) : { total: 0, data: [] };
    }

    search() {
        this.error = {};
        this.flag = true;
        this.tableList.refresh();
    }

    excel() {

        // this.flag = true;
        // this.tableList.refresh();

        let params = {
            supplierName: this.info.supplierName,
            month: this.info.month.value,
            year: this.info.year,
        }

        this.service.getXls(params)

        // this.getExcelData();
    }

    reset() {
        this.flag = false;
        this.info.supplier = undefined;
        this.error = {};
        this.info.year = moment().format("YYYY");
        this.info.month = { text: 'January', value: 1 };
        this.tableList.refresh();
    }

}
