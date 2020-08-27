import { inject, BindingEngine } from 'aurelia-framework';

var SPBLoader = require('../../../../loader/vb-realization-spb-loader');

@inject(BindingEngine)
export class Item {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
    }

    filter = {

    }

    columns = [
        { header: "Tanggal", value: "Date" },
        { header: "Keterangan", value: "Remark" },
        {
            header: "Kena PPN", value: "UseVat"
        },
        { header: "Kena PPh", value: "UseIncomeTax" },
        { header: "Total", value: "Amount" }
    ]

    get spbLoader() {
        return SPBLoader;
    }
}
