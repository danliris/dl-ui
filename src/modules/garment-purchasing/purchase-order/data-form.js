import {inject, bindable, computedFrom} from 'aurelia-framework'
import {Service} from './service';
var moment = require('moment');

export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;
    @bindable title;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }
    
    itemsColumns = [
        { header: "Nomor Referensi PR", value: "refNo" },
        { header: "Barang", value: "product" },
        { header: "Jumlah", value: "defaultQuantity" },
        { header: "Satuan", value: "defaultUom" },
        { header: "Harga Budget", value: "budgetPrice" },
        { header: "Keterangan", value: "remark" }
    ]

    get buyer() {
		return `${this.data.buyer.code} - ${this.data.buyer.name}`;
	}
    
    get unit() {
		return `${this.data.unit.code} - ${this.data.unit.name}`;
	}
} 