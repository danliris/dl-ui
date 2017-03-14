import {inject, bindable, computedFrom} from 'aurelia-framework'
var UnitLoader = require('../../../loader/unit-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/category-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;

    @bindable title;

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

    unitChanged(e) {
        if (this.data.unit)
            this.data.unitId = this.data.unit._id ? this.data.unit._id : {};
    }

    budgetChanged(e) {
        if (this.data.budget)
            this.data.budgetId = this.data.budget._id ? this.data.budget._id : {};
    }

    categoryChanged(e) {
        if (this.data.category)
            this.data.categoryId = this.data.category._id ? this.data.category._id : {};
    }

    get unitLoader() {
        return UnitLoader;
    }

    get budgetLoader() {
        return BudgetLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }
}