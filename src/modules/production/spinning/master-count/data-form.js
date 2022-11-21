import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';

@inject(Service)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    constructor(service) {
        this.service = service;
    }

    bind(context){
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }
}