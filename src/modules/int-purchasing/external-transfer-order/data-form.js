import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

var DivisionLoader = require('../../../loader/division-loader');
var CurrencyLoader = require('../../../loader/currency-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable title;
    @bindable selectedDivision;
    @bindable selectedCurrency;

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    externalTransferOrderItemsColumns = [
        "Nomor Transfer Request",
    ];

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.readOnly) {
            this.externalTransferOrderItemsColumns.push("");
        }

        if (this.data) {
            this.selectedDivision = this.data.Division;
        }

        if (!this.selectedCurrency) {
            this.selectedCurrency = await this.service.getCurrency("IDR");
        }

    }

    get divisionLoader() {
        return DivisionLoader;
    }
    divisionView = (division) => {
        return `${division.code} - ${division.name}`
    }
    selectedDivisionChanged(newValue) {
        if (newValue) {
            this.data.Division = newValue;
            this.data.DivisionId = newValue._id;
        }
    }

    currencyView = (currency) => {
        return `${currency.code} - ${currency.description}`
    }
    selectedCurrencyChanged(newValue) {
        if (newValue) {
            this.data.Currency = newValue;
            this.data.CurrencyId = newValue._id;
        }
    }

    get addExternalTransferOrderItems() {
        return () => {
            this.data.ExternalTransferOrderItems.push({});
        }
    };

}