var ProductLoader = require('../../../../loader/product-purchasing-loader');

export class PurchaseOrderItem {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  get productLoader() {
    return ProductLoader;
  }

  productChanged(e) {
    if (this.data.product)
      this.data.productId = this.data.product._id ? this.data.product._id : {};
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}