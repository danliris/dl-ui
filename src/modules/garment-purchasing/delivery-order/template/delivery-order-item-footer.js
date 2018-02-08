import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailFooter {
  activate(context) {
    this.context = context;
  }
  get currency() {
    if (this.context.items.length > 0) {
      if (this.context.items[0].data.fulfillments instanceof Array) {
        if (this.context.items[0].data.fulfillments.length > 0) {
          return this.context.items[0].data.fulfillments[0].currency.code
        } else {
          return ""
        }
      } else {
        return ""
      }
    } else {
      return ""
    }
  }

  get totalOrder() {
    if (this.context.items.length > 0) {
      var total = this.context.items
        .map((item) => {
          if (item.data.fulfillments instanceof Array) {
            var qty = item.data.fulfillments
              .map((fulfillment) => parseFloat(fulfillment.purchaseOrderQuantity.toFixed(2)));
            return qty
              .reduce((prev, curr, index) => { return prev +  parseFloat(curr.toFixed(2)) }, 0);
          }
          else {
            return 0
          }
        });
      return total
        .reduce((prev, curr, index) => { return prev +  parseFloat(curr.toFixed(2)) }, 0);
    }
    else {
      return 0
    }
  }

  get totalDelivered() {
    if (this.context.items.length > 0) {
      var total = this.context.items
        .map((item) => {
          if (item.data.fulfillments instanceof Array) {
            var qty = item.data.fulfillments
              .map((fulfillment) => parseFloat(fulfillment.deliveredQuantity.toFixed(2)));
            return qty
              .reduce((prev, curr, index) => { return prev + parseFloat(curr.toFixed(2)) }, 0);
          }
          else {
            return 0
          }
        });
      return total
        .reduce((prev, curr, index) => { return prev +  parseFloat(curr.toFixed(2)) }, 0);
    }
    else {
      return 0
    }
  }

  get grandTotalPrice() {
    if (this.context.items.length > 0) {
      var total = this.context.items
        .map((item) => {
          if (item.data.fulfillments instanceof Array) {
            var qty = item.data.fulfillments
              .map((fulfillment) => parseFloat(((fulfillment.deliveredQuantity) * (fulfillment.pricePerDealUnit)).toFixed(2)));
            return qty
              .reduce((prev, curr, index) => { return prev +  parseFloat(curr.toFixed(2)) }, 0);
          }
          else {
            return 0
          }
        });
      return total
        .reduce((prev, curr, index) => {
          return prev + parseFloat(curr.toFixed(2))
        }, 0);
    }
    else {
      return 0
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}
