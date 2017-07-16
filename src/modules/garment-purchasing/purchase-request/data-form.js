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
        { header: "Jumlah", value: "quantity" },
        { header: "Satuan", value: "product.uom" },
        { header: "Keterangan", value: "remark" }
    ]
    
    get unit() {
		return `${this.data.unit.code} - ${this.data.unit.name}`;
	}

    get category() {
		return `${this.data.category.code} - ${this.data.category.name}`;
	}
}