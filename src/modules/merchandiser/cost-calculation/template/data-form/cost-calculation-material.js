import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../../components/dialog/dialog';
import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
// const categoryLoader = require('../../../../../loader/category-md-loader');
// const materialLoader = require('../../../../../loader/material-md-loader');
// const uomLoader = require('../../../../../loader/uom-md-loader');

@inject(Dialog)
export class CostCalculationMaterial {

    controlOptions = {
        control: {
            length: 12
        }
    };

    constructor(dialog) {
        this.dialog = dialog;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly || false;
        this.disabled = true;
        this.data.showDialog = this.data.showDialog === undefined ? (this.data.Category === undefined ? true : false) : (this.data.showDialog === true ? true : false);
        this.data.isFabricCM = this.data.isFabricCM ? this.data.isFabricCM : false;
    }

    bind() {
        if (this.data.Category) {
            this.category = this.data.Category;
        }
    }

    @bindable category;
    categoryChanged(newValue, oldValue) {
        this.data.Category = newValue;
        if (oldValue ? this.data.Category.Id !== oldValue.Id : this.data.showDialog) {
            if (this.data.Category.Name.toUpperCase() === "FAB") {
                this.dialog.prompt("Apakah fabric ini menggunakan harga CMT?", "Detail Fabric Material")
                    .then(response => {
                        if (response == "ok") {
                            this.data.isFabricCM = true;
                        }
                        this.data.showDialog = false;
                    });
            }
        }
        this.data.categoryIsFilled = newValue ? true : false;
        this.categoryIsFilled = this.data.categoryIsFilled;
    }

    // get categoryLoader() {
    //     return categoryLoader;
    // }

    categoryText = (category) => {
        return category.SubCategory ? `${category.Name} - ${category.SubCategory}` : `${category.Name}`;
    }

    // get materialLoader() {
    //     return materialLoader;
    // }

    @computedFrom('data.Category')
    get filterMaterial() {
        return { "CategoryId": this.data.Category ? this.data.Category.Id : 0 }
    }

    // get satuanQuantityLoader() {
    //     return uomLoader;
    // }

    // get satuanPriceLoader() {
    //     return uomLoader;
    // }

    @computedFrom('data.Quantity', 'data.Price', 'data.Conversion', 'data.isFabricCM', 'data.Rate')
    get total() {
        let total = this.data.Quantity && this.data.Conversion && this.data.Price ? this.data.Price / this.data.Conversion * this.data.Quantity : 0;
        total = numeral(total).format();
        if (this.data.isFabricCM) {
            this.data.Total = 0;
            this.data.TotalTemp = numeral(total).value();
            this.data.CM_Price = numeral(total).value() / this.data.Rate.Value;
        }
        else {
            this.data.Total = numeral(total).value();
            this.data.TotalTemp = numeral(total).value();
            this.data.CM_Price = null;
        }
        return total;
    }

    @computedFrom('data.ShippingFeePortion', 'data.TotalTemp')
    get totalShippingFee() {
        let totalShippingFee = numeral(this.data.ShippingFeePortion / 100 * this.data.TotalTemp).format();
        this.data.TotalShippingFee = numeral(totalShippingFee).value();
        return totalShippingFee;
    }

    @computedFrom('data.Category', 'data.Quantity', 'data.Conversion', 'data.QuantityOrder', 'data.FabricAllowance', 'data.AccessoriesAllowance')
    get budgetQuantity() {
        let allowance = 0;
        if (this.data.Category) {
            if (this.data.Category.Name.toUpperCase() === "FAB") {
                allowance = this.data.FabricAllowance / 100;
            } else if (this.data.Category.Name.toUpperCase() === "ACC") {
                allowance = this.data.AccessoriesAllowance / 100;
            }
        }
        let budgetQuantity = this.data.Quantity && this.data.Conversion ? this.data.Quantity * this.data.QuantityOrder / this.data.Conversion + allowance * this.data.Quantity * this.data.QuantityOrder / this.data.Conversion : 0;
        budgetQuantity = numeral(budgetQuantity).format();
        this.data.BudgetQuantity = numeral(budgetQuantity).value();
        return budgetQuantity;
    }
}
