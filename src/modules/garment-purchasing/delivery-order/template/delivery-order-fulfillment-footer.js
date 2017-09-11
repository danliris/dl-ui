import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailFooter {
  activate(context) {
    this.context = context;
  }

  get totalOrder() {
    var qty = this.context.items
      .map((item) => parseInt(item.data.purchaseOrderQuantity));
    return qty
      .reduce((prev, curr, index) => { return prev + curr }, 0);
  }

  get totalDelivered() {
    var qty = this.context.items
      .map((item) => parseInt(item.data.deliveredQuantity));
    return qty
      .reduce((prev, curr, index) => { return prev + curr }, 0);
  }

  get totalPrice() {
    var qty = this.context.items
      .map((item) => parseInt(item.data.pricePerDealUnit));
    return qty
      .reduce((prev, curr, index) => { return prev + curr }, 0);
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}
