import { useView } from "aurelia-framework";
import CurrencyLoader from "../../../../../loader/currency-loader";

@useView("./add-item.html")
export class AddItem {
  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
  }

  onRemove() {
    this.bind();
  }

  get currencyLoader() {
    return CurrencyLoader;
  }
}
