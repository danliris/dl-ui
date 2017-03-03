import {inject, bindable, computedFrom} from 'aurelia-framework';

var CurrencyLoader = require('../../../loader/currency-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor() { }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    activate() { }

    attached() {
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

    // bind() {
    //     if (this.data && this.data.uom)
    //         this.data.uom.toString = function () {
    //             return this.unit;
    //         };
    // }

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

}
