import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service } from './service';
const BuyerLoader = require('../../../../loader/buyers-loader');

@inject(Service)
export class List {
    paymentMethodList = ["", "LUNAS", "BELUM LUNAS"];
    isPaidFilter = { IsPaid: true };

    columns = [
        { field: 'SalesReceiptNo', title: 'No Faktur Jual' },
        { field: 'Tempo', title: 'Tempo (Hari)' },
        {
            field: 'Price', title: 'Total Harga', formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.0000') : '';
            },
        },
        {
            field: 'TotalPayment', title: 'Sisa Pembayaran', formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.0000') : '';
            },
        },
        {
            field: 'TotalPaid', title: 'Akumulasi', formatter: function (value, data, index) {
                return value ? numeral(value).format('0,000.0000') : '';
            },
        },
        { field: 'IsPaidOff', title: 'Keterangan' }
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
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            select: [],
        };

        if (this.info.buyer)
            arg.buyerName = this.info.buyer.Name;
        if (this.info.status)
            arg.status = this.info.status;
        if ((this.info.dateFrom && this.info.dateFrom != 'Invalid Date') || (this.info.dateTo && this.info.dateTo != 'Invalid Date')) {
            arg.dateFrom = this.info.dateFrom && this.info.dateFrom != 'Invalid Date' ? this.info.dateFrom : '';
            arg.dateTo = this.info.dateTo && this.info.dateTo != 'Invalid Date' ? this.info.dateTo : '';

            if (!arg.dateFrom) {
                arg.dateFrom = new Date(arg.dateTo);
                arg.dateFrom.setMonth(arg.dateFrom.getMonth() - 1);
            }

            if (!arg.dateTo) {
                arg.dateTo = new Date(arg.dateFrom);
                arg.dateTo.setMonth(arg.dateTo.getMonth() + 1);
            }

            arg.dateFrom = moment(arg.dateFrom).format("MM/DD/YYYY");
            arg.dateTo = moment(arg.dateTo).format("MM/DD/YYYY");
        } else {
            arg.dateFrom = new Date();
            arg.dateFrom.setMonth(arg.dateFrom.getMonth() - 1);
            arg.dateTo = new Date();

            arg.dateFrom = moment(arg.dateFrom).format("MM/DD/YYYY");
            arg.dateTo = moment(arg.dateTo).format("MM/DD/YYYY");
        }

        return this.flag ? (
            this.service.search(arg)
                .then((result) => {

                    let before = {};

                    for (let i in result.data) {
                        if (result.data[i].Buyer != before.Buyer) {
                            before = result.data[i];
                            before._SalesReceiptNo_rowspan = 1;
                            before._Tempo_rowspan = 1;
                            before._Price_rowspan = 1;
                            before._TotalPayment_rowspan = 1;
                            before._TotalPaid_rowspan = 1;
                            before._Status_rowspan = 1;
                        } else {
                            before._SalesReceiptNo_rowspan++;
                            before._Tempo_rowspan++;
                            before._Price_rowspan++;
                            before._TotalPayment_rowspan++;
                            before._TotalPaid_rowspan++;
                            before._Status_rowspan++;

                            before.Price += result.data[i].Price;
                            before.TotalPayment += result.data[i].TotalPayment;
                            before.TotalPaid += result.data[i].TotalPaid;

                            result.data[i].SalesReceiptNo = undefined;
                            result.data[i].Tempo = undefined;
                            result.data[i].Price = undefined;
                            result.data[i].TotalPayment = undefined;
                            result.data[i].TotalPaid = undefined;
                            result.data[i].Status = undefined;
                        }
                    }

                    setTimeout(() => {
                        $('#sales-receipt-table td').each(function () {
                            if ($(this).html() === '-')
                                $(this).hide();
                        })
                    }, 10);

                    return {
                        total: result.info.total,
                        data: result.data
                    };
                })
        ) : { total: 0, data: [] };
    }

    search() {
        if (this.info.dateFrom == 'Invalid Date')
            this.info.dateFrom = undefined;
        if (this.info.dateTo == 'Invalid Date')
            this.info.dateTo = undefined;

        if ((this.info.dateFrom && this.info.dateTo) || (!this.info.dateFrom && !this.info.dateTo)) {
            this.error = {};
            this.flag = true;
            this.tableList.refresh();
        } else {
            // console.log(this.info.dateFrom);
            // console.log(this.info.dateTo);
            if (!this.info.dateFrom)
                this.error.dateFrom = "Tanggal Awal harus diisi";
            if (!this.info.dateTo)
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
                            'No Faktur Jual': data.SalesReceiptNo,
                            'Tempo (Hari)': data.Tempo,
                            'Total Harga': data.Price ? numeral(data.DPP).format('0,000.0000') : '-',
                            'Sisa Pembayaran': data.TotalPayment ? numeral(data.VAT).format('0,000.0000') : '-',
                            'Akumulasi': data.TotalPaid ? numeral(data.TotalPaid).format('0,000.0000') : '-',
                            'Lunas': data.Status,
                        });
                    }

                    let wb = XLSX.utils.book_new();
                    wb.Props = {
                        Title: 'Report',
                        Subject: 'Dan Liris',
                        Author: 'Dan Liris',
                        CreatedDate: new Date()
                    };
                    wb.SheetNames.push('Laporan DPP PPN');

                    let ws = XLSX.utils.json_to_sheet(wsData);
                    wb.Sheets['Laporan DPP PPN'] = ws;

                    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
                    let buf = new ArrayBuffer(wbout.length);
                    let view = new Uint8Array(buf);
                    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;

                    let fileSaver = require('file-saver');
                    fileSaver.saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'Laporan DPP PPN.xlsx');
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
        this.info.buyer = undefined;
        this.info.status = "";
        this.info.dateFrom = undefined;
        this.info.dateTo = undefined;
        this.error.dateFrom = undefined;
        this.error.dateTo = undefined;
        this.tableList.refresh();
    }

    get buyerLoader() {
        return BuyerLoader;
    }
}
