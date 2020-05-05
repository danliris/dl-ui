import { inject, bindable } from "aurelia-framework";

export class DoReturnItem {
  @bindable Total;
  @bindable Price;

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.readOnly = context.options.readOnly;

    this.Total = this.data.Total;
    this.Price = this.data.Price;
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;
  }

  TotalChanged(newValue, oldValue) {
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;
    this.data.Total = this.Total;
  }

  PriceChanged(newValue, oldValue) {
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;
    this.data.Price = this.Price;
  }

  AmountChanged(newValue, oldValue) {
    this.data.Amount = this.getAmount;
  }
}
