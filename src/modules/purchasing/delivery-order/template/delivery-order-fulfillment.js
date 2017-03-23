import {bindable} from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');
var PurchaseRequestLoader = require('../../../../loader/purchase-request-posted-loader');

export class DeliveryOrderFulfillment {
  @bindable deliveredQuantity;

  activate(context) {
    debugger
    this.context = context;
    this.fulfillment = context.data;
    this.error = context.error;
    this.options = context.options;
    this.deliveredQuantity = this.fulfillment.deliveredQuantity;
    this.fulfillment.purchaseOrder.purchaseRequest.toString = function () {
      return `${this.no}`
    }

    this.fulfillment.product.toString = function () {
      return [this.code, this.name]
        .filter((item, index) => {
          return item && item.toString().trim().length > 0;
        }).join(" - ");
    }

  }

  controlOptions = {
    control: {
      length: 12
    }
  };

  get productLoader() {
    return ProductLoader;
  }

  get PurchaseRequestLoader() {
    return purchaseRequestLoader;
  }

  deliveredQuantityChanged(newValue, oldValue) {
    debugger
    if (newValue) {
      if (typeof newValue === "number") {
        this.fulfillment.deliveredQuantity = newValue;
      }
    }
  }
}