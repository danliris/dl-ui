import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';
let AccountingBookLoader = require('../../../loader/accounting-book-loader');
let MemoDetailLoader = require('../../../loader/purchasing-memo-detail-textile-loader');

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        this.hasPosting = this.context.hasPosting;
    }

    columns = [
        { header: "No. Akun", value: "COA" },
        { header: "Nama Perkiraan", value: "COA.name" },
        { header: "Debit", value: "Debit" },
        { header: "Kredit", value: "Credit" }
    ]

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    get accountingBookLoader() {
        return AccountingBookLoader;
    }

    get memoDetailLoader() {
        return MemoDetailLoader;
    }

    accountingBookView = (accountingBook) => {
        return `${accountingBook.Code} - ${accountingBook.Type}`
    }
}
