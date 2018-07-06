import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import XLSX from 'xlsx';
import { Service, AzureService } from './service';
const BankExpenditureNoteLoader = require('../../../../loader/bank-expenditure-note-loader');
const PurchasingDocumentExpeditionLoader = require('../../../../loader/purchasing-document-expedition-loader');
const SupplierLoader = require('../../../../loader/supplier-loader');
const DivisionLoader = require('../../../../loader/division-loader');

@inject(Service, AzureService)
export class List {
    columns = [
        [
            { field: 'no', title: 'No. SPB', rowspan: 2, sortable: true },
            {
                field: 'date', title: 'Tgl SPB', formatter: function (value, data, index) {
                    return moment(value).format('DD MMM YYYY');
                },
                rowspan: 2,
                sortable: true,
            },
            {
                field: 'dueDate', title: 'Tgl Jatuh Tempo', formatter: function (value, data, index) {
                    return moment(value).format('DD MMM YYYY');
                },
                rowspan: 2,
                sortable: true,
            },
            { field: 'invoceNo', title: 'Nomor Invoice', rowspan: 2, sortable: true },
            { field: 'supplier.name', title: 'Supplier', rowspan: 2, sortable: true },
            { field: 'division.name', title: 'Divisi', rowspan: 2, sortable: true },
            {
                field: 'position', title: 'Posisi', formatter: (value, data, index) => {
                    let status = this.itemsStatus.find(p => p.value === value);
                    return status.text;
                },
                rowspan: 2,
                sortable: true,
            },
            {
                field: 'SendToVerificationDivisionDate', title: 'Tgl Pembelian Kirim', formatter: function (value, data, index) {
                    return value ? moment(value).format('DD MMM YYYY') : '-';
                },
                rowspan: 2,
            },
            { title: 'Verifikasi', colspan: 3 },
            { title: 'Kasir', colspan: 5 }
        ], [
            {
                field: 'VerificationDivisionDate', title: 'Tgl Terima', formatter: function (value, data, index) {
                    return value ? moment(value).format('DD MMM YYYY') : '-';
                },
            },
            {
                field: 'VerifyDate', title: 'Tgl Cek', formatter: function (value, data, index) {
                    return value ? moment(value).format('DD MMM YYYY') : '-';
                },
            },
            {
                field: 'SendDate', title: 'Tgl Kirim', formatter: function (value, data, index) {
                    return value ? moment(value).format('DD MMM YYYY') : '-';
                },
            },
            {
                field: 'CashierDivisionDate', title: 'Tgl Terima', formatter: function (value, data, index) {
                    return value ? moment(value).format('DD MMM YYYY') : '-';
                },
            },
            {
                field: 'BankExpenditureNoteDate', title: 'Tgl Bayar', formatter: function (value, data, index) {
                    return value ? moment(value).format('DD MMM YYYY') : '-';
                },
            },
            {
                field: 'BankExpenditureNoteNo', title: 'No Kuitansi'
            },
            {
                field: 'BankExpenditureNotePPHDate', title: 'Tgl Bayar PPH', formatter: function (value, data, index) {
                    return value ? moment(value).format('DD MMM YYYY') : '-';
                },
            },
            {
                field: 'BankExpenditureNotePPHNo', title: 'No Kuitansi PPH'
            },
        ]
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

    constructor(service, azureService) {
        this.service = service;
        this.azureService = azureService;

        this.flag = false;
        this.selectUPO = ['no'];
        this.selectSupplier = ['code', 'name'];
        this.divisionSelect = ['code', 'name'];
        this.paymentMethodItems = ['', 'CASH', 'KREDIT', 'DP (DOWN PAYMENT) + BP (BALANCE PAYMENT)', 'DP (DOWN PAYMENT) + TERMIN 1 + BP (BALANCE PAYMENT)', 'RETENSI'];
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let filter = {};

        if (this.pphBankExpenditureNote) {
            filter.no = this.pphBankExpenditureNote.No;
        }

        if (this.unitPaymentOrder) {
            filter.unitPaymentOrderNo = this.unitPaymentOrder.UnitPaymentOrderNo;
        }

        if (this.expedition) {
            filter.invoiceNo = this.expedition.InvoiceNo;
        }

        if (this.supplier) {
            filter.supplierCode = this.supplier.code;
        }

        if (this.division) {
            filter.divisionCode = this.division.code;
        }

        if (this.paymentMethod != '') {
            filter.paymentMethod = this.paymentMethod;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date' && this.dateTo && this.dateTo != 'Invalid Date') {
            filter.dateFrom = this.dateFrom;
            filter.dateTo = this.dateTo;
        }

        if (Object.getOwnPropertyNames(filter).length === 0) {
            filter.dateFrom = new Date();
            filter.dateFrom.setMonth(filter.dateFrom.getMonth() - 1);
            filter.dateTo = new Date();
        }

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            filter: JSON.stringify(filter),
            order: order,
            select: ['no', 'date', 'dueDate', 'invoceNo', 'supplier.name', 'division.name', 'position'],
        };

        return this.flag ? (
            this.service.search(arg)
                .then(result => {
                    let unitPaymentOrders = result.data.map(p => p.no);

                    return this.azureService.search({ unitPaymentOrders })
                        .then(response => {
                            let expeditions = response.data;

                            for (let d of result.data) {
                                let expedition = expeditions.find(p => p.UnitPaymentOrderNo == d.no);

                                if (expedition) {
                                    Object.assign(d, expedition);
                                }
                            }

                            return {
                                total: result.info.total,
                                data: result.data
                            }
                        });
                })
        ) : { total: 0, data: [] };
    }

    search() {
        this.flag = true;
        this.tableList.refresh();
    }

    reset() {
        this.flag = false;
        this.pphBankExpenditureNote = undefined;
        this.unitPaymentOrder = undefined;
        this.expedition = undefined;
        this.supplier = undefined;
        this.division = undefined;
        this.paymentMethod = '';
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

    get bankExpenditureNoteLoader() {
        return BankExpenditureNoteLoader;
    }

    get unitPaymentOrderLoader() {
        return (keyword, filter) => {
            return PPHBankExpenditureNoteLoader(keyword, filter)
                .then(response => {
                    let unitPaymentOrders = [];

                    for (let data of response) {
                        unitPaymentOrders.push(...data.Items);
                    }

                    return unitPaymentOrders;
                });
        };
    }

    get purchasingDocumentExpeditionLoader() {
        return PurchasingDocumentExpeditionLoader;
    }
}
