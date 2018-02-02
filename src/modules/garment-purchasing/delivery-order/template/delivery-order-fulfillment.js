import { bindable } from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');
var UomLoader = require('../../../../loader/uom-loader');

export class DeliveryOrderItem {
  isWarning = false;
  @bindable deliveredQuantity;

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isEdit = this.context.context.options.isEdit || false;

    if (this.data) {
      this.deliveredQuantity = this.data.deliveredQuantity;
    } else {
      this.deliveredQuantity = 0;
    }
    if (!this.options.readOnly) {
      if (this.data.remainsQuantity < this.data.deliveredQuantity) {
        this.isWarning = true
      }
      else {
        this.isWarning = false;
      }
    }
  }

  get quantityConversion() {
    return (this.data.deliveredQuantity * this.data.conversion).toFixed(2)
  }

  get priceTotal() {
    return parseFloat((this.data.deliveredQuantity * this.data.pricePerDealUnit).toFixed(2));
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
        if (this.data.remainsQuantity < this.data.deliveredQuantity) {
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