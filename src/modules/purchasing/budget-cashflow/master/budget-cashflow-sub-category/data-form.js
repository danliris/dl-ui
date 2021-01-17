import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const CashflowCategoryLoader = require("../../loader/cashflow-category-loader");


@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    }

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        console.log(this);

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    get cashflowCategoryLoader() {
        return CashflowCategoryLoader;
    }

    @bindable cashflowCategory;
    cashflowCategoryChanged(newVal, oldVal) {
        if (newVal) {
            this.data.CashflowCategoryId = newVal.Id;
        } else {
            this.data.CashflowCategoryId = 0;
        }
    }

    columns = [
        "Kategori"
    ]

    get addItems() {
        return (event) => {
            console.log(this.data.Items);
            this.data.Items.push({})
        };
    }
}
