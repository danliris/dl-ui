import { inject, bindable, computedFrom } from 'aurelia-framework';

var CurrencyLoader = require('../../../loader/currency-loader');
var UomLoader = require('../../../loader/uom-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable Currency;

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

        this.Currency = this.data.Currency ? this.data.Currency = { symbol: this.data.Currency.Symbol, code: this.data.Currency.Code, _id: this.data.Currency.Id } : {};
        this.data.Uom = this.data.UOM ? this.data.UOM : {};

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    uomChanged(e) {
        var selectedUom = e.detail;
        if (selectedUom)
            this.data.Uom = selectedUom;
    }

    CurrencyChanged() {
        if (this.Currency) {
            this.data.Currency = {
                Id: this.Currency._id,
                Code: this.Currency.code
            }
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
