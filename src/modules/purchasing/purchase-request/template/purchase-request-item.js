var ProductLoader = require('../../../../loader/product-loader');

export class PurchaseRequestItem {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  } 

  get productLoader() {
        return ProductLoader;
    }

  controlOptions = {
    control: {
      length: 12
    }
  };
}