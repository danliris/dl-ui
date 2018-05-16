import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from './service';
const SupplierLoader = require('../../../../loader/supplier-loader');
const DivisionLoader = require('../../../../loader/division-loader');
const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');

@inject(Service)
export class List {
    columns = [
        { field: 'no', title: 'No. SPB' },
        {
            field: 'date', title: 'Tanggal SPB', formatter: function (value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        {
            field: 'dueDate', title: 'Tanggal Jatuh Tempo', formatter: function (value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        { field: 'supplier.name', title: 'Supplier' },
        { field: 'division.name', title: 'Divisi' },
        {
            field: 'position', title: 'Posisi', formatter: (value, data, index) => {
                let status = this.itemsStatus.find(p => p.value === value);
                return status.text;
            },
        },
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
            select: ['no', 'date', 'dueDate', 'supplier.name', 'division.name', 'position'],
        };

        return this.flag ? (
            this.service.search(arg)
                .then(result => {
                    return {
                        total: result.info.total,
                        data: result.data
                    }
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