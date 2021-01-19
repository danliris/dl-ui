import { useView, bindable } from "aurelia-framework";
import CurrencyLoader from "../../../../../loader/currency-loader";

@useView("./item.html")
export class Item {
  constructor(service) {
    this.service = service;
    this.isCurrency = false;
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

  calculateTotalAmount() {
    const { CurrencyNominal, Nominal } = this.data;
    const rate = this.data.Currency ? this.data.Currency.Rate : 0;
    const total = (CurrencyNominal + Nominal) * rate;

    this.data.Total = total;

    // console.log("this.data", this.data);
    // console.log("rate", rate);
    // console.log("total", total);
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

  handleChangeAmount(e) {
    this.calculateTotalAmount();
  }

  @bindable currency;
  currencyChanged(newValue, oldValue) {
    if (newValue) {
      this.data.CurrencyId = newValue.Id;
      this.data.IsIDR = newValue.Code === "IDR";
      this.data.Currency = newValue;
      this.isCurrency = newValue ? true : false;
      if (this.data.IsIDR) {
        this.data.CurrencyNominal = 0;
      } else {
        this.data.Nominal = 0;
      }
      this.calculateTotalAmount();
    } else {
      this.data.CurrencyId = 0;
      this.data.IsIDR = false;
      this.data.Currency = null;
      this.isCurrency = false;
      this.data.CurrencyNominal = 0;
      this.data.Nominal = 0;
      this.calculateTotalAmount();
    }
  }
}
