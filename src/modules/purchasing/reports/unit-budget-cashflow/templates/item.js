import { useView, bindable } from "aurelia-framework";
import CurrencyLoader from "../../../../../loader/currency-loader";

@useView("./item.html")
export class Item {
  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    if (this.data.Currency) {
      this.currency = this.data.Currency;
    }
  }

  onRemove() {
    this.bind();
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

  @bindable currency;
  currencyChanged(newValue, oldValue) {
    if (newValue) {
      this.data.CurrencyId = newValue.Id;
      this.data.IsIDR = newValue.Code === "IDR";
      this.data.Currency = newValue;
    } else {
      this.data.CurrencyId = 0;
      this.data.IsIDR = false;
      this.data.Currency = null;
    }
  }
}
