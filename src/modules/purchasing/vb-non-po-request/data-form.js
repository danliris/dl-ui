import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

var BankLoader = require('../../../loader/account-banks-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var BuyerLoader = require('../../../loader/buyers-loader');
var CurrencyLoader = require('../../../loader/currency-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedCurrency;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    controlOptionsLabel = {
        label: {
            length: 8
        },
        control: {
            length: 3
        }
    }

    controlOptionsDetail = {
        control: {
            length: 10
        }
    }

    ListCategory = ["", "SP1 - Spinning 1", "SP2 - Spinning 2", "SP3 - Spinning 3", "WV1 - Weaving 1", "WV2 - Weaving 2", "DP - Dyeing Printing", "UTL - Utility"
        , "UM - Umum", "K1A - Konfeksi 1A", "K1B - Konfeksi 1B", "K2A - Konfeksi 2A", "K2B - Konfeksi 2B", "K2C - Konfeksi 2C"];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (!this.data.Spinning1) {
            this.data.Spinning1 = false;
        }

        if (!this.data.Spinning2) {
            this.data.Spinning2 = false;
        }

        if (!this.data.Spinning3) {
            this.data.Spinning3 = false;
        }

        if (!this.data.Weaving1) {
            this.data.Weaving1 = false;
        }

        if (!this.data.Weaving2) {
            this.data.Weaving2 = false;
        }

        if (!this.data.Printing) {
            this.data.Printing = false;
        }

        if (!this.data.Finishing) {
            this.data.Finishing = false;
        }

        if (!this.data.Konfeksi1A) {
            this.data.Konfeksi1A = false;
        }

        if (!this.data.Konfeksi1B) {
            this.data.Konfeksi1B = false;
        }

        if (!this.data.Konfeksi2A) {
            this.data.Konfeksi2A = false;
        }

        if (!this.data.Konfeksi2B) {
            this.data.Konfeksi2B = false;
        }

        if (!this.data.Konfeksi2C) {
            this.data.Konfeksi2C = false;
        }

        if (!this.data.Umum) {
            this.data.Umum = false;
        }

        if (!this.data.Others) {
            this.data.Others = false;
            this.data.DetailOthers = "";
        }

    }

    // get bankLoader() {
    //     return BankLoader;
    // }

    // bankView = (bank) => {
    //     return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
    // }

    // get buyerLoader() {
    //     return BuyerLoader;
    // }

    get currencyLoader() {
        return CurrencyLoader;
    }

    selectedCurrencyChanged(newValue, oldValue) {
        this.data.Currency = newValue;
    }

    // buyerView = (buyer) => {
    //     return `${buyer.Code} / ${buyer.Name}`
    // }

}
