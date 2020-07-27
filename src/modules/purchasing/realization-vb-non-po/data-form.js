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

        if (this.data.numberVB && this.data.numberVB.VBNo) {
            this.numberVB = this.data.numberVB;
        }

        this.filter = {
            "Apporve_Status": true, "Realization_Status": false
          };
    }

    async numberVBChanged(newValue) {
        
        this.data.numberVB = newValue;
        
        if(this.data.numberVB){
            this.data.UnitLoad = this.data.numberVB.UnitLoad;
            this.data.AmountVBReq = this.data.numberVB.Amount;
            
        }
        else{
            this.data.numberVB = {};

        }
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

    get vbLoader() {
        
        return VbLoader;
    }

}
