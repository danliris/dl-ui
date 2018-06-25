import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service, AzureService } from './service';
const SupplierLoader = require('../../../../loader/supplier-loader');
const DivisionLoader = require('../../../../loader/division-loader');
const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');

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
            { title: 'Kasir', colspan: 2 }
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
                field: 'BankExpenditureNoteNo', title: 'No Kuitansi'
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
        this.itemsStatus = [
            { text: '', value: 0 },
            { text: 'Bag. Pembelian', value: 1 },
            { text: 'Dikirim ke Bag. Verifikasi', value: 2 },
            { text: 'Bag. Verifikasi', value: 3 },
            { text: 'Dikirim ke Bag. Kasir', value: 4 },
            { text: 'Dikirim ke Bag. Keuangan', value: 5 },
            { text: 'Dikirim ke Bag. Pembelian', value: 6 },
            { text: 'Bag. Kasir', value: 7 },
            { text: 'Bag. Keuangan', value: 8 },
        ];

    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let filter = {};

        if (this.unitPaymentOrder) {
            filter.no = this.unitPaymentOrder.no;
        }

        if (this.supplier) {
            filter.supplierCode = this.supplier.code;
        }

        if (this.division) {
            filter.divisionCode = this.division.code;
        }

        if (this.status.value != 0) {
            filter.status = this.status.value;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date')
            filter.dateFrom = this.dateFrom;

        if (this.dateTo && this.dateTo != 'Invalid Date')
            filter.dateTo = this.dateTo;

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
        this.unitPaymentOrder = undefined;
        this.supplier = undefined;
        this.division = undefined;
        this.status = { value: 0 };
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

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }
}