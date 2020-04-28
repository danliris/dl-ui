import { inject, bindable, computedFrom } from 'aurelia-framework';
import { months } from '../../../../../node_modules/moment/moment';
var moment = require('moment');
export class DataForm {
    @bindable title;
    @bindable readOnly;

    // itemYears = [];

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

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        
        
    }

    itemColumns = ["Nama Dye Stuff", "G / KG"];

    addItemCallback = (e) => {
        this.data.ColorReceiptItems = this.data.ColorReceiptItems || [];
        this.data.ColorReceiptItems.push({})
    };
}