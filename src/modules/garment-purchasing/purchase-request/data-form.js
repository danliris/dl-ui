import {inject, bindable, computedFrom} from 'aurelia-framework'
var UnitLoader = require('../../../loader/unit-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/category-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
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
        { header: "Barang", value: "product" },
        { header: "Kategori", value: "category" },
        { header: "Jumlah", value: "quantity" },
        { header: "Satuan", value: "uom" },
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