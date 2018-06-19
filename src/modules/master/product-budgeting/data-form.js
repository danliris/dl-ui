import { inject, bindable, computedFrom } from 'aurelia-framework';

var CurrencyLoader = require('../../../loader/currency-loader');
var UomLoader = require('../../../loader/uom-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable Currency;
    @bindable UOM;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    constructor() { }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }


    bind(context) {
        this.context = context;
        this.data = this.context.data;
        if (this.data.Id) {
            this.Currency = this.data.Currency;
            this.UOM = this.data.UOM;
        }

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    UOMChanged() {
        if (this.UOM) {
            this.data.UOM = this.UOM
        } else {
            this.UOM = {};
        }
    }

    CurrencyChanged() {
        if (this.Currency) {
            this.data.Currency = this.Currency;
        } else {
            this.Currency = {};
        }
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get uomLoader() {
        return UomLoader;
    }
}
