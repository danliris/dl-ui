import {bindable} from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');

export class DeliveryOrderItem {
  isWarning = false;
  @bindable deliveredQuantity;
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isEdit = this.context.context.options.isEdit || false;

    if (this.isEdit) {
      var poItem = this.data.purchaseOrder.items.find(item => item.product._id.toString() === this.data.productId.toString())
      var qty = poItem.fulfillments
        .map((fulfillment) => fulfillment.deliveryOrderDeliveredQuantity)
        .reduce((prev, curr, index) => {
          if (index === (poItem.fulfillments.length - 1)) {
            return prev + 0
          } else {
            return prev + curr
          }
        }, 0);
      this.data.remainingQuantity = poItem.dealQuantity - qty;
    }

    if (this.data) {
      this.deliveredQuantity = this.data.deliveredQuantity;
    } else {
      this.deliveredQuantity = 0;
    }
    if (!this.options.readOnly) {
      if (this.data.remainingQuantity < this.data.deliveredQuantity) {
        this.isWarning = true
      }
      else {
        this.isWarning = false;
      }
    }
  }

  get productLoader() {
    return ProductLoader;
  }

  productView = (product) => {
    return `${product.code} - ${product.name}`
  }

  deliveredQuantityChanged(newValue, oldValue) {
    if (typeof newValue === "number") {
      this.data.deliveredQuantity = newValue
      if (!this.options.readOnly) {
        if (this.data.remainingQuantity < this.data.deliveredQuantity) {
          this.isWarning = true
        }
        else {
          this.isWarning = false;
        }
      }
    } else {
      if (this.isWarning) {
        this.isWarning = false;
      }
      if (newValue === null) {
        this.deliveredQuantity = 0
      } else {
        this.deliveredQuantity = this.data.deliveredQuantity;
      }
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}