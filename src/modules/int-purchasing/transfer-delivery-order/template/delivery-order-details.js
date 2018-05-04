import { inject, BindingEngine } from 'aurelia-framework';
// var ProductLoader = require('../../../../loader/product-loader');

export class DeliveryOrderItem {
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
}

  grades = ["", "A", "B", "C"];

  activate(context) {
    this.context = context;
    this.data = context.data;
// console.log(context);
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;

  }

  productView = (product) => {
    return `${product.ProductCode}-${product.ProductName}`;
  }

}