import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
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

    getExcelData() {
        let info = {
            offset: this.page * 50,
            limit: 50,
        };

        this.loader(info)
            .then(response => {
                this.excelData.push(...response.data);

                if (this.excelData.length !== response.total) {
                    this.page++;
                    this.getExcelData();
                }
                else {
                    let wsData = [];

                    for (let data of this.excelData) {
                        wsData.push({
                            'No. SPB': data.UnitPaymentOrderNo,
                            'Tanggal SPB': moment(data.UPODate).format('DD MMM YYYY'),
                            'Tanggal Jatuh Tempo': moment(data.DueDate).format('DD MMM YYYY'),
                            'No Invoice': data.InvoiceNo,
                            'Supplier': data.SupplierName,
                            'Divisi': data.DivisionName,
                            'Cara Pembayaran': data.PaymentMethod,
                            'Status': data.Status,
                            'DPP': data.DPP ? numeral(data.DPP).format('0,000.0000') : '-',
                            'PPH': data.IncomeTax ? numeral(data.IncomeTax).format('0,000.0000') : '-',
                            'PPN': data.VAT ? numeral(data.VAT).format('0,000.0000') : '-',
                            'TotalPaid': data.TotalPaid ? numeral(data.TotalPaid).format('0,000.0000') : '-',
                            'Mata Uang': data.Currency,
                            'Tanggal Bayar PPH': data.BankExpenditureNotePPHDate ? moment(data.BankExpenditureNotePPHDate).format('DD MMM YYYY') : '-',
                            'Bank Bayar PPH': data.PPHBank ? data.PPHBank : '-',
                            'Tanggal Bayar DPP+PPN': data.BankExpenditureNoteDate ? moment(data.BankExpenditureNoteDate).format('DD MMM YYYY') : '-',
                            'Bank Bayar DPP+PPN': data.Bank ? data.Bank : '-',
                        });
                    }

                    let wb = XLSX.utils.book_new();
                    wb.Props = {
                        Title: 'Report',
                        Subject: 'Dan Liris',
                        Author: 'Dan Liris',
                        CreatedDate: new Date()
                    };
                    wb.SheetNames.push('Laporan SPB');

                    let ws = XLSX.utils.json_to_sheet(wsData);
                    wb.Sheets['Laporan SPB'] = ws;

                    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
                    let buf = new ArrayBuffer(wbout.length);
                    let view = new Uint8Array(buf);
                    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;

                    let fileSaver = require('file-saver');
                    fileSaver.saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'Laporan SPB.xlsx');
                }
            });
    }

    excel() {
        this.flag = true;

        this.page = 0;
        this.excelData = [];
        this.getExcelData();
    }

    reset() {
        this.flag = false;
        this.error = {};
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
