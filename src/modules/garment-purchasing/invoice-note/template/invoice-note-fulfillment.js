import { bindable } from 'aurelia-framework'

export class DeliveryOrderItem {
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  get product() {

        return `${this.data.product.Code} - ${this.data.product.Name}`;
    
  }

  get totalPrice() {
    return Number.isInteger(this.data.pricePerDealUnit * this.data.doQuantity) ? this.data.pricePerDealUnit * this.data.doQuantity : Number((this.data.pricePerDealUnit * this.data.doQuantity).toFixed(2))
  }
  
  controlOptions = {
    control: {
      length: 12
    }
  };
}