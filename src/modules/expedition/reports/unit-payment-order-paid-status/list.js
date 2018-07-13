import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from './service';
const PurchasingDocumentExpeditionLoader = require('../../../../loader/purchasing-document-expedition-loader');
const SupplierLoader = require('../../../../loader/supplier-loader');
const DivisionLoader = require('../../../../loader/division-loader');

@inject(Service)
export class List {
    columns = [
        { field: 'UnitPaymentOrderNo', title: 'No.SPB' },
        {
            field: 'UPODate', title: 'Tanggal SPB', formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        {
            field: 'DueDate', title: 'Tanggal Jatuh Tempo', formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        { field: 'InvoiceNo', title: 'No Invoice' },
        { field: 'SupplierName', title: 'Supplier' },
        { field: 'DivisionName', title: 'Divisi' },
        { field: 'PaymentMethod', title: 'Cara Pembayaran' },
        { field: 'Status', title: 'Status', sortable: false },
        {
            field: 'DPP', title: 'DPP', sortable: false, formatter: function (value, data, index) {
                return numeral(value).format('0,000.0000');
            },
        },
        {
            field: 'IncomeTax', title: 'PPH', formatter: function (value, data, index) {
                return numeral(value).format('0,000.0000');
            },
        },
        {
            field: 'Vat', title: 'PPN', formatter: function (value, data, index) {
                return numeral(value).format('0,000.0000');
            },
        },
        {
            field: 'TotalPaid', title: 'Total Bayar ke Supplier', formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.0000') : '-';
            },
        },
        { field: 'Currency', title: 'Mata Uang' },
        {
            field: 'BankExpenditureNotePPHDate', title: 'Tanggal Bayar PPH', formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        { field: 'PPHBank', title: 'Bank Bayar PPH', sortable: false },
        {
            field: 'BankExpenditureNoteDate', title: 'Tanggal Bayar DPP+PPN', formatter: function (value, data, index) {
                return value ? moment(value).format('DD MMM YYYY') : '-';
            },
        },
        { field: 'Bank', title: 'Bank Bayar DPP+PPN', sortable: false },
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
    };

    constructor(service) {
        this.service = service;
        this.error = {};

        this.flag = false;
        this.selectSupplier = ['code', 'name'];
        this.selectDivision = ['code', 'name'];
        this.statusItems = ['', 'LUNAS', 'SUDAH BAYAR DPP+PPN', 'SUDAH BAYAR PPH', 'BELUM BAYAR'];
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order
        };

        if (this.purchasingDocumentExpedition) {
            arg.unitPaymentOrderNo = this.purchasingDocumentExpedition.UnitPaymentOrderNo;
        }

        if (this.supplier) {
            arg.supplierCode = this.supplier.code;
        }

        if (this.division) {
            arg.divisionCode = this.division.code;
        }

        if (this.status != '') {
            arg.status = this.status;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date' && this.dateTo && this.dateTo != 'Invalid Date') {
            arg.dateFrom = this.dateFrom;
            arg.dateTo = this.dateTo;

            arg.dateFrom = moment(arg.dateFrom).format("MM/DD/YYYY");
            arg.dateTo = moment(arg.dateTo).format("MM/DD/YYYY");
        }

        if (Object.getOwnPropertyNames(arg).length === 3) {
            arg.dateFrom = new Date();
            arg.dateFrom.setMonth(arg.dateFrom.getMonth() - 1);
            arg.dateTo = new Date();

            arg.dateFrom = moment(arg.dateFrom).format("MM/DD/YYYY");
            arg.dateTo = moment(arg.dateTo).format("MM/DD/YYYY");
        }

        return this.flag ? (
            this.service.search(arg)
                .then(result => {
                    return {
                        total: result.info.total,
                        data: result.data
                    };
                })
        ) : { total: 0, data: [] };
    }

    search() {
        if (this.dateFrom == 'Invalid Date')
            this.dateFrom = undefined;
        if (this.dateTo == 'Invalid Date')
            this.dateTo = undefined;

        if ((this.dateFrom && this.dateTo) || (!this.dateFrom && !this.dateTo)) {
            this.error = {};
            this.flag = true;
            this.tableList.refresh();
        }
        else {
            if (!this.dateFrom)
                this.error.dateFrom = "Tanggal Awal harus diisi";
            else if (!this.dateTo)
                this.error.dateTo = "Tanggal Akhir harus diisi";
        }
    }

    reset() {
        this.flag = false;
        this.purchasingDocumentExpedition = undefined;
        this.supplier = undefined;
        this.division = undefined;
        this.status = '';
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.tableList.refresh();
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get divisionLoader() {
        return DivisionLoader;
    }

    get purchasingDocumentExpeditionLoader() {
        return PurchasingDocumentExpeditionLoader;
    }
}
