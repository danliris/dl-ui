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
    @bindable options = { useVat: false };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    ListCategory = ["", "SP1 - Spinning 1", "SP2 - Spinning 2", "SP3 - Spinning 3", "WV1 - Weaving 1", "WV2 - Weaving 2", "DP - Dyeing Printing", "UTL - Utility"
        , "UM - Umum", "K1A - Konfeksi 1A", "K1B - Konfeksi 1B", "K2A - Konfeksi 2A", "K2B - Konfeksi 2B", "K2C - Konfeksi 2C"];

    itemsColumns = [{ header: "Nomor PO", value: "purchaseRequest.no" },
    { header: "Unit", value: "Unit" }]

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    get addItems() {
        return (event) => {
            this.data.items.push({ purchaseRequest: { no: "" } })
        };
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    @bindable selectedCurrency;
    selectedCurrencyChanged(newValue, oldValue) {
        this.data.Currency = newValue;
    }
}
