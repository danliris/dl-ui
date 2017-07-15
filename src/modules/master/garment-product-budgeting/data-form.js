import {inject, bindable, computedFrom} from 'aurelia-framework';

var CurrencyLoader = require('../../../loader/currency-loader');
var UomLoader = require('../../../loader/uom-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable const;
    @bindable yarn;
    @bindable width;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    constructor() { }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    

    bind(context) {
    this.context = context;
    this.data = this.context.data;
    if (this.data && this.data.uom)
            this.data.uom.toString = function () {
                return this.unit;
            };
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    }

    uomChanged(e) {
        var selectedUom = e.detail;
        if (selectedUom)
            this.data.uomId = selectedUom._id;
    }

    currencyChanged(e) {
        var selectedCurrency = e.detail || {};
        if (selectedCurrency) {
          this.data.currency = selectedCurrency._id ? selectedCurrency._id : "";
        }
    }

    get currencyLoader() {
      return CurrencyLoader;
    }

    get uomLoader() {
      return UomLoader;
    }
}
