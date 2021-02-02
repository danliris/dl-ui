import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const BankLoader = require('../shared/bank-account-loader');
const SupplierLoader = require('../shared/garment-supplier-loader');
const CurrencyLoader = require('../shared/garment-currency-loader');

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (!this.readOnly) {
            this.collection = {
                columns: ['__check', 'No NI', 'Tanggal NI', 'Tanggal Jatuh Tempo', 'Supplier', 'PPN', 'PPh', 'Total Harga ((DPP + PPN) - PPh)', 'Mata Uang', 'Total Outstanding']
            };
        } else {
            this.collection = {
                columns: ['No NI', 'Tanggal NI', 'Tanggal Jatuh Tempo', 'Supplier', 'PPN', 'PPh', 'Total Harga ((DPP + PPN) - PPh)', 'Mata Uang', 'Total Outstanding']
            };
        }
    }

    onCheckAll(event) {
        for (var item of this.data.Items) {
            item.Select = event.detail.target.checked;
        }
    }

    get bankLoader() {
        return BankLoader;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }
}
