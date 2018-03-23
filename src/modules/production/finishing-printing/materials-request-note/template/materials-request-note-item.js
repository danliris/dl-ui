import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductLoader = require('../../../../../loader/product-loader');
var ProductionOrderLoader = require('../../../../../loader/production-order-loader');

export class MaterialsRequestNoteItem {
    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.productionOrderFilter = context.context.options.productionOrderFilter;
        this.isTest = context.context.options.isTest;
        this.isComplete = context.context.options.isComplete;
        this.isView = context.context.options.isView;
        this.isAwal = context.context.options.isAwal;
        this.isEdit = context.context.options.isEdit;
        this.alreadyChecked = this.data.ProductionOrder && this.data.ProductionOrder.isCompleted ? true : false;
        this.data.checked = false;
        console.log(this.data)
        
    }

    get productLoader() {
        return ProductLoader;
    }

    checkboxClick() {
        console.log("click")
        if (this.alreadyChecked) {
            return false;
        }
        return true;
    }

    checkboxChanges(e) {
        this.data.ProductionOrder.isCompleted = this.data.checked ? true : false;
    }

    productChanged(e) {
        this.data.Product = this.data && this.data.Product && this.data.Product._id ? this.data.Product : null;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    productionOrderChanged(e) {
        this.data.ProductionOrder = this.data && this.data.ProductionOrder && this.data.ProductionOrder._id ? this.data.ProductionOrder : null;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
}