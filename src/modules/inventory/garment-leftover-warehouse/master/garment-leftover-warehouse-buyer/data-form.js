import { inject, bindable, computedFrom } from 'aurelia-framework';
var TOPLoader = require('../../../../../loader/term-of-payments-new-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable top;
    KaberTypes = ['KABER', 'NON KABER']

    CustomerGroupD365 = ['TP:Lokal', 'TPR:Lokal']

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

}
