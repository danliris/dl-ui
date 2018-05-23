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

        this.isDisabled = this.data.isDisabled;
        
    }

    get productLoader() {
        return ProductLoader;
    }

    checkboxChanged(e) {
        this.data.toBeCompleted = this.data.ProductionOrder.isCompleted;
    }

    // change.delegate="checkboxChanges($event)"

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