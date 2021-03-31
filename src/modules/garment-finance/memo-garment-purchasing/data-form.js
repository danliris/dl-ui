import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
let GarmentCurrencyLoader = require('../../../loader/garment-currency-loader');
let AccountingBookLoader = require('../../../loader/accounting-book-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    detailColumns = [
        { header: "No Akun", value: "COA.No" },
        { header: "Nama Perkiraan", value: "COA.Name" },
        { header: "Debit", value: "DebitNominal" },
        { header: "Kredit", value: "CreditNominal" }
    ];

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    @bindable selectedGarmentCurrency;
    selectedGarmentCurrencyChanged(newValue) {
        if (newValue)
            this.data.Currency = newValue;
    }

    get garmentCurrencyLoader() {
        return GarmentCurrencyLoader;
    }

    garmentCurrencyView = (currency) => {
        return `${currency.code}`
    }

    @bindable selectedAccountingBook;
    selectedAccountingBookChanged(newValue) {
        if (newValue)
            this.data.AccountingBook = newValue;
    }

    get accountingBookLoader() {
        return AccountingBookLoader;
    }

    accountingBookView = (accountingBook) => {
        return `${accountingBook.Code} - ${accountingBook.Type}`
    }

    get addDetails() {
        return (event) => {
            // var newDetail=   {
            //     COA: {},
            //     DebitNominal: 0,
            //     CreditNominal: 0
            // };
            // this.data.memoGarmentPurchasingDetails.push(newDetail);
            this.data.memoGarmentPurchasingDetails.push({});
        };
    }

} 
