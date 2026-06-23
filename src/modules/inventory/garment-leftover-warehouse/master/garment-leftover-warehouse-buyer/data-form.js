import { inject, bindable, computedFrom } from 'aurelia-framework';
var TOPLoader = require('../../../../../loader/term-of-payments-new-loader');
var CountryLoader = require('../../../../../loader/country-loader');
var CurrencyLoader = require('../../../../../loader/currency-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable top;
    @bindable country;
    KaberTypes = ['KABER', 'NON KABER']

    CustomerGroupD365 = ['TP:Ekspor','TP:Lokal', 'TPR:Lokal']

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.TermOfPaymentD365) {
            this.top = {
                Code: this.data.TermOfPaymentD365,
                Days: this.data.Tempo,
            };
        }

        if (this.data.CountryName) {
            this.country = {
                Code: this.data.CountryCode,
                Name: this.data.CountryName
            };
        }

        if (this.data.CurrencyCode) {
            this.currency = {
                Code: this.data.CurrencyCode,
                Id: this.data.CurrencyId
            };
        }
    }

    get topLoader() {
            return TOPLoader;
        }
    
    topLoaderView = (item) => {
        return [item.Code, item.Description]
            .filter(value => value !== undefined && value !== null && value.toString().trim().length > 0)
            .join(" - ");
    }
    
    topChanged(newValue, oldValue) {
        var selectedTop = newValue;
        if (selectedTop) {
            this.data.TermOfPaymentD365 = selectedTop.Code;
            this.data.Tempo = selectedTop.Days;
        }
    }

    get countryLoader() {
            return CountryLoader;
        }
    
    countryLoaderView = (item) => {
        return [item.Code, item.Name]
            .filter(value => value !== undefined && value !== null && value.toString().trim().length > 0)
            .join(" - ");
    }
    
    countryChanged(newValue, oldValue) {
        var selectedCountry = newValue;
        if (selectedCountry) {
            this.data.CountryCode = selectedCountry.Code;
            this.data.CountryName = selectedCountry.Name;
        }
    }
    
    @bindable currency;
    currencyChanged(n, o) {
        if (this.currency) {
            this.data.CurrencyId = this.currency.Id;
            this.data.CurrencyCode = this.currency.Code;
        } else {
            this.data.CurrencyId = null;
            this.data.CurrencyCode = null;
        }
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

}
