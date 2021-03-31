import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
let GarmentCurrencyLoader = require('../../../loader/garment-currency-loader-camelcase');
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

        // if(this.data.AccountingBook)
        //     this.selectedGarmentCurrency = this.data.AccountingBook;
        // if(this.data.Currency)
        //     this.selectedGarmentCurrency = this.data.Currency;
    }

    // @bindable selectedGarmentCurrency;
    // selectedGarmentCurrencyChanged(newValue) {
    //     if (newValue)
    //         this.data.Currency = newValue;
    // }

    get currencyLoader() {
        return GarmentCurrencyLoader;
    }

    // currencyView = (currency) => {
    //     return `${currency.Code}`
    // }

    // @bindable selectedAccountingBook;
    // selectedAccountingBookChanged(newValue) {
    //     if (newValue)
    //         this.data.AccountingBook = newValue;
    // }

    get accountingBookLoader() {
        return AccountingBookLoader;
    }

    accountingBookView = (accountingBook) => {
        return `${accountingBook.Code} - ${accountingBook.Type}`
    }

    get addDetails() {
        return (event) => {
            var newDetail=   {
                COA: {},
                DebitNominal: 0,
                CreditNominal: 0
            };
            this.data.MemoGarmentPurchasingDetails.push(newDetail);
        };
    }

} 
