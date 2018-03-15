import { bindable } from 'aurelia-framework'

export class DeliveryOrderItem {
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  get product() {
    return `${this.data.product.code} - ${this.data.product.name}`;
  }

  get totalPrice() {
    return Number.isInteger(this.data.pricePerDealUnit * this.data.deliveredQuantity) ? this.data.pricePerDealUnit * this.data.deliveredQuantity : Number((this.data.pricePerDealUnit * this.data.deliveredQuantity).toFixed(2))
  }
  
  controlOptions = {
    control: {
      length: 12
    }
  };
}