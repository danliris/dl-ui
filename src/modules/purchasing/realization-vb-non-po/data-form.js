import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const UnitLoader = require('../../../loader/unit-loader');
const VbLoader = require('../../../loader/vb-non-po-request-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedCurrency;
    @bindable unit;
    @bindable numberVB;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.selectedCurrency = this.data.Currency;
    }

    async numberVBChanged(newValue) {
        console.log(newValue);
        var temp_detailItem = [];
        this.data.numberVB = newValue;
        
    }

    columns = [
        { header: "Tanggal", value: "DateDetail" },
        { header: "Keterangan", value: "Remark" },
        { header: "Jumlah", value: "Amount" },
        { header: "Kena PPn", value: "isGetPPn" },
        { header: "Total", value: "Total" }
    ];

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`

    }

    get vbLoader() {
        
        return VbLoader;
    }

}
