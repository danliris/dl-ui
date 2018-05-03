import { inject, BindingEngine } from 'aurelia-framework';
const UomLoader = require('../../../../loader/uom-loader');

@inject(BindingEngine)
export class TransferShippingOrderDetail {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    gradeItems = ["", "A", "B", "C"];

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;

        this.dataProduct = `${this.data.Product.code} - ${this.data.Product.name}`;
    }

    get uomLoader() {
        return UomLoader;
    }
}