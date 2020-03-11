import { bindable } from "aurelia-framework";
const SizeLoader = require('../../../../loader/size-loader');

export class SubconDetail {
    @bindable selectedProduct;
    @bindable dataQuantity;

    get sizeLoader() {
        return SizeLoader;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.subconCuttingList = context.context.options.subconCuttingList;
        this.productList = [""];
        for (const productCode in this.subconCuttingList) {
            this.productList.push(productCode);
        }

        if (this.data) {
            if (this.data.Product) {
                this.selectedProduct = this.data.Product.Code;
            }
            this.dataQuantity = this.data.Quantity;
        }
    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
    }

    selectedProductChanged(newValue) {
        if (newValue) {
            const selectedSubconCutting = this.subconCuttingList[newValue];
            this.data.Product = selectedSubconCutting.Product;
            this.data.DesignColor = selectedSubconCutting.DesignColor;
            this.data.BasicPrice = selectedSubconCutting.BasicPrice;
        } else {
            this.data.Product = null;
            this.data.DesignColor = null;
            this.data.BasicPrice = 0;
        }
    }

    dataQuantityChanged(newValue) {
        this.data.Quantity = newValue;
        this.data.RemainingQuantity = newValue;
    }
}