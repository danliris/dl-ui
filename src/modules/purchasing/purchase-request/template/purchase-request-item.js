import {bindable} from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-purchasing-loader');

export class PurchaseRequestItem {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
    if (!this.data.productId) {
      this.data.productId = {};
    }
  }

  get productLoader() {
    return ProductLoader;
  }

  productChanged(e) {
    if (this.data.product) {
      this.data.productId = this.data.product.Id || {};
      this.data.product._id = this.data.productId;
      this.data.product.UOM._id = this.data.product.UOM.Id;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}