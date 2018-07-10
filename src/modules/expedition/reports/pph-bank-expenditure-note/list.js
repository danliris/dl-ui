import { inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from './service';
const PPHBankExpenditureNoteLoader = require('../../../../loader/pph-bank-expenditure-note-loader');
const PurchasingDocumentExpeditionLoader = require('../../../../loader/purchasing-document-expedition-loader');
const SupplierLoader = require('../../../../loader/supplier-loader');
const DivisionLoader = require('../../../../loader/division-loader');

@inject(Service)
export class List {
    columns = [
        { field: 'No', title: 'No Bukti Pengeluaran Bank' },
        {
            field: 'Date', title: 'Tgl Bayar PPH', formatter: function (value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        {
            field: 'DPP', title: 'DPP', formatter: function (value, data, index) {
                return numeral(value).format('0,000.0000');
            },
        },
        {
            field: 'IncomeTax', title: 'PPH', formatter: function (value, data, index) {
                return numeral(value).format('0,000.0000');
            },
        },
        { field: 'Currency', title: 'Mata Uang' },
        { field: 'Bank', title: 'Bank Bayar PPH' },
        { field: 'SPBSupplier', title: 'No SPB / Supplier' },
        { field: 'InvoiceNo', title: 'No Invoice' },
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
        this.paymentMethodItems = ['', 'CASH', 'KREDIT', 'DP (DOWN PAYMENT) + BP (BALANCE PAYMENT)', 'DP (DOWN PAYMENT) + TERMIN 1 + BP (BALANCE PAYMENT)', 'RETENSI'];
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            select: ['no', 'date', 'dueDate', 'invoceNo', 'supplier.name', 'division.name', 'position'],
        };

        if (this.pphBankExpenditureNote) {
            arg.no = this.pphBankExpenditureNote.No;
        }

        if (this.unitPaymentOrder) {
            arg.unitPaymentOrderNo = this.unitPaymentOrder.UnitPaymentOrderNo;
        }

        if (this.expedition) {
            arg.invoiceNo = this.expedition.InvoiceNo;
        }

        if (this.supplier) {
            arg.supplierCode = this.supplier.code;
        }

        if (this.division) {
            arg.divisionCode = this.division.code;
        }

        if (this.paymentMethod != '') {
            arg.paymentMethod = this.paymentMethod;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date' && this.dateTo && this.dateTo != 'Invalid Date') {
            arg.dateFrom = this.dateFrom;
            arg.dateTo = this.dateTo;
        }

        if (Object.getOwnPropertyNames(arg).length === 4) {
            arg.dateFrom = new Date();
            arg.dateFrom.setMonth(arg.dateFrom.getMonth() - 1);
            arg.dateTo = new Date();
        }

        return this.flag ? (
            this.service.search(arg)
                .then(result => {
                    let arr = [], before, obj;

                    for (let datum of result.data) {
                        if (datum.No != before) {
                            obj = new Object(datum);
                            obj.InvoiceNo = `- ${obj.InvoiceNo}`;
                            obj.SPBSupplier = `- ${obj.SPBSupplier}`;
                            arr.push(obj);
                        }
                        else {
                            obj.InvoiceNo += `<br>- ${datum.InvoiceNo}`;
                            obj.SPBSupplier += `<br>- ${datum.SPBSupplier}`;
                        }

                        before = datum.No;
                    }

                    return {
                        total: result.info.total,
                        data: arr
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

    get pphBankExpenditureNoteLoader() {
        return PPHBankExpenditureNoteLoader;
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
